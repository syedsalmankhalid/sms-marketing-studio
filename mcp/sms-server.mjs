// SMS MCP server: sends text messages through Twilio's REST API.
// Practice mode: when TWILIO_BASE_URL points at this computer, each message
// is marked "delivered" through the practice server's simulate endpoint.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const SID = process.env.TWILIO_ACCOUNT_SID || "";
const TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const BASE = (process.env.TWILIO_BASE_URL || "").replace(/\/+$/, "");
const FROM = process.env.TWILIO_FROM || "";

const PRACTICE =
  BASE.startsWith("http://127.0.0.1") || BASE.startsWith("http://localhost");

const AUTH = "Basic " + Buffer.from(`${SID}:${TOKEN}`).toString("base64");
const MESSAGES_URL = `${BASE}/2010-04-01/Accounts/${SID}/Messages.json`;

class TwilioError extends Error {}

// Call Twilio and return parsed JSON. Turns every failure into a TwilioError
// with a plain-words message.
async function twilio(url, { method = "GET", form } = {}) {
  let res;
  try {
    res = await fetch(url, {
      method,
      headers: {
        Authorization: AUTH,
        ...(form ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
      },
      body: form ? new URLSearchParams(form).toString() : undefined,
    });
  } catch (err) {
    throw new TwilioError(
      `Could not reach Twilio at ${BASE}. Is the server running? (${err.message})`
    );
  }
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    // not JSON; handled below
  }
  if (!res.ok) {
    const code = data.code ?? "none";
    const msg = data.message ?? (text.slice(0, 200) || res.statusText);
    throw new TwilioError(
      `Twilio refused the request (HTTP ${res.status}, error code ${code}): ${msg}`
    );
  }
  return data;
}

// Practice mode only: mark a message delivered. Never runs against real Twilio.
async function simulateDelivered(sid) {
  if (!PRACTICE) return;
  await twilio(`${BASE}/_twilio/simulate/message-status`, {
    method: "POST",
    form: { MessageSid: sid, Status: "delivered" },
  });
}

async function sendOne(to, body) {
  const sent = await twilio(MESSAGES_URL, {
    method: "POST",
    form: { To: to, From: FROM, Body: body },
  });
  await simulateDelivered(sent.sid);
  // Re-read so the status shown is the one after delivery.
  if (!PRACTICE) return sent;
  return twilio(`${BASE}/2010-04-01/Accounts/${SID}/Messages/${sent.sid}.json`).catch(() => sent);
}

const summary = (m) =>
  `sid ${m.sid}, to ${m.to}, status ${m.status}, segments ${m.num_segments ?? "unknown"}`;

const ok = (text) => ({ content: [{ type: "text", text }] });
const fail = (err) => ({
  isError: true,
  content: [
    {
      type: "text",
      text: err instanceof TwilioError ? err.message : `Something went wrong: ${err.message}`,
    },
  ],
});

const server = new McpServer({ name: "sms", version: "1.0.0" });

server.registerTool(
  "send-sms",
  {
    description:
      "Send one text message to one phone number (E.164 format, like +15005550006). Returns the message sid, status and number of segments.",
    inputSchema: {
      to: z.string().describe("Phone number to send to, like +15005550006"),
      body: z.string().min(1).describe("The text of the message"),
    },
  },
  async ({ to, body }) => {
    try {
      const m = await sendOne(to, body);
      return ok(`Sent. ${summary(m)}`);
    } catch (err) {
      return fail(err);
    }
  }
);

server.registerTool(
  "send-bulk-sms",
  {
    description:
      "Send the same text message to a list of phone numbers. Sends one at a time and reports the result for each number, including any that failed.",
    inputSchema: {
      numbers: z.array(z.string()).min(1).describe("Phone numbers, like [\"+15005550006\"]"),
      body: z.string().min(1).describe("The text of the message"),
    },
  },
  async ({ numbers, body }) => {
    const lines = [];
    let failed = 0;
    for (const to of numbers) {
      try {
        const m = await sendOne(to, body);
        lines.push(`OK   ${summary(m)}`);
      } catch (err) {
        failed++;
        lines.push(`FAIL to ${to}: ${err instanceof TwilioError ? err.message : err.message}`);
      }
    }
    const head = `Sent ${numbers.length - failed} of ${numbers.length} messages.`;
    return { isError: failed === numbers.length, content: [{ type: "text", text: [head, ...lines].join("\n") }] };
  }
);

server.registerTool(
  "list-messages",
  {
    description:
      "List sent messages, newest first. Shows sid, to, status, segments and the first 40 characters of the body.",
    inputSchema: {
      limit: z.number().int().min(1).max(100).optional().describe("How many messages to show (default 20)"),
    },
  },
  async ({ limit }) => {
    try {
      const data = await twilio(`${MESSAGES_URL}?PageSize=${limit ?? 20}`);
      const list = [...(data.messages ?? [])].sort(
        (a, b) => new Date(b.date_created || 0) - new Date(a.date_created || 0)
      );
      if (list.length === 0) return ok("No messages found.");
      const lines = list.map(
        (m) =>
          `${m.sid} | to ${m.to} | ${m.status} | ${m.num_segments ?? "?"} segment(s) | ${(m.body ?? "").slice(0, 40)}`
      );
      return ok(lines.join("\n"));
    } catch (err) {
      return fail(err);
    }
  }
);

server.registerTool(
  "get-message",
  {
    description: "Look up one message by its sid and show its details.",
    inputSchema: {
      sid: z.string().describe("The message sid, starting with SM"),
    },
  },
  async ({ sid }) => {
    try {
      const m = await twilio(`${BASE}/2010-04-01/Accounts/${SID}/Messages/${encodeURIComponent(sid)}.json`);
      return ok(
        `${summary(m)}\nfrom ${m.from}\ncreated ${m.date_created}\nbody: ${m.body}`
      );
    } catch (err) {
      return fail(err);
    }
  }
);

await server.connect(new StdioServerTransport());

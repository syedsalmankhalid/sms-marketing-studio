# SMS Marketing Studio

This studio is for planning and writing SMS campaigns for a small mobile network.

## Folders

- `brand/`: the network's brand voice, tone, offers and words to use or avoid.
- `subscribers/`: subscriber segments and audience notes. Its data rules are in `subscribers/CLAUDE.md`.
- `campaigns/`: one file or folder per campaign: the brief, the message drafts and the results.
- `notes/`: research, decisions and anything else worth keeping.

## Rules

- Write in plain English. Use short sentences and everyday words, and avoid jargon.
- Never send a text message to real people. Only send to the practice server at `http://127.0.0.1:4000`, never to the real Twilio API. The only exceptions: sending is allowed only to Twilio's test number `+15005550006` and to my own phone number. A guard will enforce this in the next step.
- Never plan or send a campaign text outside 9 am to 9 pm in the subscriber's local time. Every send must start by 8:30 pm. Every message in a campaign calendar needs a date, a send time, an audience group and a purpose.
- Ask me before deleting anything.

## Brand voice

@brand/voice.md

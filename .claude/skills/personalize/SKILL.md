---
name: personalize
description: Write a version of each campaign text message for every subscriber group in subscribers/subscribers.csv. Use when a campaign's messages are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign for each group

The campaign folder is: $ARGUMENTS

## Step 1: Check the folder

If no campaign folder was given, stop. Use Glob to find the folders inside `campaigns/`. Reply with a short list of them and ask which one to use. Write no files.

If the folder was given but does not exist or has no `messages/` folder, stop and say so. List the campaign folders that do exist.

## Step 2: Read what you need

- Read `brand/voice.md` and `.claude/rules/message-format.md`. Follow both.
- Read `subscribers/subscribers.csv`. Use the `group` column to find the groups. Only these groups are allowed: `student`, `gamer`, `budget-caller`. Skip any other value.
- Use Glob to list every file in `<campaign folder>/messages/`. Read each one.

## Step 3: Write one version per group

For each message file and each group, write a new file at:

`<campaign folder>/groups/<group>/messages/<same file name>`

Use the group name exactly as it appears in the CSV (`student`, `gamer`, `budget-caller`).

Keep the file layout of the original: the heading, the Label, Date, Send time, Audience and Purpose lines, then the message in a code block, then a Length line. Change the Audience line to name only that group. Keep the Send time for that group only.

In the message body:

- Keep the same sender tag (`Chirpnet:`), the same link and the same `Reply STOP to opt out.` line, word for word.
- Keep the greeting with `{{first_name}}` and keep the call to action (for example `Reply OWL`).
- Change the opening words so they fit the group. For example, students might get "Studying late?", gamers "Gaming late?", and budget-callers "Want a low price?".
- Change one detail so it fits the group. Do not change more than one detail beyond the opening.
- Keep placeholders such as `[X GB]` and `[price]` as they are.
- Follow the brand voice. Never add a claim the original did not make. Never say "free", "unlimited", "cheapest" or "all night". The bundle works from midnight to 7 am only.
- No emoji, curly quotes or ALL CAPS words other than `OWL`, `STOP` and units like `GB`.

## Step 4: Count the length

The body must be 160 characters or fewer, with `{{first_name}}` counted as 10. Count each body character by character. Do not guess. If a version is too long, shorten the opening or the detail and count again. Write the final count in the Length line, and say that placeholders are counted as written.

## Step 5: Reply with a short summary only

Reply with:

- How many files you wrote.
- One example opening per group, with its character count. The opening is the text from the start of the body up to the end of the first sentence.

Do not paste the full messages. Do not add anything else.

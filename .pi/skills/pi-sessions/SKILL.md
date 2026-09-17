---
name: pi-sessions
description: Summarizes pi sessions found in this repository. Use when the user requests a summary of pi sessions
---

pi-sessions (Pi Sessions Summary)

What it is:
- A lightweight skill to summarize pi sessions found in this repository.
- It runs the .pi/skills/pi-sessions/scripts/summarize_pi_sessions.sh script (a Python-backed summarizer) and returns its output.
- The script scans ~/.pi/agent/sessions for JSONL logs and filters to sessions whose cwd matches the current repo.

How to use:
- Do not think about the task, just execute the script and share the output
- When you request a summary of pi sessions, this skill will execute the script at .pi/skills/pi-sessions/scripts/summarize_pi_sessions.sh and present the results in the chat.
- Present the raw table using the same formatting as the tool output (highlight the header row in a color)
- Do not think about how to present the data or what it means, just share the output

What you’ll get:
- A clear, aligned table with columns: Date | Session ID | User | Agent | Tools | Cost ($) | Model(s) | Initial Prompt
- Dates are parsed from the log filename. Model(s) width adjusts dynamically.

Notes:
- Requires jq to be installed.
- The script looks for session log files (.json and .jsonl) under: ~/.pi/agent/sessions/--<abs-repo-path-with-slashes-as-dashes>--.
- It supports JSONL logs by streaming and summarizing per file.
- Reopen command: pi --session "<session-name>"

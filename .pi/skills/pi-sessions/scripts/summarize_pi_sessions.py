#!/usr/bin/env python3
import json
import os
from pathlib import Path
from typing import List, Dict, Any

# Discover sessions under ~/.pi/agent/sessions (all repos);
# filter to the current repo by matching the session "cwd" entry.
sessions_root = Path.home() / ".pi" / "agent" / "sessions"
current_repo = os.path.realpath(os.getcwd())

def parse_date_from_filename(stem: str) -> str:
    # stem: 2026-09-10T18-21-12-857Z_... -> 2026-09-10 18:21:12
    prefix = stem.split("_", 1)[0]
    if len(prefix) >= 19 and "T" in prefix:
        try:
            ymd, rest = prefix.split("T", 1)
            hh, mm, ss_and_more = rest.split("-", 2)
            ss = ss_and_more.split("-", 1)[0]
            return f"{ymd} {hh}:{mm}:{ss}"
        except Exception:
            return "Unknown"
    return "Unknown"

sessions: List[Dict[str, Any]] = []

for jsonl_path in sessions_root.rglob("*.jsonl"):
    user_msgs = 0
    agent_msgs = 0
    tool_calls = 0
    total_cost = 0.0
    models = set()
    prompts: List[str] = []
    session_cwd = None

    try:
        with open(jsonl_path, "r", encoding="utf-8") as f:
            for line in f:
                if not line.strip():
                    continue
                data = json.loads(line)

                if data.get("type") == "session":
                    session_cwd = data.get("cwd")

                msg = data.get("message") or data
                role = msg.get("role") or data.get("role")

                if role == "user":
                    user_msgs += 1
                    content = msg.get("content")
                    if isinstance(content, str) and content.strip():
                        prompts.append(content.strip())
                    elif isinstance(content, list):
                        for block in content:
                            if isinstance(block, dict) and block.get("type") == "text":
                                text = block.get("text", "").strip()
                                if text:
                                    prompts.append(text)

                elif role == "assistant":
                    agent_msgs += 1
                    model = msg.get("model") or msg.get("responseModel") or data.get("model")
                    if model:
                        models.add(str(model))

                    content = msg.get("content", [])
                    if isinstance(content, list):
                        for block in content:
                            if isinstance(block, dict) and block.get("type") in ("tool_use", "tool_call"):
                                tool_calls += 1

                    usage = msg.get("usage") or data.get("usage") or {}
                    cost = usage.get("cost") or data.get("cost") or 0.0
                    try:
                        total_cost += float(cost.get("total", 0) if isinstance(cost, dict) else cost)
                    except Exception:
                        pass

                elif role in ("bashExecution", "toolResult"):
                    tool_calls += 1

        if session_cwd and os.path.realpath(session_cwd) == current_repo:
            sessions.append({
                "date": parse_date_from_filename(jsonl_path.stem),
                "id": jsonl_path.stem[:12],
                "user_msgs": user_msgs,
                "agent_msgs": agent_msgs,
                "tool_calls": tool_calls,
                "cost": total_cost,
                "models": ", ".join(sorted(models)) if models else "N/A",
                "prompts": prompts,
            })
    except Exception:
        continue

if not sessions:
    print("No sessions found for this repository.")
    raise SystemExit(0)

# Calculate dynamic column width for models
max_model_len = max(max(len(s["models"]) for s in sessions), len("Model(s)"))

# Column formatter: include Date (19 chars)
fmt = f"{{:<19}} | {{:<12}} | {{:<5}} | {{:<5}} | {{:<5}} | {{:<8}} | {{:<{max_model_len}}} | {{}}"
sep_len = 19 + 3 + 12 + 3 + 5 + 3 + 5 + 3 + 5 + 3 + 8 + 3 + max_model_len + 3 + 40

print(fmt.format("Date", "Session ID", "User", "Agent", "Tools", "Cost ($)", "Model(s)", "Initial Prompt"))
print("-" * sep_len)

for s in sorted(sessions, key=lambda x: (x["date"], x["id"])):
    first_prompt = (s['prompts'][0][:35] + '...') if s['prompts'] else 'N/A'
    print(fmt.format(
        s['date'],
        s['id'],
        s['user_msgs'],
        s['agent_msgs'],
        s['tool_calls'],
        f"${s['cost']:.4f}",
        s['models'],
        first_prompt
    ))

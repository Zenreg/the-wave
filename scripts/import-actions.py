#!/usr/bin/env python3
"""Import 365 actions from TheWave-365-actions.md into Supabase."""

import json
import os
import re
import subprocess
import sys
from datetime import date, timedelta
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parent.parent
MD_FILE = PROJECT_DIR / "TheWave-365-actions.md"
ENV_FILE = PROJECT_DIR / ".env"

PROJECT_REF = "pbmqcsfrrmohthkqydyu"
API_URL = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"


def load_env():
    """Load .env file."""
    env = {}
    with open(ENV_FILE) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                env[key.strip()] = val.strip()
    return env


def parse_actions(filepath):
    """Parse TheWave-365-actions.md and return list of (date_str, fr, en)."""
    actions = []
    current_day = None
    fr_text = None
    en_text = None

    with open(filepath, encoding="utf-8") as f:
        for line in f:
            line = line.rstrip()

            # Match "### Jour N"
            m = re.match(r"^### Jour (\d+)", line)
            if m:
                # Save previous
                if current_day and fr_text and en_text:
                    # 2025 = non-leap year → 365 days maps to 01-01 through 12-31
                    d = date(2025, 1, 1) + timedelta(days=current_day - 1)
                    date_str = f"{d.month:02d}-{d.day:02d}"
                    actions.append((date_str, fr_text, en_text))
                current_day = int(m.group(1))
                fr_text = None
                en_text = None
                continue

            # Match FR
            m = re.match(r"^\*\*FR\*\* : (.+)", line)
            if m:
                fr_text = m.group(1).strip()
                continue

            # Match EN
            m = re.match(r"^\*\*EN\*\* : (.+)", line)
            if m:
                en_text = m.group(1).strip()
                continue

    # Last entry
    if current_day and fr_text and en_text:
        d = date(2025, 1, 1) + timedelta(days=current_day - 1)
        date_str = f"{d.month:02d}-{d.day:02d}"
        actions.append((date_str, fr_text, en_text))

    return actions


def build_sql(actions):
    """Build SQL INSERT statements."""
    lines = ["BEGIN;"]
    for date_str, fr, en in actions:
        fr_esc = fr.replace("'", "''")
        en_esc = en.replace("'", "''")
        lines.append(
            f"INSERT INTO daily_actions (date, action_text, action_text_en) "
            f"VALUES ('{date_str}', '{fr_esc}', '{en_esc}') "
            f"ON CONFLICT (date) DO UPDATE SET "
            f"action_text = EXCLUDED.action_text, "
            f"action_text_en = EXCLUDED.action_text_en;"
        )
    lines.append("COMMIT;")
    return "\n".join(lines)


def execute_sql(sql, token):
    """Execute SQL via Supabase Management API."""
    payload = json.dumps({"query": sql})
    result = subprocess.run(
        [
            "curl", "-s", "-w", "\n%{http_code}",
            "-X", "POST", API_URL,
            "-H", f"Authorization: Bearer {token}",
            "-H", "Content-Type: application/json",
            "-d", payload,
        ],
        capture_output=True, text=True, timeout=120,
    )
    output = result.stdout.strip()
    lines = output.split("\n")
    http_code = lines[-1] if lines else "0"
    body = "\n".join(lines[:-1])
    return http_code, body


def main():
    print(f"Parsing {MD_FILE}...")
    actions = parse_actions(MD_FILE)
    print(f"  → {len(actions)} actions trouvées")

    if len(actions) != 365:
        print(f"  ⚠ Attendu 365, trouvé {len(actions)}")

    # Show some samples
    print(f"  Jour 1 (01-01): {actions[0][1][:50]}...")
    print(f"  Jour 365 (12-31): {actions[-1][1][:50]}...")

    sql = build_sql(actions)

    # Save SQL for inspection
    sql_path = "/tmp/thewave-actions.sql"
    with open(sql_path, "w") as f:
        f.write(sql)
    print(f"  SQL écrit dans {sql_path}")

    env = load_env()
    token = env.get("SUPABASE_ACCESS_TOKEN")
    if not token:
        print("Erreur: SUPABASE_ACCESS_TOKEN manquant dans .env")
        sys.exit(1)

    print("Insertion dans Supabase...")
    http_code, body = execute_sql(sql, token)

    if http_code in ("200", "201"):
        print(f"Import réussi ! {len(actions)} actions insérées/mises à jour.")
    else:
        print(f"Erreur HTTP {http_code}:")
        print(body[:500])
        sys.exit(1)


if __name__ == "__main__":
    main()

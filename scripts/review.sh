#!/usr/bin/env bash

set -e

echo "=== AI Code Review (Local Diff Mode) ==="

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
AI_DIR="$ROOT_DIR/.ai"

mkdir -p "$AI_DIR"

DIFF_FILE="$AI_DIR/diff.txt"
PROMPT_FILE="$AI_DIR/review_prompt.txt"
AGENTS_FILE="$ROOT_DIR/AGENTS.md"
INSTRUCTION_FILE="$ROOT_DIR/AI/task/instruction.md"
SEED_FILE="$ROOT_DIR/AI/task/seed.md"

echo "Generating local diff against HEAD (staged + unstaged)..."
git diff HEAD > "$DIFF_FILE"

if [ ! -s "$DIFF_FILE" ]; then
  echo "❗ No changes detected. Diff is empty."
  echo "Make sure you have uncommitted changes or staged commits."
  exit 1
fi

echo "Local diff saved to $DIFF_FILE"

if [ ! -f "$AGENTS_FILE" ]; then
  echo "❗ Missing AGENTS.md at repository root"
  exit 1
fi

if [ -f "$INSTRUCTION_FILE" ]; then
  SPEC_FILE="$INSTRUCTION_FILE"
  SPEC_LABEL="instruction.md"
elif [ -f "$SEED_FILE" ]; then
  SPEC_FILE="$SEED_FILE"
  SPEC_LABEL="seed.md"
  echo "⚠️  AI/task/instruction.md not found. Falling back to AI/task/seed.md."
else
  echo "❗ Missing both AI/task/instruction.md and AI/task/seed.md"
  exit 1
fi

echo "Building review prompt..."
cat <<EOF > "$PROMPT_FILE"
# AI Code Review Request

Below is the local git diff (not PR diff), combined with repository
guidelines and the current task specification.

Use the review rules defined in AGENTS.md.

---

## Diff
$(cat "$DIFF_FILE")

---

## AGENTS.md
$(cat "$AGENTS_FILE")

---

## Task Spec (${SPEC_LABEL})
$(cat "$SPEC_FILE")

EOF

echo "Review prompt generated at $PROMPT_FILE"
echo "=== Ready to copy and send to Codex ==="

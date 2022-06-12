#!/bin/bash

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";
CMD="./svg-objects-export-master/svg-objects-export.py";
cd "$SCRIPT_DIR" || exit 1;

$CMD --force --type plain-svg --pattern '^dice-*' --destdir ../src/components/dices/svg/ ./dice-set-rounded-opt.svg



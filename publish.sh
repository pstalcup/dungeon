#!/usr/bin/env bash
set -e

OUT=dist
BRANCH=gh-pages
TMP=$(mktemp -d)

git worktree add "$TMP" "$BRANCH"
rm -rf "$TMP"/*
cp -r "$OUT"/* "$TMP"/

pushd "$TMP"
git add .
git commit -m "Deploy $(date)"
git push origin "$BRANCH"

popd
git worktree remove "$TMP"


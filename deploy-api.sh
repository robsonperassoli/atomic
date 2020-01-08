#!/bin/sh
git subtree push --prefix api gigalixir master

# Force version
#git push gigalixir `git subtree split --prefix api master`:master --force


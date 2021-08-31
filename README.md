CURRENTLY ALPHA/EXPERIMENTAL

# Blocklister

**This add-on injects JavaScript into web pages. The `addons.mozilla.org` domain disallows this operation, so this add-on will not work properly when it's run on pages in the `addons.mozilla.org` domain.**

## What it does

This extension just includes:

* a content script, "main.js", that is injected into any pages
under "google.com/" or any of its subdomains

The content script inserts buttons which allow users to blocklist the url from future search results.


lint CLI command: npx eslint main.js

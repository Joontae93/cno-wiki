---
title: 'Wordpress, Github and WP Engine'
description: 'A guide to creating tight integrations with our 3 main platforms'
pubDate: 'Mar 28 2023'
author: 'KJ Roelke'
---

## An overview

As a growing dev team, version control and real-time collaboration takes more time, effort and care. I wanted to write this doc as an 'intermediate-level' overview for combining these three tools, since no documentation truly exists for devs at this level.

**Note: This is not an overview of using Github.**

## Git, Github and WP Engine (WPE)

As a jumping off point, uploading a theme to Github is not that hard, and makes the most logical sense. However, this is not the best way to things in order to give yourself the best dev experience.

In a nutshell, here are the things you want to do:

1. [Create an SSH Key and connect your machine to WP Engine](https://wpengine.com/support/git/?_gl=1*1ul30yz*_ga*MTA1ODYyODkwNC4xNjc0NjY5OTMy*_ga_9HX6WG40N2*MTY4MDAxMDM5My40OC4xLjE2ODAwMTA0MTAuMC4wLjA.)
2. Initialize your `public` folder as the root of your Git repo (**DO NOT** publish to Github..._yet_)
3. Add a proper `.gitignore` file ([this VS Code plugin](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore) is a great place to start)
4. Add a new Git Remote and link it to [git@git.wpengine.com](#)
5. Add a _second_ git remote to Github
6. Push to both remotes (in terminal, `git push <remote> <branch>`).

### Git Remotes & VS Code

VS Code _can_ handle multiple remotes, but it sort of breaks the tighter integration available with the [Github Pull Requests and Issues extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github).

<mark>At the intial time of authoring, I'm not sure if it makes more sense to initialize the Github repo first and WP Engine second, or the reverse order.</mark>

Mostly, while annoying because it breaks the Git Sync GUI, it _does_ afford us the option to push to 2 remotes, thereby keeping Github and <abbr>WPE</abbr> in sync without needing to use Local.

### The .gitignore

If you pull the .gitignore starter in with the extension, you only need to add a few lines.

```git
/node_modules

# Configuration
wp-config.php
/_wpeprivate
/.vscode
/.wpe-*
local-xdebuginfo.php
.DS_Store
```

The full file, extended, is as follows:

```git
# Wordpress - ignore core, configuration, examples, uploads and logs.
# https://github.com/github/gitignore/blob/main/WordPress.gitignore

/node_modules
# Core
#
# Note: if you want to stage/commit WP core files
# you can delete this whole section/until Configuration.
/wp-admin/
/wp-content/index.php
/wp-content/languages
/wp-content/plugins/index.php
/wp-content/themes/index.php
/wp-includes/
/index.php
/license.txt
/readme.html
/wp-*.php
/xmlrpc.php

# Configuration
wp-config.php
/_wpeprivate
/.vscode
/.wpe-*
local-xdebuginfo.php
.DS_Store

# Example themes
/wp-content/themes/twenty*/


# WP-Content
/wp-content/uploads/
/wp-content/upgrade/


# Log files
*.log

# htaccess
/.htaccess

# All plugins
#
# Note: If you wish to whitelist plugins,
# uncomment the next line
/wp-content/plugins

# All themes
#
# Note: If you wish to whitelist themes,
# uncomment the next line
# /wp-content/themes
# !/wp-content/themes/[your-theme-name]
```

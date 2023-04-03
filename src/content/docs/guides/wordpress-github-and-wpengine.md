---
title: 'Wordpress, Github and WP Engine'
description: 'A guide to creating tight integrations with our 3 main platforms'
pubDate: 'Mar 28 2023'
author: 'KJ Roelke'
updatedDate: 'Apr 3 2023'
---

## An overview

As a growing dev team, version control and real-time collaboration takes more time, effort and care. I wanted to write this doc as an 'intermediate-level' overview for combining these three tools, since no documentation truly exists for devs at this level.

**Note: This is not an overview of using Github.**

As a jumping off point, uploading a theme to Github is not that hard, and makes the most logical sense. However, this is not the best way to things in order to give yourself the best dev experience.

### A Quick FYI

These headings are a bit out of order, as I've sorted by content. Step 2 is at the bottom because it has a long subsection on .gitignore that&mdash;while important&mdash;is not really helpful after the first time you read it, and should mostly already be done for you in the [starter theme](https://github.com/choctaw-nation/cno-template-theme) we have.

**If this is your first time reading, your best Order of Operations is:**

1. **WP Engine**
2. **VS Code & Git(hub)** _[take note of the .gitignore section]_
3. **Adding WPE to Git in VS Code**

## WP Engine

In a nutshell, here are the things you want to do:

1. [Create an SSH Key and connect your machine to WP Engine](https://wpengine.com/support/git/?_gl=1*1ul30yz*_ga*MTA1ODYyODkwNC4xNjc0NjY5OTMy*_ga_9HX6WG40N2*MTY4MDAxMDM5My40OC4xLjE2ODAwMTA0MTAuMC4wLjA.)
    1. Follow _**Option A**_, and use `ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/wpegitkey`
    2. Use `cat ~/.ssh/wpegitkey.pub`
    3. _Using the same dev name_, add the whole line (`ssh-ed25519 ... <your-email@choctawnation.com>`) to **every environment** you want to be able to push to in WP Engine. (This allows you to create multiple remotes in VS Code).

This will allow you to add remotes in VS code.

## Adding WPE to Git in VS Code

### Add a _second_ git remote to WP Engine

Once your repo is set up and transferred to the Org and all that, here's the next steps:

1. Open VS Code's Terminal and run `ssh git@git.wpengine.com info` to check that your expected repo appears
2. Run `git remote add <branch> <wpe-name> <git@git.wpengine.com:THE_URL>` where:

    - `<branch>` is the name of your branch (probably `master`...look in the bottom left of your widnow),
    - `<wpe-name>` is a name that makes sense to you (and maybe others)&mdash;for example, I used `hldev` for the Choctaw Hunting Lodge Dev environment
    - `<git@git.wpengine.com:THE_URL>` is the environment git remote url (found on the `Git Push` tab of the environment in WP Engine). [Click here for an example.](https://my.wpengine.com/installs/cnodev/git_push)

3. With the terminal, run `git push <remote> <branch>` to push to WP Engine (in this example, I would run `git push hldev master` or `git push hldev master --force` to force changes through)
    - `--force` - ing changes through _will_ overrwrite WP Engine, so use with caution!

## VS Code & Git(hub)

1. Initialize your `public` folder as the root of your Git repo (**DO NOT** publish to Github..._yet_)
2. Add a proper `.gitignore` file ([this VS Code plugin](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore) is a great place to start)
3. Push to Github and transfer ownership

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

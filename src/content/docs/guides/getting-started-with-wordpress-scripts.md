---
title: "Getting started (with @wordpress/scripts)"
description: "@wordpress/scripts is an npm package developed by Wordpress"
pubDate: "Mar 03 2023"
updatedDate: "Jul 27 2023"
# heroImage: '/placeholder-hero.jpg'
author: "KJ Roelke"
---

_[Here is another write-up that might be helpful and/or better than mine.](https://wpdev.academy/concepts/make-webpack-configuration-easy-with-wordpress-scripts/)_

[@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) is an npm package developed by Wordpress that loads typically-necessary dependencies into your project for development.

For our purposes, it contains Babel, PostCSS, SCSS, React, and more.

If downloading this repo to your machine for the first time, run `npm install` in Terminal (while inside of the `choctawnation` theme folder) and everything will be downloaded accordingly. If `node_modules` gets installed outside the theme folder, simply move it in (i.e. `~/choctawnation/node_modules` and everything will work normally.

## CSS 💄&mdash;the biggest change

@wordpress/scripts comes with [2 key script commands](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/#setup): `build` and `start`.

Generally, when making changes, the developer experience (DX) is as follows:

1. (Optional) Create an issue in Github
2. Create a branch from an issue in Github
3. Run `npm run start` in the command line and begin making changes
4. Make your changes
5. Quit the Start Command (Control + C)
6. Run `npm run build`
7. Create a Pull Request

### 👀 Behind the Scenes

@wordpress/scripts does a bunch of really great stuff for us behind the scenes that makes our code uniform, performant and backwards-compatible for both CSS & JS.

### 🙋🏻‍♂️ What about urgent changes?

The way the stylesheet is enqueued, Wordpress Native's `style.css` will **always** be able to override the styles that get built by the `build` command (assuming you write with proper specificity).

When you need to make quick changes, you _can_ make them in `style.css`, and as you'll see in the stylesheet, you should also try to create a new Github issue to refactor it into the appropriate SCSS partial file.

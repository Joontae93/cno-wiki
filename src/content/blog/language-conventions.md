---
title: 'Language Conventions'
description: 'Common Web Language Authoring Conventions'
pubDate: 'Mar 03, 2023'
heroImage: '/placeholder-hero.jpg'
author: 'KJ Roelke'
---

Since we use Bootstrap/Bootscore as a starter for many of our themes and we operate inside of Wordpress, we should follow similar language style conventions to make things uniform.

## Clean Code Practices 🛁

[Here's a good summary of Robert Martin's book, _Clean Code_](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29).

- Add type declarations to function arguments in PHP
- Comment your code according JSDoc/PHPDoc syntax so VS Code's Intelephense can pick up function description and argument expectations on hover.
- ⚠️ Function/Variable names should be descriptive enough that the code reads like good documentation ⚠️
  - Don't be lazy about this, as comments are prone to grow stale or be moved separately from their related functions.

### The Ternary Operator

[Read more about the ternary operator.](/blog/guides/ternary-operator)

### Single Line `if` Statement Example

An incredibly common pattern in plugin development is the `exit` or `die` line if 'ABSPATH' is defined. According to Wordpress's Style guide, that line should be written as:

```php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
```

However, I (KJ) believe this is unnecessary formatting for a simple line of code that is already obscure for new(er) developers. Thus, in this instance, the line should be refactored to `if (!defined('ABSPATH')) exit;`.

---

## PHP 🐘

### General Conventions

- Generally, try to follow the [Wordpress Developer Codex](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- Comment your files! Copying and Pasting without an edit is poor practice and makes it harder to keep track of where you are&mdash;especially if you're copying a bootscore/plugin file to make changes to.
- **Always** prefer `snake_case` for function/variable names over `camelCase` or `kebab-case`
- Place as much PHP in the top of a file as possible so the the HTML can remain, largely, pure HTML.
  - If the top of a file becomes inordinately long (e.g. 20+ lines), consider trying to refactor into something else.
  - Stay in PHP as long as you can (e.g. your top-matter should only have the opening `<?php` and closing tag at the end.
  - The last line should generally be `get_header('some_header') ?>` whenever possible, to signify to the author that we are breaking into the HTML matter.

#### Breaking Changes 🚨

Prefer single line statements. Ternary operators can be used if it increases readability (i.e. keeps things on one line). Also, Single line `if` statements are fine to implement without brackets

### Mixed Markup (HTML + PHP)

- In the case of single-line HTML + PHP, consider using [string literals](https://www.droptica.com/blog/combining-string-literals-and-variables-php/) to enhance readability and reduce silly errors (e.g. a floating `>` after dropping in-and-out of PHP and HTML for an `<a>` tag

### Refactoring

- Theme functions and plugin-like files (e.g. CPT Declarations) should live inside `inc/` folder and appropriate sub-directories.

---

## CSS 💄

### General Conventions

- Prefer SCSS over pure CSS
- Use `@use` over `@import` wherever possible
  - Bootstrap is, unfortunately, built on top of `@import` statements for simple overrides, but this is poor practice as `@import` will be deprecated. Typically, I (KJ) have found that I only really need the `breakpoints` mixins, and that is easy enough to copy into my own `mixins.scss` file to reuse with the `@use` rule. Also, since Bootstrap is open-source, it's totally legal to do so :)

### File Architecture 📘

- The top-level scss file (named either `main.scss` or `global.scss` should `@use` all components that are _global_ to a site. The `styles/pages` directory should `@use` styles that simply override globals or contain page-specific styles.
- The `src/styles` folder is the root directory for all SCSS/CSS files, and should utilize the [7-1 Architecture pattern](https://www.learnhowtoprogram.com/user-interfaces/building-layouts-preprocessors/7-1-sass-architecture).
  - We may not have all 7 folders, but this convention is still helpful to use, especially when telling Webpack what to look for.

### Enqueuing Styles (with PHP 🐘)

`functions.php` should enqueue `global.css` from the `dist/css` folder as **second-to-last** in the chain.

Enqueue Order:

1. ...Vendors.css
2. dist/css/global.css
3. style.css (required by Wordpress)

Each php (🐘) page should enqueue its own css (💄) on the line before `get_header('some-header') ?>` so the page only ships with the css it needs. Thus, the Enqueue Order might be understood as:

1. ...vendors.css
   2a. dist/css/global.css
   2b. dist/css/page/page.css
2. style.css (required by Wordpress)

Where 2b is dynamically injected on each page by the server.

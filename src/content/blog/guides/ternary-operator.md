---
title: 'Ternary Operator Example'
description: 'How (and when) to use the Ternary Operator'
pubDate: 'Mar 03 2023'
heroImage: '/cno-wiki/public/placeholder-hero.jpg'
author: 'KJ Roelke'
updatedDate: 'Mar 24 2023'
---

As the Ternary Operator pattern can exist in both JS :electron: and PHP 🐘, I (KJ) decided to break this example out onto its own page.

⚠️ This page's code blocks are written in php 🐘, and the concept applies to both languages ⚠️

## Example 1: A great use case for the ternary operator

**Before:**

```php
$biskinik_cat_name = '';
$biskinik_term = get_the_terms( get_the_ID(), 'biskinik_categories' );
if ( $biskinik_term ) {
    $biskinik_cat_name = $biskinik_term[0]->slug;
}
```

By the single-line-if-statement rule, this could be refactored as:

**Single-Line `if` statement:**

```php
$biskinik_cat_name = '';
$biskinik_term = get_the_terms( get_the_ID(), 'biskinik_categories' );
if ( $biskinik_term ) $biskinik_cat_name = $biskinik_term[0]->slug;
```

However, since the purpose of this `if` statement is to conditionally assign a variable's contents, the single-line `if` statement clutters the readability of code. A ternary operator allows the purpose of the condition check to come first, thus the line _could_ be refactored as follows:

**Ternary Operator:**

```php
$biskinik_term = get_the_terms(get_the_ID(), 'biskinik_categories');
$biskinik_cat_name = ($biskinik_term) ?  $biskinik_term[0]->slug : '';
```

Here, we see that `$biskinik_cat_name` is being set conditionally to either the first term's slug or an empty string.
**In this case, prefer either the first block or the ternary operator block, as the middle block obscures and confuses the code's intention.**

---

## Example 2: A poor use-case for the ternary operator

```php
if (get_post_meta(get_the_ID(), 'archive_content', true)) {
    $content = get_post_meta(get_the_ID(), 'archive_content', true);
} else {
    $content = get_post_meta(get_the_ID(), 'content', true);
}
```

At first glance, this code block could benefit from both single-line `if` statements _and_ the ternary operator, however, here is an argument _against_ using either.

Since this is an `if/else` statement, one could only use a single line statement for the `else` block, but the arguments are quite close and the difference could easily be lost on a reader (the only difference is the second argument of `get_post_meta` being 'content' vs 'archive_content').

As this statement sets the value of `$content` based on a condition, the ternary operator would would like this:

```php
$content = (get_post_meta(get_the_ID(), 'archive_content', true)) ? (get_post_meta(get_the_ID(), 'archive_content', true)) : (get_post_meta(get_the_ID(), 'content', true));
```

However, this ternary operator breaks the single-line rule (by wrapping to a second line), and also further obscures the tiny argument difference by forcing the reader to read an almost identical block of code three times.

A better option would be to refactor this code to make it more readable overall.

### The Best Option 🏆

```php
$archive_content = get_post_meta(get_the_ID(), 'archive_content', true);
$content = ( ! empty($archive_content) ) ? $archive_content : get_post_meta(get_the_ID(), 'content', true);
```

Here, instead of relying on an empty string to be interpreted as a `falsy` value, we make use of php's `empty()` function to check if `$archive_content` is an empty string or `false` (both are possible `return` values of `get_post_meta()`) and set `$content` accordingly.

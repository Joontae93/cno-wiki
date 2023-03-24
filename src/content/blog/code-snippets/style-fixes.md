---
title: 'Common Style Fixes'
description: 'Code Snippets for CSS'
pubDate: 'Mar 24 2023'
# heroImage: '/placeholder-hero.jpg'
author: 'Blake Perkins'
---

# Vimeo Fixes

## Fix Vimeo Responsive Styling

Replace `/*iframe here*/` with video iframe.

```html
<style>
	.embed-container {
		position: relative;
		padding-bottom: 56.25%;
		overflow: hidden;
		max-width: 100%;
		height: auto;
		aspect-ratio: 16/9;
	}

	.embed-container iframe,
	.embed-container object,
	.embed-container embed {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>

<div class="embed-container">
	<!-- iframe here -->
</div>
```

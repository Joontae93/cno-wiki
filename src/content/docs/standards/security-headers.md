---
title: 'Security Headers'
description: 'Security Headers for Wordpress'
pubDate: 'Mar 31 2023'
# heroImage: '/placeholder-hero.jpg'
author: 'Blake Perkins'
---

Set these up in WPE environments.

```x-frame-options SAMEORIGIN
permissions-policy		geolocation=(self "https://choctawnation.com"), microphone=()
referrer-policy			origin
strict-transport-security	max-age=63072000; includeSubDomains; preload
x-content-type-options	nosniff
```

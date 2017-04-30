---
layout: docs
title: Grids
description: 
group: layouts
---

# Grids

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quaerat nostrum earum error voluptatum, nemo non, rem hic dolorem libero, id optio soluta enim placeat quia suscipit nulla, quas dicta.

Containers are not meant to be placed side by side; use [grids]({{ site.baseurl }}/layouts/grids.html) for patterns that require multi-column layouts.

## Default Grid
Grid columns are all equal widths by default and will collapse into new rows if packed too tightly; this happens automatically thanks to their flexbox display property.

<div class="rd__example">
  <div class="container">
    <div class="row">
      <div class="col-auto bg-color-gray-light">
        <p class="bg-color-gray">Column 1</p>
      </div>
      <div class="col-auto bg-color-gray-light">
        <p class="bg-color-gray">Column 2</p>
      </div>
      <div class="col-auto bg-color-gray-light">
        <p class="bg-color-gray">Column 3</p>
      </div>
    </div>
  </div>
</div>

```html
<div class="container">
  <div class="row">
    <div class="col-auto">
      <p>Column 1</p>
    </div>
    <div class="col-auto">
      <p>Column 2</p>
    </div>
    <div class="col-auto">
      <p>Column 3</p>
    </div>
  </div>
</div>
```

## Default Grid With Gutters
Grids can have gutters by adding a gutter class to the parent row class. Gutters can be any width that matches the [spacer utility class]({{ site.baseurl }}/utilities/spacers.html) padding widths.

Note that it is recommended that any containers holding a grid with gutters use the [overflow hidden display utility class]({{ site.baseurl }}/utilities/display.html), otherwise the top padding applied to the row will overflow the top of the container.

<div class="rd__example">
  <div class="container overflow-hidden">
    <div class="row gutters">
      <div class="col-auto bg-color-gray-light">
        <p class="bg-color-gray">Column 1</p>
      </div>
      <div class="col-auto bg-color-gray-light">
        <p class="bg-color-gray">Column 2</p>
      </div>
      <div class="col-auto bg-color-gray-light">
        <p class="bg-color-gray">Column 3</p>
      </div>
    </div>
  </div>
  <p>...</p>
  <div class="container overflow-hidden">
    <div class="row gutters-u6">
      <div class="col-auto bg-color-gray-light">
        <p class="bg-color-gray">Column 1</p>
      </div>
      <div class="col-auto bg-color-gray-light">
        <p class="bg-color-gray">Column 2</p>
      </div>
      <div class="col-auto bg-color-gray-light">
        <p class="bg-color-gray">Column 3</p>
      </div>
    </div>
  </div>
</div>

```html
<div class="container overflow-hidden">
  <div class="row gutters">
    <div class="col-auto">
      <p>Column 1</p>
    </div>
    <div class="col-auto">
      <p>Column 2</p>
    </div>
    <div class="col-auto">
      <p>Column 3</p>
    </div>
  </div>
</div>

<div class="container overflow-hidden">
  <div class="row gutters-u6">
    <div class="col-auto">
      <p>Column 1</p>
    </div>
    <div class="col-auto">
      <p>Column 2</p>
    </div>
    <div class="col-auto">
      <p>Column 3</p>
    </div>
  </div>
</div>
```

## Default Grid With Responsive Gutters
Gutter widths can change depending on viewport width by using responsive modifiers; the example below has no gutters at the smallest size.

<div class="rd__example">
  <div class="container overflow-hidden">
    <div class="row gutters-sm gutters-u1-md gutters-u2-lg">
      <div class="col-auto bg-color-gray-light">
        <p class="bg-color-gray">Column 1</p>
      </div>
      <div class="col-auto bg-color-gray-light">
        <p class="bg-color-gray">Column 2</p>
      </div>
    </div>
  </div>
</div>

```html
<div class="container overflow-hidden">
  <div class="row gutters-sm gutters-u1-md gutters-u2-lg">
    <div class="col-auto">
      <p>Column 1</p>
    </div>
    <div class="col-auto">
      <p>Column 2</p>
    </div>
    <div class="col-auto">
      <p>Column 3</p>
    </div>
  </div>
</div>
```

## Variable Width Columns
You can create columns of various widths by using a column size class, which is written as `.col-*-md` where `*` represents the number of columns your content will span.

Rancho ships with a twelve column grid by default; you can [increase or decrease the number of columns]({{ site.baseurl }}/configuration/grids) by editing the appropriate configuration file.

<div class="rd__example">
  <div class="container overflow-hidden">
    <div class="row gutters">
      <div class="col-12 col-3-md bg-color-gray-light">
        <p class="bg-color-gray">Column 1/4</p>
      </div>
      <div class="col-12 col-9-md bg-color-gray-light">
        <p class="bg-color-gray">Column 3/4</p>
      </div>
    </div>
  </div>
  <p>...</p>
  <div class="container overflow-hidden">
    <div class="row gutters">
      <div class="col-12 col-3-md bg-color-gray-light">
        <p class="bg-color-gray">Column 1/4</p>
      </div>
      <div class="col-12 col-3-md bg-color-gray-light">
        <p class="bg-color-gray">Column 1/4</p>
      </div>
      <div class="col-12 col-6-md bg-color-gray-light">
        <p class="bg-color-gray">Column 1/2</p>
      </div>
    </div>
  </div>
</div>

```html
<div class="container overflow-hidden">
  <div class="row gutters-sm gutters-u1-md gutters-u2-lg">
    <div class="col-auto">
      <p>Column 1</p>
    </div>
    <div class="col-auto">
      <p>Column 2</p>
    </div>
    <div class="col-auto">
      <p>Column 3</p>
    </div>
  </div>
</div>
```
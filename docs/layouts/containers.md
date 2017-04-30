---
layout: docs
title: Containers
description: 
group: layouts
---

# Containers

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab quaerat nostrum earum error voluptatum, nemo non, rem hic dolorem libero, id optio soluta enim placeat quia suscipit nulla, quas dicta.

Containers are not meant to be placed side by side; use [grids]({{ site.baseurl }}/layouts/grids.html) for patterns that require multi-column layouts.

## Default Container
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi soluta molestiae vel praesentium dolorum.

<div class="rd__example">
  <div class="container bg-color-green">
    <p class="bg-color-gray">This is a container.</p>
  </div>
</div>

```html
<div class="container">
  ..
</div>
```

## Default Container With Responsive Padding
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi soluta molestiae vel praesentium dolorum.

<div class="rd__example">
  <div class="container px mb bg-color-gray-light">
    <p class="bg-color-gray">This is a container.</p>
  </div>
  <div class="container px px-u1-md mb bg-color-gray-light">
    <p class="bg-color-gray">This is a container with the padding increased one level.</p>
  </div>
  <div class="container px px-u2-md bg-color-gray-light">
    <p class="bg-color-gray">This is a container with the padding increased two levels.</p>
  </div>
  <p>...</p>
  <div class="container px px-u6-md mb bg-color-gray-light">
    <p class="bg-color-gray">This is a container with the padding increased six levels.</p>
  </div>
  <div class="container pt pt-u1-md px pb-u2 pb-u4-md mb bg-color-gray-light">
    <p class="bg-color-gray">This is a container with default side padding, top padding decreased one level, and bottom padding increased four levels.</p>
  </div>
</div>

```html
<div class="container px">
  ..
</div>

<div class="container px px-u1-md">
  ..
</div>

<div class="container px px-u2-md">
  ..
</div>

<div class="container px px-u6-md">
  ..
</div>

<div class="container pt pt-u1-md px pb-u4">
  ..
</div>
```

## Medium Container
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi soluta molestiae vel praesentium dolorum.

<div class="rd__example">
  <div class="container-medium pa bg-color-gray-light">
    <p class="bg-color-gray">This is a medium container.</p>
  </div>
</div>

```html
<div class="container-medium pa">
  ..
</div>
```

## Small Container
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi soluta molestiae vel praesentium dolorum.

<div class="rd__example">
  <div class="container-small pa bg-color-gray-light">
    <p class="bg-color-gray">This is a small container.</p>
  </div>
</div>

```html
<div class="container-small pa">
  ..
</div>
```

## Small Container With Form
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi soluta molestiae vel praesentium dolorum.

<div class="rd__example">
  <div class="container-small pa">
    <div class="card">
      <div class="card__header bg-color-brand">
        <h3 class="headline h5">
          <i class="fa fa-check-square-o" aria-hidden="true"></i>
          Example Form
        </h3>
      </div>
      <form>
        <div class="pa">
          <label for="example-name">Name</label>
          <input type="text" id="example-name">
          <label for="example-restaraunt">Favorite Restaraunt</label>
          <input type="text" id="example-restaraunt">
        </div>
        <footer class="flex justify-end bg-color-gray-lighter pa bt mt">
          <button class="btn btn--link">Cancel</button>
          <button class="btn">
            Go There!
          </button>
        </footer>
      </form>
    </div>
  </div>
</div>

```html
<div class="container-small pa">
  <div class="card">
    <div class="card__header bg-color-brand">
      <h3 class="headline h5">
        <i class="fa fa-check-square-o" aria-hidden="true"></i>
        Example Form
      </h3>
    </div>
    <form>
      <div class="pa">
        <label for="example-name">Name</label>
        <input type="text" id="example-name">
        <label for="example-restaraunt">Favorite Restaraunt</label>
        <input type="text" id="example-restaraunt">
      </div>
      <footer class="flex justify-end bg-color-gray-lighter pa bt mt">
        <button class="btn btn--link">Cancel</button>
        <button class="btn">
          Go There!
        </button>
      </footer>
    </form>
  </div>
</div>
```
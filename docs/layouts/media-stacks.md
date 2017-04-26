---
layout: docs
title: Media Stacks
description: 
group: layouts
---

## Media Stacks

Media Stacks are similar to <a href="/layouts/media-objects.html">Media Objects</a> when viewed on larger screens, the key difference being that they stack when viewed on mobile displays, with the image above the content. Media Stacks are tied to the same media query that determines when nav menus switch to their mobile view.

<h2 class="h4 mt-u4">Default Media Stack</h2>
Media stacks display two columns, with the left column taking up 25% of space and the right taking 75% when viewed on wide displays; the left content sits above the right when viewed on smaller device widths.

<div class="ba bw-d3 pa-u1">
  <div class="media-stack my-u2">
    <div class="media-stack__icon">
      <img src="../../assets/images/img1-thumb.jpg" alt="A plastic toy dinosaur in front of a house plant.">
    </div>
    <div class="media-stack__content">
      <h2 class="headline h5">
        Media Stack Title
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor veritatis eos facere rerum, minima, saepe consequatur fugit libero hic quisquam et tenetur excepturi cumque laudantium rem debitis eaque ut ipsum.</p>
    </div>
  </div>
</div>

```html
<div class="media-stack">
  <div class="media-stack__icon">
    <img src=".." alt="..">
  </div>
  <div class="media-stack__content">
    <h2 class="headline h5">
      Media Stack Title
    </h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor veritatis eos facere rerum, minima, saepe consequatur fugit libero hic quisquam et tenetur excepturi cumque laudantium rem debitis eaque ut ipsum.</p>
  </div>
</div>
```

<h2 class="h4 mt-u4">Reversed Media Stack</h2>
Media Stacks can be reversed, placing the image to the right of the content. Note that the content itself remains aligned to the left of the Media Stack by default.

<div class="ba bw-d3 pa-u1">
  <div class="media-stack media-stack--reverse my-u2">
    <div class="media-stack__icon">
      <img src="../../assets/images/img1-thumb.jpg" alt="A plastic toy dinosaur in front of a house plant.">
    </div>
    <div class="media-stack__content">
      <h2 class="headline h5">
        Media Stack Title
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor veritatis eos facere rerum, minima, saepe consequatur fugit libero hic quisquam et tenetur excepturi cumque laudantium rem debitis eaque ut ipsum.</p>
    </div>
  </div>
</div>

```html
<div class="media-stack media-stack--reverse">
  <div class="media-stack__icon">
    <img src=".." alt="..">
  </div>
  <div class="media-stack__content">
    <h2 class="headline h5">
      Media Stack Title
    </h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor veritatis eos facere rerum, minima, saepe consequatur fugit libero hic quisquam et tenetur excepturi cumque laudantium rem debitis eaque ut ipsum.</p>
  </div>
</div>
```

<h2 class="h4 mt-u4">Centered Media Stack</h2>
Media Stacks can be centered along the horizontal axis using the appropriate Rancho Flexbox utility class. Note that you do not need to include the display flex utility, as Media Stacks are already displaying with flexbox by default.

<div class="ba bw-d3 pa-u1">
  <div class="media-stack my-u2 align-items-center-nv">
    <div class="media-stack__icon">
      <img class="rd-disk" src="../../assets/images/img1-thumb.jpg" alt="A plastic toy dinosaur in front of a house plant.">
    </div>
    <div class="media-stack__content">
      <h2 class="headline h5">
        Media Stack Title
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor veritatis eos facere rerum, minima, saepe consequatur fugit libero hic quisquam et tenetur excepturi cumque laudantium rem debitis eaque ut ipsum.</p>
    </div>
  </div>
</div>

```html
<div class="media-stack align-items-center-nv">
  <div class="media-stack__icon">
    <img class="rd-disk" src=".." alt="..">
  </div>
  <div class="media-stack__content">
    <h2 class="headline h5">
      Media Stack Title
    </h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor veritatis eos facere rerum, minima, saepe consequatur fugit libero hic quisquam et tenetur excepturi cumque laudantium rem debitis eaque ut ipsum.</p>
  </div>
</div>
```

<h2 class="h4 mt-u4">Media Stack With Side Content</h2>
Media Stacks are contain content below the image, making them useful for blog posts and other contained content. Note the use of a <a href="/compomemts/cards/">card component</a> in the below example.

<div class="ba bw-d3 pa-u1">
  <div class="card pa-u2">
    <div class="media-stack">
      <div class="media-stack__icon">
        <img class="rd-disk" src="../../assets/images/img1-thumb.jpg" alt="A plastic toy dinosaur in front of a house plant.">
        <div class="py-u1">
          <ul class="no-style font-style-italic text-subdued">
            <li><i class="fa fa-fw fa-user" aria-hidden="true"></i> Pete Medina</li>
            <li><i class="fa fa-fw fa-calendar" aria-hidden="true"></i> November 2019</li>
            <li><i class="fa fa-fw fa-rebel" aria-hidden="true"></i> Pilot</li>
          </ul>
        </div>
      </div>
      <div class="media-stack__content">
        <h2 class="headline h3">
          Media Stack Title
        </h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor veritatis eos facere rerum, minima, saepe consequatur fugit libero hic quisquam et tenetur excepturi cumque laudantium rem debitis eaque ut ipsum.</p>
        <p>Harum animi eos consectetur similique molestiae distinctio laboriosam porro facilis sequi enim. A magni, culpa voluptates odit reiciendis.</p>
        <a class="btn" href="#">Read More <span class="sr-only">about Media Stack Title</span></a>
      </div>
    </div>
  </div>
</div>

```html
<div class="card pa-u2">
  <div class="media-stack">
    <div class="media-stack__icon">
      <img class="rd-disk" src="../../assets/images/img1-thumb.jpg" alt="A plastic toy dinosaur in front of a house plant.">
      <div class="py-u1">
        <ul class="no-style font-style-italic text-subdued">
          <li><i class="fa fa-fw fa-user" aria-hidden="true"></i> Pete Medina</li>
          <li><i class="fa fa-fw fa-calendar" aria-hidden="true"></i> November 2019</li>
          <li><i class="fa fa-fw fa-rebel" aria-hidden="true"></i> Pilot</li>
        </ul>
      </div>
    </div>
    <div class="media-stack__content">
      <h2 class="headline h3">
        Media Stack Title
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor veritatis eos facere rerum, minima, saepe consequatur fugit libero hic quisquam et tenetur excepturi cumque laudantium rem debitis eaque ut ipsum.</p>
      <p>Harum animi eos consectetur similique molestiae distinctio laboriosam porro facilis sequi enim. A magni, culpa voluptates odit reiciendis.</p>
      <a class="btn" href="#">Read More <span class="sr-only">about Media Stack Title</span></a>
    </div>
  </div>
</div>
```

<h2 class="h4 mt-u4">Media Stack Without Image</h2>
Media Stacks don&rsquo;t always require an image. Note the use of a <a href="/utilities/spacers.html">padding top utility class</a> in the example below. We do that to better align the icons with the title text; such a technique is highly dependent on the font family and size you are using, and may not be necessary in all cases.

<div class="ba bw-d3 pa-u1">
  <div class="card pa-u2">
    <div class="media-stack">
      <div class="media-stack__icon">
        <div class="pt-d1 pb-u1">
          <ul class="no-style font-style-italic text-subdued">
            <li><i class="fa fa-fw fa-user" aria-hidden="true"></i> Pete Medina</li>
            <li><i class="fa fa-fw fa-calendar" aria-hidden="true"></i> November 2019</li>
            <li><i class="fa fa-fw fa-rebel" aria-hidden="true"></i> Pilot</li>
          </ul>
        </div>
      </div>
      <div class="media-stack__content">
        <h2 class="headline h3">
          Media Stack Title
        </h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor veritatis eos facere rerum, minima, saepe consequatur fugit libero hic quisquam et tenetur excepturi cumque laudantium rem debitis eaque ut ipsum.</p>
        <p>Harum animi eos consectetur similique molestiae distinctio laboriosam porro facilis sequi enim. A magni, culpa voluptates odit reiciendis.</p>
        <a class="btn" href="#">Read More <span class="sr-only">about Media Stack Title</span></a>
      </div>
    </div>
  </div>
</div>

```html
<div class="card pa-u2">
  <div class="media-stack">
    <div class="media-stack__icon">
      <div class="pt-d1 pb-u1">
        <ul class="no-style font-style-italic text-subdued">
          <li><i class="fa fa-fw fa-user" aria-hidden="true"></i> Pete Medina</li>
          <li><i class="fa fa-fw fa-calendar" aria-hidden="true"></i> November 2019</li>
          <li><i class="fa fa-fw fa-rebel" aria-hidden="true"></i> Pilot</li>
        </ul>
      </div>
    </div>
    <div class="media-stack__content">
      <h2 class="headline h3">
        Media Stack Title
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor veritatis eos facere rerum, minima, saepe consequatur fugit libero hic quisquam et tenetur excepturi cumque laudantium rem debitis eaque ut ipsum.</p>
      <p>Harum animi eos consectetur similique molestiae distinctio laboriosam porro facilis sequi enim. A magni, culpa voluptates odit reiciendis.</p>
      <a class="btn" href="#">Read More <span class="sr-only">about Media Stack Title</span></a>
    </div>
  </div>
</div>
```
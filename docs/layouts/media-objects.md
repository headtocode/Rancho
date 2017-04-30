---
layout: docs
title: Media Objects
description: 
group: media-objects
---

# Media Objects

Media objects in their simplest form are nothing more than an image and text aligned vertically along the center axis. They&rsquo;re commonly used on things like comment headers, blog posts and other messaging systems. Media Objects are displayed using flexbox and can accept any of the <a href="utilities/flexbox">Rancho Flexbox</a> utility classes related to alignment, justification, and more.

<h2 class="h5 mt-u4">Default Media Object</h2>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi soluta molestiae vel praesentium dolorum.

<div class="ba bw-d3 pa-u1">
  <div class="media">
    <div class="media__icon">
      <img width="64" height="64" src="../../assets/images/img1-thumb.jpg" alt="A plastic toy dinosaur in front of a house plant.">
    </div>
    <div class="media__content">
      <h2 class="headline h6">
        Media Object Title
      </h2>
    </div>
  </div>
</div>

```html
<div class="media">
  <div class="media__icon">
    <img width="64" height="64" src=".." alt="..">
  </div>
  <div class="media__content">
    <h2>
      Media Object Title
    </h2>
  </div>
</div>
```

<h2 class="h5 mt-u4">Media Object Reversed</h2>
Media objects can be reversed, placing the image to the right of the content. Note that the content itself remains aligned to the left of the media object by default.

<div class="ba bw-d3 pa-u1">
  <div class="media media--reverse">
    <div class="media__icon">
      <img width="64" height="64" src="../../assets/images/img1-thumb.jpg" alt="A plastic toy dinosaur in front of a house plant.">
    </div>
    <div class="media__content">
      <h2 class="headline h6">
        Media Object Title
      </h2>
    </div>
  </div>
</div>

```html
<div class="media media--reverse">
  <div class="media__icon">
    <img width="64" height="64" src=".." alt="..">
  </div>
  <div class="media__content">
    <h2>
      Media Object Title
    </h2>
  </div>
</div>
```

<h2 class="h5 mt-u4">Media Object Center</h2>
Media objects can be centered along the horizontal axis using the appropriate <a href="utilities/flexbox">Rancho Flexbox</a> utility class. Note that you do not need to include the display flex utility, as media objects are already displaying with flexbox by default.

<div class="ba bw-d3 pa-u1">
  <div class="media align-items-center">
    <div class="media__icon">
      <img width="64" height="64" src="../../assets/images/img1-thumb.jpg" alt="A plastic toy dinosaur in front of a house plant.">
    </div>
    <div class="media__content">
      <h2 class="headline h6">
        Media Object Title
      </h2>
    </div>
  </div>
</div>

```html
<div class="media align-items-center">
  <div class="media__icon">
    <img width="64" height="64" src=".." alt="..">
  </div>
  <div class="media__content">
    <h2>
      Media Object Title
    </h2>
  </div>
</div>
```

<h2 class="h5 mt-u4">Media Object In a Card</h2>
Media objects can be placed inside other components. Below is an example of a media object inside a card. In this example, we add the <a href="utilities/flexbox">flex and align-items utility classes</a> to the media content in order to align the link, byline, and dates.

<div class="ba bw-d3 pa-u1">
  <div class="card pa">
    <div class="media align-items-center">
      <div class="media__icon">
        <img class="rd-disk" width="64" height="64" src="../../assets/images/img1-thumb.jpg" alt="A plastic toy dinosaur in front of a house plant.">
      </div>
      <div class="media__content flex align-items-center">
        <h2 class="headline h6 mr">
          <a href="#">Media Object Title Link</a>
        </h2>
        <p class="font-size-em ma-0">by Pete Medina</p>
        <p class="font-size-em headline ml-auto">
          <i class="fa fa-lg fa-fw fa-clock-o" aria-hidden="true"></i> November 2019
        </p>
      </div>
    </div>
  </div>
</div>

```html
<div class="card pa">
  <div class="media align-items-center">
    <div class="media__icon">
      <img class="rd-disk" width="64" height="64" src=".." alt="..">
    </div>
    <div class="media__content flex align-items-center">
      <h2 class="headline h6 mr">
        <a href="#">Media Object Title Link</a>
      </h2>
      <p class="font-size-em ma-0">by Pete Medina</p>
      <p class="font-size-em headline ml-auto">
        <i class="fa fa-lg fa-fw fa-clock-o" aria-hidden="true"></i> November 2019
      </p>
    </div>
  </div>
</div>
```


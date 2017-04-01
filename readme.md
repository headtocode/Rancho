<div align="center">
	<h1>
      <a href="http://rancho.run">
          <img src="http://rancho.run/assets/images/rancho.svg" height="40" width="210" alt="Rancho">
      </a>
    </h1>
    <p>Rancho is a fast and well designed HTML and SCSS framework for building responsive web pages and applications.</p>
</div>

## Table of Contents
- [Get Started](#get-started)
- [Status](#status)
- [What You Get](#what-you-get)
- [Documentation](#documentation)
- [Versioning](#versioning)
- [Creators](#creators)
- [Copyright and License](#copyright-and-license)

## Get Started

Rancho requires, at minimum, a SASS compiler and [Autoprefixer](https://github.com/postcss/autoprefixer) to use. The included package.json file assumes a [Node](https://nodejs.org/en/) and [Gulp](http://gulpjs.com/) based workflow and will handle dependency installations for you. Simply run ```npm install``` on the command line tool of your choice to get cooking.

- [Download the latest Rancho release](https://github.com/headtocode/rancho/archive/rancho-1.0.0-alpha.1.zip)
- Make sure you have Node and Gulp installed globally
- Run ```npm install``` in the project directory
- Run ```gulp watch``` to watch for changes and auto-compile upon saving

A CDN providing access to pre-compiled and minified CSS and Javascript will be available shortly.

## What You Get

Rancho includes the following files:

```
rancho/
├──dev/
|  ├──images/
|  ├──scss/
|  |  └── ...scss source files
|  └──scripts/
|     └── ...js source files
├──public/
|  ├──index.html
|  └──assets
|     |--css/
|     |  ├──rancho.css
|     |  └──rancho.min.css
|     ├──images/
|     └──scripts/
|        ├──rancho.css
|        └──rancho.min.css
├──gulpfile.js
├──package.json
└──readme.md
```

It is strongly recommended that you use the minified versions of the CSS and Javascript with gzip compression applied for production sites. Images added to ```dev/images``` will be automatically optimized for the web and saved to ```public/assets/images``` using [Gulp Imagemin](https://github.com/sindresorhus/gulp-imagemin).

## Documentation
Documentation coming soon.

## Versioning
Rancho versioning is mantained using the [Semantic Versioning 2.0.0](http://semver.org/spec/v2.0.0.html) MAJOR.MINOR.PATCH  standard.

## Creators

The Rancho Framework is designed and mantained by [Peter Medina](http://petermedina.com). It includes the following MIT licensed components:

- [Normalize.css](https://necolas.github.io/normalize.css/) by [Nicolas Gallagher](http://nicolasgallagher.com/) and [Jonathan Neal](http://music.thewikies.com/jonneal)
- [jQuery Accessible Accordions](https://a11y.nicolas-hoffmann.net/accordion/) by [Nicolas Hoffmann](https://github.com/nico3333fr)
- [Accessible Modal Window](https://github.com/scottaohara/accessible_modal_window) by [Scott O&rsquo;Hara](https://github.com/scottaohara)
- [Accessible Tabs](http://simplyaccessible.com/article/danger-aria-tabs/) by [Jeff Smith](https://github.com/jeffsmith)
- [Font Awesome](https://github.com/FortAwesome/Font-Awesome) by [Dave Gandy](https://github.com/davegandy)

## Copyright and License

Code copyright &copy; 2017 Peter Medina and contributors. Code released under the MIT License. Rancho Framework and the Rancho logo are trademarks of Peter Medina, all rights reserved. Go forth and make something excellent.
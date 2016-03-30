# TubeFu.js
[![TubeFu.js on NPM](https://img.shields.io/npm/v/tube-fu.js.svg)](https://www.npmjs.com/package/tube-fu.js)

A lightweight, mobile-friendly, performance-oriented alternative to embed YouTube videos.

## About
Embed YouTube videos without the performance hit from all those Iframes.  TubeFu.js makes smart, pagespeed-optimized video embedding completely automatic.  TubeFu.js also automagically makes your embedded videos completely fluid & responsive...no more fighting those YouTube Iframes that overflow their containers.  If you're using YouTube videos on your site, give TubeFu.js a shot...you'll be shocked at the performance boost, especially on mobile devices!

## Usage
To use TubeFu.js, you'll need a modern JavaScript workflow and build system with ES6 module bundling and transpiling capabilities.  [Here's](https://github.com/callmecavs/outset) a great example.

### Install
Install TubeFu.js via NPM and add to your dependencies:

```bash
$ npm install tube-fu.js --save
```

### Initialize

Import the TubeFu.js module, then instantiate it.  The constructor takes several optional arguments, but you should find the defaults work great for everything but edge cases.

```es6
// import TubeFu.js
import TubeFu from 'tube-fu.js'

// create an instance
const Tube = new TubeFu()
```

You're only one step away from lightning-fast embedded videos.  You'll need to make a simple edit to the standard YouTube embed code in your HTML.  Simply change the YouTube element's tag type from 'iframe' to 'div' and add the class 'tube-fu', like so:

```html
// change the standard YouTube embed code from this:
<iframe width="420" height="315" src="https://www.youtube.com/embed/notKtAgfwDA" frameborder="0" allowfullscreen></iframe>

// to this
<div class="tube-fu" width="420" height="315" src="https://www.youtube.com/embed/notKtAgfwDA" frameborder="0" allowfullscreen></div>
```

That's it, you're now equipped with a lightning-fast, completely responsive, bandwidth-sipping video embedding system.  Please note that you may encounter issues if you have any additional options or query-strings referenced in the YouTube element's URL.  Just stick with the standard copy/paste YouTube embed code, TubeFu.js can take care of optional stuff for you at the constructor.

### Selector

To change the embedded video element selector from the default 'tube-fu', pass a selector or element to the constructor as the first argument:

```es6
// Pass a selector
const Tube = new TubeFu({
  selector: '.css-selector',
  // options...
})

// Or element
const videoEl = document.querySelector('.sweet-vid');
const Tube = new TubeFu({
  selector: videoEl,
  // options...
})
```

Note that each embedded video on your page needs to have its own TubeFu.js instance, so make sure that you pass a unique selector or element to the constructor; not a NodeList.  If you have several videos with a common selector, you can iterate through the videos to create individual TubeFu.js instances:

```es6
const videos = document.querySelectorAll('.video-class');

for (let i = 0; i < videos.length; ++i) {
  new TubeFu({
    selector: videos[i],
    // options...
  })
}
```

#### Options

TubeFu.js was designed to "just work" with its default options, so no options are required.  If you need to tweak the way that TubeFu.js does its thing, read on!

Here is each available option, along with their defaults:

```es6
new TubeFu({
  selector: '.tube-fu',
  injectStyles: true, /* use false to completely disable automatic CSS injection */
  iframeClass: '.tube-fu-active', /* the class applied to the active video and thumbnails */
  playButtonClass: '.tube-fu-play-button', /* initial class of the play button */
  ytModestbranding: 1, /* youtube's "modest branding" option, accepts 1 or 0 */
  ytShowinfo: 0, /* youtube's "show info" option, accepts 1 or 0 */
  ytControls: 0, /* youtube's "show controls" option, accepts 1 or 0 */
  ytVq: 'hd720' /* youtube's "vq" option, accepts a youtube video quality parameter */
});
```

## License

[MIT](https://opensource.org/licenses/MIT). © 2016 Donny West

[![Makes People Smile](http://forthebadge.com/images/badges/makes-people-smile.svg)](http://forthebadge.com)

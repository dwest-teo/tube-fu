export default (selector) => {
  let resizing;

  const tubeEls = document.querySelectorAll(selector);

  const collect = [
    makeTubeList,
    getTubeSizes,
    getTubeAssets,
    applyBgs
  ]

  const setup = [
    applyStyles,
    applyClickAction,
    resizeAction
  ]

  function execSet(functions) {
    functions.forEach(func => func())
  }

  function arrPush(tubes) {
    return Array.prototype.slice.call(tubes);
  }

  function arrFill(length) {
    return Array.apply(null, Array(length)).map(() => 0)
  }

  function makeTubeList() {
    tubes = arrPush(tubeEls)
  }

  function getTubeSizes() {
    tubesWidth = tubes[0].style.width;
    tubesHeight = tubes.map(el => el.style.height);
  }

  function getTubeAssets() {
    tubesUrl = tubes[0].src;
    tubesThumb = tubes.map(el => el.src.substr(el.src.lastIndexOf('/') + 1));
  }

  function applyBgs() {
    tubes.forEach((el, index) => {
      el.style.backgroundImage = 'url(' + tubesThumb + '.jpg)';
      let playBtn = document.createElement('div');
      playBtn.classList.add('tube-fu-play-btn');
      playBtn.style.backgroundImage = 'url("data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"><g><path fill="#e8e8e8" d="M32,1C14.9,1,1,14.9,1,32s13.9,31,31,31s31-13.9,31-31S49.1,1,32,1z M42.6,32.8l-20,14 C22.4,46.9,22.2,47,22,47c-0.2,0-0.3,0-0.5-0.1C21.2,46.7,21,46.4,21,46V18c0-0.4,0.2-0.7,0.5-0.9c0.3-0.2,0.7-0.1,1,0.1l20,14 c0.3,0.2,0.4,0.5,0.4,0.8S42.8,32.6,42.6,32.8z"></path></g></svg>") no-repeat center center';
      playBtn.style.backgroundSize = '64px 64px';
      playBtn.style.position = 'absolute';
      playBtn.style.height = '100%';
      playBtn.style.width = '100%';
      playBtn.style.opacity = .8;
      playBtn.style.transition = 'opacity .2s';
      el.appendChild(playBtn);
    })

    let css = 'tube-fu-play-btn:hover{ opacity: 1}';
    let style = document.createElement('style');
    style.styleSheet
      ? style.styleSheet.cssText = css
      : style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  function applyStyles() {
    tubes.forEach((el, index) => {
      el.style.position = 'relative';
      el.style.paddingBottom = tubesHeight / tubesWidth * 100 + '%';
      el.style.paddingTop = '25px';
      el.style.height = 0;
    })
  }

  function applyClickAction() {
    tubes.forEach((el, index) => {
      el.addEventListener('click', () => {
        let iframeEl = document.createElement('iframe');
        iframeEl.setAttribute('src', tubesUrl + '?autoplay=1&autohide=1');
        iframeEl.setAttribute('frameborder', '0');
        iframeEl.style.position = 'absolute';
        iframeEl.style.top = 0;
        iframeEl.style.left = 0;
        iframeEl.style.width = '100%';
        iframeEl.style.height = '100%';
        el.appendChild(iframeEl);
        el.classList.add('tube-fu-active');
      })
    })
  }

  function runCollect() {
    execSet(collect)
  }

  function runSetup() {
    execSet(setup)
  }

  function resizeAction(flag = true) {
    const action = flag
      ? 'addEventListener'
      : 'removeEventListener'

    window[action]('resize', handleResize)
  }

  function handleResize() {
    if (!resizing) {
      requestAnimationFrame(runCollect)
      resizing = true
    }
  }
  document.addEventListener('DOMContentLoaded', runSetup);
}
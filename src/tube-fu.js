export default class TubeFU {
  constructor(options = {}) {
    this.options = {
      selector: options.selector || '.tube-fu',
      injectStyles: options.injectStyles || true,
      containerClass: options.containerClass || '.tube-fu',
      iframeClass: options.iframeClass || '.tube-fu-active',
      playButtonClass: options.playButtonClass || '.tube-fu-play-button',
      ytModestbranding: options.ytModestbranding || 1,
      ytShowinfo: options.ytShowinfo || 0,
      ytControls: options.ytControls || 0,
      ytVq: options.ytVq || 'hd720',
    };

    this.el = typeof this.options.selector === 'string'
      ? document.querySelector(this.options.selector)
      : this.options.selector;

    this.aspectRatio = this._calcAspectRatio();
    this.thumbnail = this._genThumbnail();
    this.playButton = this._genPlayButton();
    this.placeHolderId = this._genPlaceHolderId();
    this.placeHolderEl = this._genPlaceHolder();

    this._init();
  }

  _init() {
    this.options.injectStyles
      ? this._injectCss()
      : this._insertElsOnly();

    this.el.addEventListener('click', (event) => {
      this._insertFrame();
    });
  };

  _genPlaceHolderId() {
    let idPrefix = 'tube-fu-ph-';
    let idRand = Math.floor((Math.random() * 1000) + 1);
    let uniqueId = `${idPrefix}${idRand}`;

    return uniqueId;
  }

  _genPlaceHolder() {
    let iframeClassString = this.options.iframeClass.replace(/\./g,'');
    let placeHolder = document.createElement('div');
    placeHolder.classList.add(iframeClassString);
    placeHolder.setAttribute('id', this.placeHolderId);

    return placeHolder;
  }

  _calcAspectRatio() {
    let inlineHeight = this.el.getAttribute('height');
    let inlineWidth = this.el.getAttribute('width');
    return (inlineHeight / inlineWidth) * 100;
  };

  _insertElsOnly() {
    this.el.style.background = `url(${this.thumbnail}) no-repeat center center`;
    this.el.appendChild(this.playButton);
  };

  _injectCss() {
    let styleEl = document.createElement('style');
    styleEl.appendChild(document.createTextNode(''));
    document.head.appendChild(styleEl);
    let sheet = styleEl.sheet;

    let buttonHoverClass = `${this.options.playButtonClass}:hover`;
    let buttonClickedClass = `${this.options.playButtonClass}-clicked`;

    let containerCss = this._styleContainer();
    let iframeCss = this._styleFrame();
    let playButtonCss = this._stylePlayButton();
    let playButtonHoverCss = this._stylePlayButtonHover();
    let playButtonClickedCss = this._stylePlayButtonClicked();

    this._addCssRule(sheet, this.options.containerClass, containerCss);
    this._addCssRule(sheet, this.options.iframeClass, iframeCss);
    this._addCssRule(sheet, this.options.playButtonClass, playButtonCss);
    this._addCssRule(sheet, buttonHoverClass, playButtonHoverCss);
    this._addCssRule(sheet, buttonClickedClass, playButtonClickedCss);

    this._buildContainer();
  };

  _addCssRule(sheet, selector, rules, index) {
    index = index || 0;
    sheet.insertRule(selector + '{' + rules + '}', index);
  };

  _buildContainer() {
    this.el.appendChild(this.placeHolderEl);
    this.el.appendChild(this.playButton);
  };

  _styleContainer() {
    let stylePos = 'position: relative';
    let stylePadBot = `padding-bottom: ${this.aspectRatio}%`;
    let stylePadTop = 'padding-top: 25px';
    let styleWidth = 'width: 100%';
    let styleHeight = 'height: 0';
    let styleBg = `background: url(${this.thumbnail}) no-repeat center center`;
    let styleBgSize = 'background-size: cover';

    return `${stylePos};
      ${stylePadBot};
      ${stylePadTop};
      ${styleWidth};
      ${styleHeight};
      ${styleBg};
      ${styleBgSize};`;
  };

  _insertFrame() {
    let iframeClassString = this.options.iframeClass.replace(/\./g,'');
    let playButtonClassString = this.options.playButtonClass.replace(/\./g,'');
    let playButtonClickedClass = `${playButtonClassString}-clicked`;

    let iframe = document.createElement('iframe');
    let iframeSrc = this.el.getAttribute('src');
    let iframeParams = '?autoplay=1&autohide=1';
    let iframeOpts = `modestbranding=${this.options.ytModestbranding}&showinfo=${this.options.ytShowinfo}&controls=${this.options.ytControls}&vq=${this.options.ytVq}`;

    iframe.classList.add(iframeClassString);
    iframe.setAttribute('src', `${iframeSrc}${iframeParams}${iframeOpts}`);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');

    this.placeHolderEl = this.el.replaceChild(iframe, this.placeHolderEl);
    this.playButton.classList.add(playButtonClickedClass);
  };

  _styleFrame() {
    let stylePos = 'position: absolute';
    let styleTop = 'top: 0';
    let styleLeft = 'left: 0';
    let styleWidth = 'width: 100%';
    let styleHeight = 'height: 100%';
    let styleZIndex = 'z-index: 888';

    return `${stylePos};
      ${styleTop};
      ${styleLeft};
      ${styleWidth};
      ${styleHeight};
      ${styleZIndex};`;
  };

  _genThumbnail() {
    let sourceString = this.el.getAttribute('src');
    let thumbId = sourceString.substr(sourceString.lastIndexOf('/') + 1);
    let thumbUrl = `//i.ytimg.com/vi/${thumbId}/sddefault.jpg`;

    return thumbUrl;
  };

  _genPlayButton() {
    let playButtonClassString = this.options.playButtonClass.replace(/\./g,'');
    let playButton = document.createElement('div');
    playButton.classList.add(playButtonClassString);
    let playSvg = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64"><g><path fill="#e8e8e8" d="M32,1C14.9,1,1,14.9,1,32s13.9,31,31,31s31-13.9,31-31S49.1,1,32,1z M42.6,32.8l-20,14 C22.4,46.9,22.2,47,22,47c-0.2,0-0.3,0-0.5-0.1C21.2,46.7,21,46.4,21,46V18c0-0.4,0.2-0.7,0.5-0.9c0.3-0.2,0.7-0.1,1,0.1l20,14 c0.3,0.2,0.4,0.5,0.4,0.8S42.8,32.6,42.6,32.8z"></path></g></svg>';
    let encSvg = window.btoa(playSvg);
    playButton.style.background = `url("data:image/svg+xml;base64,${encSvg}") no-repeat 50%`;

    return playButton;
  };

  _stylePlayButton() {
    let stylePos = 'position: absolute';
    let styleTop = 'top: 0';
    let styleLeft = 'left: 0';
    let styleWidth = 'width: 100%';
    let styleHeight = 'height: 100%';
    let styleOpacity = 'opacity: .8';
    let styleTrans = 'transition: opacity .2s';
    let styleZIndex = 'z-index: 999';

    return `${stylePos};
      ${styleTop};
      ${styleLeft};
      ${styleWidth};
      ${styleHeight};
      ${styleOpacity};
      ${styleTrans};
      ${styleZIndex};`;
  };

  _stylePlayButtonHover() {
    let styleOpacity = 'opacity: 1';
    let styleCursor = 'cursor: pointer';

    return `${styleOpacity}; ${styleCursor};`;
  };

  _stylePlayButtonClicked() {
    let styleVisibility = 'visibility: hidden';
    let stylePointerEvents = 'pointer-events: none';

    return `${styleVisibility}; ${stylePointerEvents};`;
  };
}

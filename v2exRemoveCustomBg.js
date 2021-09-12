// ==UserScript==
// @name         V2EX remove Custom background
// @namespace    https://github.com/demon-zhonglin/tmJavaScript/v2exRemoveCustomBg.js
// @version      0.3
// @description  使用默认背景,去除用户自定义页面背景特效(适配夜间模式)
// @author       demon-zhonglin
// @match        https://v2ex.com/*
// @match        https://*.v2ex.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  var wrapperNode = document.querySelector('#Wrapper');
  wrapperNode.style.backgroundColor = wrapperNode.className === 'Night' ? '#22303f' : '#e2e2e2'
  wrapperNode.style.backgroundImage = 'url(/static/img/shadow_light.png)'
  wrapperNode.style.backgroundRepeat = 'repeat-x'
})();
// ==UserScript==
// @name         虎牙公屏去字体颜色
// @namespace    https://github.com/demon-zhonglin/tmJavaScript
// @version      0.1
// @description  虎牙去公屏文字颜色(改为默认:黑)
// @author       demon-zhonglin
// @include      https://www.huya.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const _style = document.createElement('style')
  _style.type = 'text/css'
  const styleText = document.createTextNode(".change_color { color: #000 !important; } .change_color li span.msg { color: #000 !important; }")
  _style.appendChild(styleText)
  document.body.appendChild(_style)

  const roomMsgList = window.document.querySelector('ul#chat-room__list')
  const msgListClassName = roomMsgList.className || ''
  if (!msgListClassName.includes('change_color')) {
    roomMsgList.className = `${msgListClassName} change_color`
  }
})();

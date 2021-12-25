// ==UserScript==
// @name         虎牙公屏去字体颜色
// @namespace    https://github.com/demon-zhonglin/tmJavaScript
// @version      0.2
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
  const styleText = document.createTextNode(".chat_item_change_color { color: #000 !important; } .chat_item_change_color div div, .chat_item_change_color div div div span.msg { color: #000 !important; }")
  _style.appendChild(styleText)
  document.body.appendChild(_style)

  function handlerChangeColor() {
    if (!(document.getElementById('chat-room__wrap').className || '').includes('chat_item_change_color')) {
      if (document.getElementById("chat-room__wrap").classList) { // 支持 classList 环境
        document.getElementById('chat-room__wrap').classList.add('chat_item_change_color')
      } else {
        document.getElementById('chat-room__wrap').className = `${document.querySelector('chat-room__wrap').className} chat_item_change_color`
      }
    }
  }

  const waitTimeNum = 20 // 单位:秒
  let timeNum = 0 // 单位:秒

  const timer = window.setInterval(() => {
    timeNum += 1
    if (timeNum >= waitTimeNum) window.clearInterval(timer)

    if (document.getElementById('chat-room__wrap')) {
      window.clearInterval(timer)
      handlerChangeColor()
    }
  }, 1000);
})();

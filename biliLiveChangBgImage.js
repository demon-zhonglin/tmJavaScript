// ==UserScript==
// @name         b站直播间去背景图
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  b站直播间去直播框上下背景图
// @author       demon-zhonglin
// @match        https://live.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const removeNodeBgImgList = ['#head-info-vm', '#gift-control-vm', '#rank-list-vm', '#rank-list-ctnr-box', '#chat-control-panel-vm', '.room-bg.webp.p-fixed', '.chat-history-panel']
  const removeNodeBgImgLoopMap = removeNodeBgImgList.reduce((acc, item) => ({...acc, [`${item}`]: 0}), {})
  const roomBgNode = ".room-bg.webp.p-fixed"

  const changeBgimg = (nodeID) => {
    const node = document.querySelector(nodeID)
    const timeNum = removeNodeBgImgLoopMap[nodeID] ?? 1
    if (node) {
      node.style.setProperty('background-color', "#181b1d", 'important')
      node.style.setProperty('background-image', "url()", 'important')
    } else {
      setTimeout(() => {
        removeNodeBgImgLoopMap[nodeID] += 1
        if(removeNodeBgImgLoopMap[nodeID] < 10) changeBgimg(nodeID)
      }, 200 * timeNum)
    }
  }

  // 去除 roombg:after 背景图
  const nodeAfterStyle = document.createElement("style");
  nodeAfterStyle.innerHTML =`${roomBgNode}:after {
    background-image: none;
  };
  `
  document.head.appendChild(nodeAfterStyle);

  removeNodeBgImgList.forEach(item => changeBgimg(item))
})();
// ==UserScript==
// @name         b站直播间去背景图
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  b站直播间去背景图
// @author       demon-zhonglin
// @match        https://live.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const nodeIDList = ['head-info-vm', 'gift-control-vm', 'rank-list-vm', 'rank-list-ctnr-box', 'chat-control-panel-vm']
  const nodeClassName = ['room-bg webp p-fixed']
  // const nodeLoopNum = nodeIDList.reduce((acc, item) => ({...acc, [`${item}`]: 0}), {})

  // 根据 node id 改
  const changeBackOfNodeID = (_list = []) => {
      _list.forEach((nodeID) => {
          const node = document.getElementById(nodeID)
          if(node) node.style.setProperty('background-image', "url()", 'important')
          else {
              changeBackItemID(nodeID)
              // nodeLoopNum[nodeID] += 1
              // if(nodeLoopNum[nodeID] < 10) changeBack([nodeID])
          }
      })
  }

  // 根据 node className 改
  const changeBackOfNodeClass = (classString) => {
    let node = document.getElementsByClassName('room-bg webp p-fixed')
    node = node ? node[0] : null

    if(node) node.style.setProperty('background-image', "url()", 'important')
  }

  const changeBackItemID = (nodeID) => {
    setTimeout(() => {
      const node = document.getElementById(nodeID)
      node.style.setProperty('background-image', "url()", 'important')
      // node.style.backgroundImage = "url()"
    }, 2000)
  }

  changeBackOfNodeID(nodeIDList)
  nodeClassName.forEach(item => changeBackOfNodeClass(item))
})();
// ==UserScript==
// @name         免登录 b站直播间 深色模式
// @namespace    https://github.com/demon-zhonglin/tmJavaScript
// @version      0.6
// @description  b站直播间去直播框上下背景图(先启用b站默认深色模式,在修改背景图)
// @author       demon-zhonglin
// @match        https://live.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  
  const nodeIDList = ['#head-info-vm', '#gift-control-vm', '#rank-list-vm', '#rank-list-ctnr-box', '#chat-control-panel-vm', '.room-bg.webp.p-fixed']
  const roomBgNode = ".room-bg.webp.p-fixed"

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return ''
  }

  const waitNodeBili = ({ selector = '', timeNum = 500, callback = Function.prototype, frq = 0}) => {
    try {
      const node = window.document.querySelector(selector)
      if (node) {
        // callback(selector)
        callback(node, selector)
        return
      } else {
        setTimeout(function() {
          if (frq >= 10) return
          waitNodeBili({ selector, timeNum, callback, frq: ++frq })
        }, timeNum)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  // 移除 背景图|默认背景色
  const changBg = () => {
    nodeIDList.forEach(item => {
      waitNodeBili({
        selector: item,
        callback: (node, _selector) => {
          // const node = document.querySelector(_selector)
          // console.log('node', node.id, [node])
          node.style.setProperty('background-image', "url()", 'important')
          node.style.setProperty('background-color', "#181b1d", 'important')
        }
      })
    })
  }
  
  // 启用b站默认深色模式(实验室-深色模式)
  const clickBtn = () => waitNodeBili({
    selector: '#sidebar-vm .content-wrapper > div.lab-cntr > div:nth-child(2) > .lab-toggle-btn > div',
    callback: (node, selector) => {
      node.click()
      const _laboratory_div = window.document.querySelector(`#sidebar-vm .side-bar-cntr > div:nth-child(2) > div`)
      _laboratory_div.click()

      changBg()
    }
  })

  // 显示菜单
  const showMenu = () => waitNodeBili({
    selector: `#sidebar-vm .side-bar-cntr > div:nth-child(2)`, // > div
    callback: (__node, _selector) => {
      __node.click()
      __node.querySelector('div.side-bar-btn-cntr').click()
      clickBtn()
    }
  })

  const isNologin = getCookie('DedeUserID')
  if (!isNologin) { // 无登录
    waitNodeBili({
      selector: '#sidebar-vm .side-bar-cntr',
      callback: (_node, selector) => {
        _node.style.cssText = 'height: 120px;'
        const _selector = `${selector} > div:nth-child(2)`
        const laboratory = window.document.querySelector(`${_selector}`)
        laboratory.style.cssText = 'dispaly: block;'
        showMenu()
      }
    })
  } else {
    if (getCookie('theme_style') === 'dark') { // 登录状态是黑暗模式,移除背景图
      changBg()
    }
  }

  // 去除 roombg:after 背景图
  try {
    const nodeAfterStyle = document.createElement("style");
    nodeAfterStyle.innerHTML =`${roomBgNode}:after {
      background-image: none;
    };
    `
    document.head.appendChild(nodeAfterStyle);
  } catch (error) {
    console.log('===== tampermonkey =====')
    console.log('error', error)
    console.log('===== tampermonkey =====')
  }
})();
// ==UserScript==
// @name         虎牙免登陆清晰度
// @namespace    https://github.com/demon-zhonglin/tmJavaScript
// @version      0.5
// @description  虎牙免登陆可控清晰度【自动切最高清晰度】【自 2022-05-12 huya 更新后，全网首发 huya 绕过登录可切换画质清晰度】
// @author       demon-zhonglin
// @include      https://*.huya.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
  'use strict';

  const waitNode = ({ selector = '', timeNum = 500, callback = Function.prototype, frq = 0}) => {
    const node = document.querySelector(selector)
    if (node) {
      callback(selector)
      return
    } else {
      setTimeout(function() {
        if (frq >= 10) return
        waitNode({ selector, timeNum, callback, frq: ++frq})
      }, timeNum)
    }
  }

  const _hasOwnProperty = (__obj = {}, __key = '') => {
    let keys = __key.split('.')
    if (keys.length === 1) return Object.prototype.hasOwnProperty.call(__obj, __key)
    const childObj = __obj[keys[0]]
    keys.shift()
    return _hasOwnProperty(childObj, keys.join('.'))
  }

  const waitObjectHasKey = ({ _obj = {}, _key = '', timeNum = 500, callback = Funciton.prototype, frq = 0 }) => {
    let keys = _key.split('.')

    if (_hasOwnProperty(_obj, _key)) {
      callback(_obj, _key)
      return
    } else {
      setTimeout(function() {
        if (frq >= 20) return
        frq += frq
        waitObjectHasKey({ _obj, _key, timeNum, callback, frq })
      }, timeNum)
    }
  }

  // 更新画质项 节点属性
  const changeVideotypeItem = () => {
    const videotypeList = document.querySelectorAll('.player-menu-panel ul.player-videotype-list > li')
    if (videotypeList.length > 0) {
      for (let _i = 0; _i < videotypeList.length; _i++) {
        videotypeList[_i].setAttribute('isenjoybitrate', '0')
      }
      setTimeout(() => {
        try{
          videotypeList[0].click()
        } catch {
          window.alert('自动切换画质失败,请手动切换视频画质!')
        }
      }, 1000)
    }
  }

  // 显示 画质切换
  const changPlayerMenuVisible = () => {
    waitNode({
      selector: 'div.player-videotype div.player-menu-panel',
      timeNum: 500,
      callback: (selector) => {
        const node = document.querySelector(selector)
        // node.style.setProperty('dispaly', "block", 'important')
        node.style.cssText = 'display: block; height: 210px;'
        changeVideotypeItem()
      }
    })
  }

  // 显示 视频下方菜单
  const changPlayerCtrlVisible = () => {
    waitNode({
      selector: '#player-ctrl-wrap',
      timeNum: 500,
      callback: (selector) => {
        const node = document.querySelector(selector)
        node.style.setProperty('bottom', "60px", 'important')
        setTimeout(() => {
          changPlayerMenuVisible()
        }, 2000)
      }
    })
  }

  const main = () => {
    waitObjectHasKey({
      obj: window,
      _key: 'HyLogin',
      callback: () => {
        window.HyLogin.prototype.closeUdbLogin = function() {
          window.HyLogin.notice("loginClose")
        }
      }
    })

    // 关闭登录弹窗
    waitNode({
      selector: '#UDBSdkLgn',
      callback: (selector) => {
        const node = document.querySelector(selector)
        node.style.cssText = 'display: none;'
      }
    })

    const loopEvent = (num = 0) => {
      if (window.VPlayer.prototype.videoStatus === 0) { // 视频就绪
        changPlayerCtrlVisible()
        return
      }
      setTimeout(() => {
        if (num > 10) return
        loopEvent(++num)
      }, 500)
    }

    // 监听视频状态
    waitObjectHasKey({
      _obj: window,
      _key: 'VPlayer.prototype.videoStatus',
      callback: loopEvent
    })
  }

  main()
})();

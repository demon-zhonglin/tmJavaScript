// ==UserScript==
// @name         虎牙免登陆清晰度
// @namespace    https://github.com/demon-zhonglin/tmJavaScript
// @version      0.1
// @description  虎牙免登陆清晰度
// @author       demon-zhonglin
// @include      https://www.huya.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function getCookieValueByName(name) { // 从 cookie 中获取 key 值
    var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : "";
  }

  const isLogin = getCookieValueByName('udb_passport') // 当前登录用户 虎牙号
  if (!isLogin) {
    localStorage.setItem('loginTipsCount', -1e+35);
  }

  if (typeof $ === 'function') { // huya 自带有引用 jq
    $(document).ready(function(){
      if (!isLogin) {
        $('#player-login-tip-wrap').remove();
        VPlayer.prototype.checkLogin(true);
      }
    })
  }
})();

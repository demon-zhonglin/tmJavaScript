// ==UserScript==
// @name         V2EX remove Custom background
// @namespace    https://github.com/demon-zhonglin/tmJavaScript
// @version      0.5
// @description  使用默认背景,去除用户自定义页面背景特效(默认黑夜主题)
// @author       demon-zhonglin
// @match        https://v2ex.com/*
// @match        https://*.v2ex.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_notification
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
  'use strict';

  var wrapperNode = document.querySelector('#Wrapper');
  // wrapperNode.style.backgroundColor = wrapperNode.className === 'Night' ? '#22303f' : '#e2e2e2'
  const oldBgColor = wrapperNode.style.backgroundColor
  const oldBgImg = wrapperNode.style.backgroundColor
  const oldBgRepeat = wrapperNode.style.backgroundColor

  // 菜单
  const menus = [
    { key: 'menu_theme_black', name: '黑夜模式', tips: '黑夜模式', default: true, color: '#22303f', value: true },
    { key: 'menu_theme_white', name: '正常模式', tips: '黑夜模式', default: false, color: '#e2e2e2', value: false },
  ], menuID = [];

  for (let i = 0; i < menus.length; i++){ // 如果读取到的值为 null 就写入默认值
    if (GM_getValue(menus[i].key) == null) GM_setValue(menus[i].key, menus[i].default);
  }

  // 菜单开关
  function changeMenu(menuStatus, Name, Tips) {
    if (menuStatus == 'true'){
      GM_setValue(`${Name}`, false);
      GM_notification({
        text: `已关闭 [${Tips}] 功能\n`,
        timeout: 3500,
        onclick: () => {}
      })
    } else {
      GM_setValue(`${Name}`, true);
      GM_notification({
        text: `已开启 [${Tips}] 功能\n`,
        timeout: 3500,
        onclick: () => {}
      });
    }
    registerMenuCommand(); // 重新注册脚本菜单
  };

  // 注册菜单
  function registerMenuCommand() {
    if (menuID.length > menus.length){ // 如果菜单ID数组多于菜单数组,说明不是首次添加菜单,需要卸载所有脚本菜单
      for (let i = 0; i < menuID.length; i++){
        GM_unregisterMenuCommand(menuID[i]);
      }
    }
    for (let i=0; i < menus.length; i++){ // 循环注册脚本菜单
      menus[i].value = GM_getValue(menus[i].key);
      menuID[i] = GM_registerMenuCommand(
        `${menus[i].value ? '✅' : '❌'} ${menus[i].name}`,
        function(){
          changeMenu(`${menus[i].value}`,`${menus[i].key}`,`${menus[i].tips}`)
        }
      );
    }
  }

  // 变更背景
  const changeBg = (item) => {
    wrapperNode.className = item.key === menus[0].key ? 'Night' : ''
    wrapperNode.style.backgroundColor = item.color
    wrapperNode.style.backgroundImage = 'url(/static/img/shadow_light.png)'
    wrapperNode.style.backgroundRepeat = 'repeat-x'
  }

  // 返回菜单值
  const getMenuValue = (menuName) => {
    for (let menuItem of menus)
      if (menuItem.key == menuName) return menuItem.value
  }

  // 变更主题
  const changeTheme = (item) => {
    const themeKey = item.key
    switch(themeKey) {
      case menus[0].key:
        changeBg(menus[0])
        break;
      case menus[1].key:
        changeBg(menus[1])
        break;
    }
  }


  registerMenuCommand()
  if(getMenuValue(menus[0].key)) changeTheme(menus[0])
  if(getMenuValue(menus[1].key)) changeTheme(menus[1])

})();
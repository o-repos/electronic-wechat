'use strict';

const Common = require('../common');

class CSSInjector {
}

CSSInjector.commonCSS = `
    .emoji{
      margin:0 2px;
    }
    .login{
      -webkit-app-region: drag;
    }
    .action{
      -webkit-app-region: no-drag;
      cursor: pointer!important;
    }
    div.header{
      padding:0px 18px 18px 18px;
    }
    div .header #miniFrame{
      height:30px;
      display: inline-block;
      -webkit-app-region: no-drag;
      position: absolute;
    }
    div .header #miniFrame:hover>div{
      top:0;
    }
    div .header #miniFrame div{
      position:relative;
      height:30px;
      top:-30px;
      transition:top 0.1s;
      display:inline-block;
    }
    div .header #miniFrame img{
      float:left;
      width:20px;
      height:20px;
      margin:5px 5px 0 0;
      -webkit-app-region: no-drag;
    }
    div .header #miniFrame img:hover{
      background-color: rgba(255,255,255,0.1);
      box-shadow: 0px 0px 10px #888888;
    }
    div.download_entry{
      display:none;
    }
    div.box_hd .title_wrap{
      z-index:1000;
    }
    div.box_hd {
        -webkit-app-region: drag;
    }
    div.box_hd .ext{
      -webkit-app-region: no-drag;
    }
    div.panel.give_me .nav_view{
      top:166px;
    }
    div.title.poi {
        -webkit-app-region: no-drag;
    }
    div.header .avatar, div.header .info {
        -webkit-app-region: no-drag;
        padding-top:30px;
    }
    div.main {
      height: 100%;
      min-height: 0;
      padding-top: 0;
    }
    div.main_inner {
      max-width: none;
      min-width: 0;
      border-radius:0;
    }
    div.message_empty {
      margin-top: 50px;
    }
    div.img_preview_container div.img_opr_container {
      bottom: 50px;
    }
    p.copyright {
      display: none !important
    }
    a.web_wechat_screencut {
      display: none !important;
    }
    * {
      -webkit-user-select: none;
      cursor: default !important;
      -webkit-user-drag: none;
    }
    pre, input {
      -webkit-user-select: initial;
      cursor: initial !important;
    }
    .js_message_plain{
      user-select: text;
    }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    div.login_box {
      top: initial;
      left: initial;
      margin-left: initial;
      margin-top: initial;
      width: 100%;
      height: 100%;
    }
    div.login {
      min-width: 0;
      min-height: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .login_box .refresh_qrcode_mask{
      -webkit-app-region: no-drag;
    }
    div.lang, div.copyright {
      display: none !important
    }
    /* Group mention: user selection box */
    div#userSelectionBox select option:hover {
      background: #eeeeee;
    }
    div#userSelectionBox select option {
      padding: 4px 10px;
      text-overflow: hidden;
      font-size: 14px;
    }
    .user_select_hint_text {
      padding: 4px 10px;
      font-size: 14px;
      background: #eeeeee;
    }
    div#userSelectionBox select {
      border: none;
      outline: none;
      height: inherit;
    }
    div#userSelectionBox {
      box-shadow: 1px 1px 10px #ababab;
      background: #fff;
      display: none;
      position: fixed;
      bottom: ${Common.MENTION_MENU_INITIAL_Y}px;
      left: ${Common.MENTION_MENU_INITIAL_X}px;
    }
    span.measure_text {
      padding-left: 20px;
      outline: 0;
      border: 0;
      font-size: 14px;
    }
    img.emojione {
      width: 20px;
      height: 20px;
    }
    div.jp-jplayer{
      overflow-y:hidden;
    }
    div.jp-jplayer video{
      background-color: #eee;
    }
    div.ngdialog-close{
      -webkit-app-region: no-drag;
      cursor: pointer!important;
    }
    div.ngdialog-close:hover{
      background-color: rgba(255,255,255,0.1);
      box-shadow: 0px 0px 10px #888888;
    }
    .dropdown_menu{
      -webkit-app-region: no-drag;
    }
    .box_hd .ext{
      -webkit-app-region: no-drag;
    }
    .login_box .association .button.button_primary{
      -webkit-app-region: no-drag;
    }
    .login_box .association .button.button_default{
      -webkit-app-region: no-drag;
    }
    .bubble_cont a{
      user-select: text;
    }
    .bubble_cont .video img{
      max-width: 200px;
      max-height: 300px;
      height: auto!important;
      width: auto!important;
    }
    .box_ft>.content{
      height: calc(100% - 90px);
    }
    .box_ft>.content>.edit_area{
      height:100%!important;
    }
    @media (max-width: 512px) {
      .panel {
        width: 75px !important;
        transition: width .3s;
      }
      .panel .header,
      .chat_item {
        padding: 8px 16px !important;
      }
      .header,
      .panel .tab,
      .search_bar,
      .chat_item .info,
      .chat_item .ext {
        display: none !important
      }
      .nav_view {
        top: 36px !important
      }
      .chat_item.active {
        border-left: 2px solid #02b300 !important
      }
      .action .desc {
        display: none;
      }
      .action .btn_send {
        width: 30px;
      }
    }
  `;

CSSInjector.osxCSS = `
    div.header div.avatar img.img {
      width: 24px;
      height: 24px;
    }
    div.header {
      padding-top: 38px;
      padding-bottom: 8px;
    }
    span.display_name {
      width: 172px !important;
    }
    @media (max-width: 512px) {
      .nav_view {
        top: 36px !important
      }
    }
`;

module.exports = CSSInjector;

'use strict';

const path = require('path');
const {app, shell , ipcMain , Notification} = require('electron');


const UpdateHandler = require('./handlers/update');
const Common = require('./common');
const AppConfig = require('./configuration');

const SplashWindow = require('./windows/controllers/splash');
const WeChatWindow = require('./windows/controllers/wechat');
const SettingsWindow = require('./windows/controllers/settings')
const AppTray = require('./windows/controllers/app_tray');


class ElectronicWeChat {
  constructor() {
    this.wechatWindow = null;
    this.splashWindow = null;
    this.settingsWindow = null;
    this.tray = null;
  }

  init() {
    if(this.checkInstance()) {
      this.initApp();
      this.initIPC();
    } else {
      app.quit();
    }
  }
  checkInstance() {
    //不检查是否多实例
    return true
    // app.makeSingleInstance这个方法有问题，暂时不会打开多实例检查功能
    // if (AppConfig.readSettings('multi-instance') === 'on') return true;
    // return !app.makeSingleInstance((commandLine, workingDirectory) => {
    //   if(this.splashWindow && this.splashWindow.isShown){
    //     this.splashWindow.show();
    //     return
    //   }
    //   if(this.wechatWindow){
    //     this.wechatWindow.show();
    //   }
    //   if(this.settingsWindow && this.settingsWindow.isShown){
    //     this.settingsWindow.show();
    //   }
    // });
  }
  initApp() {
    app.on('ready', ()=> {
      this.createSplashWindow();
      this.createWeChatWindow();
      this.createSettingsWindow()
      this.createTray();

      if (!AppConfig.readSettings('height')) {
        AppConfig.saveSettings('language', AppConfig.readSettings('language')||'zh-CN');
        AppConfig.saveSettings('prevent-recall', AppConfig.readSettings('prevent-recall')||'on');
        AppConfig.saveSettings('icon', AppConfig.readSettings('icon')||'black');
        AppConfig.saveSettings('multi-instance',AppConfig.readSettings('multi-instance')||'on');
        AppConfig.saveSettings('click-notification',AppConfig.readSettings('click-notification')||'on')
        AppConfig.saveSettings('frame',AppConfig.readSettings('frame')||'on')
        AppConfig.saveSettings('close',AppConfig.readSettings('close')||'on')
        AppConfig.saveSettings('update',AppConfig.readSettings('update')||'on')
        AppConfig.saveSettings('width',AppConfig.readSettings('width')||800)
        AppConfig.saveSettings('height',AppConfig.readSettings('height')||600)
      }
      new Notification({
        title:'Electronic WeChat',
        body:'已经准备就绪',
        icon:path.join(__dirname, '../assets/icon.png')
      }).show()
    });

    app.on('activate', () => {
      if (this.wechatWindow == null) {
        this.createWeChatWindow();
      } else {
        this.wechatWindow.show();
      }
    });
  };

  initIPC() {
    ipcMain.on('badge-changed', (event, num) => {
      if (process.platform == "darwin") {
        app.dock.setBadge(num);
        if (num) {
          this.tray.setTitle(` ${num}`);
        } else {
          this.tray.setTitle('');
        }
      } else if (process.platform === "linux" || process.platform === "win32") {
          app.setBadgeCount(num * 1);
          this.tray.setUnreadStat((num * 1 > 0)? 1 : 0);
      }
    });

    ipcMain.on('user-logged', () => {
      this.wechatWindow.resizeWindow(true, this.splashWindow)
    });

    ipcMain.on('wx-rendered', (event, isLogged) => {
      this.wechatWindow.resizeWindow(isLogged, this.splashWindow)
    });

    ipcMain.on('log', (event, message) => {
      console.log(message);
    });

    ipcMain.on('reload', (event, repetitive) => {
      if (repetitive) {
        this.wechatWindow.loginState.current = this.wechatWindow.loginState.NULL;
        this.wechatWindow.connectWeChat();
      } else {
        this.wechatWindow.loadURL(Common.WEB_WECHAT);
      }
    });

    ipcMain.on('update', (event, message) => {
      let updateHandler = new UpdateHandler();
      updateHandler.checkForUpdate(`v${app.getVersion()}`, false);
      // shell.openExternal(Common.FORKER_GITHUB_RELEASES);
    });

    ipcMain.on('open-settings-window', (event, message) => {
      // if (this.settingsWindow) {
      //   this.settingsWindow.show();
      // } else {
      //   this.createSettingsWindow();
      //   this.settingsWindow.show();
      // }
      this.settingsWindow.show()
    });

    ipcMain.on('close-settings-window', (event, messgae) => {
      // this.settingsWindow.close();
      // this.settingsWindow = null;
      this.settingsWindow.hide();
    })

    ipcMain.on('new-message', (event, messgae) => {
        let osNotification = new Notification({
          title:messgae.title,
          body:messgae.opt.body,
          //icon:messgae.opt.icon
          icon:path.join(__dirname, '../assets/icon.png')
        })
        if(AppConfig.readSettings('click-notification') === 'on'){
          osNotification.on('click',()=>{
            event.sender.send(messgae.ename)
            this.wechatWindow.show()
          })
        }
        osNotification.show()
    })

    ipcMain.on('miniFrame-close',()=>{
      this.wechatWindow.close();
    })
    ipcMain.on('miniFrame-minimize',()=>{
      this.wechatWindow.minimize();
    })
    ipcMain.on('miniFrame-setFullScreen',(event,flag)=>{
      this.wechatWindow.setFullScreen(flag);
    })
  };

  createTray() {
    this.tray = new AppTray(this.splashWindow, this.wechatWindow ,this.settingsWindow);
  }

  createSplashWindow() {
    this.splashWindow = new SplashWindow();
    this.splashWindow.show();
  }

  createWeChatWindow() {
    this.wechatWindow = new WeChatWindow();
  }

  createSettingsWindow() {
    this.settingsWindow = new SettingsWindow();
  }

}

new ElectronicWeChat().init();

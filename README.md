<img src="assets/icon.png" alt="logo" height="120" align="right" />

# Electronic WeChat

[![Build Status](https://travis-ci.org/palytoxin/electronic-wechat.svg?branch=master)](https://travis-ci.org/palytoxin/electronic-wechat)

> Note from geeeeeeeeek
>
> **⚠️⚠️ NO LONGER IN ACTIVE DEVELOPMENT | 项目不再维护 ⚠️⚠️** 
> 
> Thanks for supporting this project for **1000** days since Feb 16, 2016. 
> 
> It started with the idea to make WeChat better on MacOS when the official support was abscent. It was de facto dead when Tencent rolled out a new WeChat and started to block other third-party clients. For me, it's no longer worthwhile to hack a lot to accomplish little. Hope this project had been helpful to you in any way. You're welcome to fork or make copies with a reference. HAPPY HACKING.
>
> 感谢历史上的用户和贡献者，你们已经陪伴这个项目走过了 **1000** 个日子。我曾经想要打造一个更好的 Mac 微信客户端，因为官方版本几年没有更新、bug 层出。而在腾讯自己开始了定期更新并限制第三方客户端时，这个项目实际已经没有什么意义。这个项目目前作为一个存档供大家学习。希望它曾经对你有所帮助，你也可以 fork 或者转载（标注来源）来进行修改。祝你玩得愉快。
>
> **SPECIAL THANKS TO | 特别感谢**
> 
> [Kulbear](https://github.com/Kulbear), 
> [arrowrowe](https://github.com/arrowrowe), 
> [Rocka](https://github.com/rocka), 
> [CC](https://github.com/iamcc), 
> [xgdgsc](https://github.com/xgdgsc), 
> [死水微澜](https://github.com/ripples-alive), 
> [Jason](https://github.com/gzzhanghao), 
> [Ce Gao](https://github.com/gaocegege), 
> [viko16](https://github.com/viko16), 
> [卡晨](https://github.com/awmleer), 
> [Ray](https://github.com/ray26), 
> [尹良灿](https://github.com/wenLiangcan), 
> [gehuangyi20](https://github.com/gehuangyi20), 
> [Kevin Tan](https://github.com/stkevintan), 
> [Jiaye Wu](https://github.com/wujysh), 
> [loufq](https://github.com/loufq), 
> [Miaow](https://github.com/miaowing), 
> [Chuan Ji](https://github.com/jichu4n), 
> [Oaker](https://github.com/cyio), 
> [Fengshuang Li](https://github.com/lfs1102), 
> [Song Li](https://github.com/boltomli), 
> [afon](https://github.com/samurai00), 
> [lional wang](https://github.com/3dseals), 
> [Haochen Tong](https://github.com/hexchain), 
> [Zhuoyun Wei](https://github.com/wzyboy), 
> [rivershang](https://github.com/rivershang), 
> [Ivan Jiang](https://github.com/iplus26), 
> [oBlank](https://github.com/oblank), 
> [Cheng Gu](https://github.com/gucheen), 
> [NullMDR](https://github.com/NullMDR), 
> [ReadmeCritic](https://github.com/ReadmeCritic).
---

**Important:** If you want to build the app by yourself rather than download the release directly, please consider to use the source code from [the production branch](https://github.com/geeeeeeeeek/electronic-wechat/tree/production), the master branch is under development and we cannot guarantee it to be stable.

**Linux 下的微信客户端. 使用[Electron](https://github.com/atom/electron)构建.**

# 感谢

感谢 [kooritea](https://github.com/kooritea/electronic-wechat) 和 [geeeeeeeeek](https://github.com/geeeeeeeeek/electronic-wechat)

## 更新记录

--- 2019-12-17 ---

> Electron 更新到了v7.1.5，以及部分依赖

### 部分更新记录
请查看[kooritea](https://github.com/kooritea/electronic-wechat)维护的版本

#### [下载构建好的应用](https://github.com/palytoxin/electronic-wechat/releases)

## 如何使用

在下载和运行这个项目之前，你需要在电脑上安装 [Git](https://git-scm.com) 和 [Node.js](https://nodejs.org/en/download/) (来自 [npm](https://www.npmjs.com/))。在命令行中输入:

``` bash
# 下载仓库
git clone https://github.com/palytoxin/electronic-wechat.git
# 进入仓库
cd electronic-wechat
# 安装依赖, 运行应用
npm install && npm start
```

**提示:** 如果 `npm install` 下载缓慢，你可以使用自定义环境变量。

`ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/" npm install`

根据你的平台打包应用:

``` shell
npm run build:osx
npm run build:linux
npm run build:win
```

#### 项目使用 [MIT](LICENSE.md) 许可

*Electronic WeChat* 是这个开源项目发布的产品。网页版微信是其中重要的一部分，但请注意这是一个社区发布的产品，而 *不是* 官方微信团队发布的产品。

/* eslint-disable class-methods-use-this */

'use strict';

const {
  dialog, shell, app, nativeImage,
} = require('electron');
const https = require('https');
const path = require('path');
const AppConfig = require('../configuration');

const Common = require('../common');

class UpdateHandler {
  checkForUpdate(version, silent) {
    UpdateHandler.CHECKED = true;
    const promise = new Promise((res, rej) => {
      if (Common.ELECTRON === app.name) {
        rej(Common.UPDATE_ERROR_ELECTRON);
      }
      const req = https.get({
        host: Common.GITHUB_API_HOST,
        headers: { 'user-agent': Common.USER_AGENT },
        path: Common.FORKER_GITHUB_API_RELEASE_LATEST_PATH,
      }, (response) => {
        let body = '';
        response.on('data', (d) => {
          body += d;
        });
        response.on('end', () => {
          this._parseUpdateData(body, version, res, rej);
        });
      });
      req.on('error', (err) => {
        rej(Common.UPDATE_ERROR_NETWORK);
      });
      req.end();
    }).then((fetched) => {
      this.showDialog(fetched.name, fetched.description, 'Update', (response) => {
        if (!response) return;
        shell.openExternal(fetched.url);
      });
    }).catch((message) => {
      if (silent) return;
      if (!message) {
        message = Common.UPDATE_ERROR_UNKNOWN;
      }
      this.showDialog(Common.UPDATE_NA_TITLE, message, 'OK');
    });
  }

  showDialog(message, detail, positiveButton, callback) {
    const iconImage = nativeImage.createFromPath(path.join(__dirname, '../../assets/icon.png'));
    dialog.showMessageBox({
      type: 'info',
      buttons: ['Cancel', positiveButton],
      defaultId: 1,
      cancelId: 0,
      title: message,
      message,
      detail,
      icon: iconImage,
    }, callback);
  }

  _parseUpdateData(body, version, res, rej) {
    try {
      const data = JSON.parse(body);
      if (!data || !data.tag_name) rej(Common.UPDATE_ERROR_EMPTY_RESPONSE);
      const fetched = {
        version: data.tag_name,
        is_prerelease: data.prerelease,
        name: data.name || `有可用更新 当前版本(${version} > ${data.tag_name})`,
        url: data.html_url,
        description: data.body,
      };
      const versionRegex = /^(v|V)[0-9]+\.[0-9]+\.*[0-9]*$/;
      if (versionRegex.test(fetched.version) && this.compareVersion(fetched.version, version) && !fetched.is_prerelease) {
        res(fetched);
      } else {
        rej(Common.UPDATE_ERROR_LATEST(version));
      }
    } catch (e) {
      rej(Common.UPDATE_ERROR_UNKNOWN);
    }
  }

  compareVersion(v1, v2) {
    v1 = v1.match(/v(.*)?\.(.*)?\.(.*)?/);
    v2 = v2.match(/v(.*)?\.(.*)?\.(.*)?/);
    for (let i = 1; i < 4; i += 1) {
      if (parseInt(v1[i]) > parseInt(v2[i])) {
        return true;
      }
      if (parseInt(v1[i]) < parseInt(v2[i])) {
        return false;
      }
    }
    return false;
  }
}

UpdateHandler.CHECKED = false;

module.exports = UpdateHandler;

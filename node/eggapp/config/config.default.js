/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1563505233642_952';

  // add your middleware config here
  config.middleware = [];

  config.mysql = {

    clients: {
      db1: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'exercise',
      },
      db2: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'qingmeng',
      },
    },
    app: true,
    agent: false,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

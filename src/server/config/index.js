const path = require('path');

let config = {
  viewsDir:path.join(__dirname,'../../web','views'),
  staticDir:path.join(__dirname,'../../web','assets'),
};


// 开发环境
if (process.env.NODE_ENV === "development") {
  const devConfig = {
    port: 9999,
  };
  config = { ...config, ...devConfig };
}

// 线上环境
if (process.env.NODE_ENV === "production") {
  const proConfig = {
    port: 80,
  };
  config = { ...config, ...proConfig };
}

module.exports = config;

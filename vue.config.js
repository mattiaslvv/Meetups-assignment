//check if production mode is enabled, if so remove productionsourcemap.
if (process.env.NODE_ENV == 'production') {
  module.exports = { productionSourceMap: false };
}

module.exports = {
  transpileDependencies: ['vuetify'],
};

var merge = require('webpack-merge');
module.exports = {
  configureWebpack: (config) => {
    merge(config, { VUE_APP_MAPBOX_API_KEY: process.env.APIKEY });
  },
};

//check if production mode is enabled, if so remove productionsourcemap.
if (process.env.NODE_ENV == 'production') {
  module.exports = { productionSourceMap: false };
}

module.exports = {
  transpileDependencies: ['vuetify'],
};

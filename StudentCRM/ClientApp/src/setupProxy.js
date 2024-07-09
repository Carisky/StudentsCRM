const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/students',
    createProxyMiddleware({
      target: 'https://localhost:7035', 
      changeOrigin: true,
      secure: false,
    })
  );
};

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'https://api4sun.dudewhereismy.mx',
      changeOrigin: true,
      pathRewrite: {
        '^/auth': '/auth',
      },
    })
  );
  app.use(
    '/send-code',
    createProxyMiddleware({
      target: 'https://api4sun.dudewhereismy.mx',
      changeOrigin: true,
      pathRewrite: {
        '^/send-code': '/send-code',
      },
    })
  );
  app.use(
    '/verify-code',
    createProxyMiddleware({
      target: 'https://api4sun.dudewhereismy.mx',
      changeOrigin: true,
      pathRewrite: {
        '^/verify-code': '/verify-code',
      },
    })
  );
};

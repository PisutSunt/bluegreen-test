const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/startup',
    createProxyMiddleware({
        // target: 'http://localhost:9000',
        // target: '20.21.67.221:9000',
      target: process.env.TARGET_BACKEND, // 'todo-backend-service.devops-intern.svc.cluster.local:9000',   // backend service hostname
      changeOrigin: true,
    })
  );
  app.use(
    '/insert',
    createProxyMiddleware({
        // target: '20.21.67.221:9000',
      target: process.env.TARGET_BACKEND, // 'http://todo-backend-service.devops-intern.svc.cluster.local:9000',
      changeOrigin: true,
    })
  );
  app.use(
    '/remove',
    createProxyMiddleware({
        // target: '20.21.67.221:9000',
      target: process.env.TARGET_BACKEND, // 'http://todo-backend-service.devops-intern.svc.cluster.local:9000',
      changeOrigin: true,
    })
  );
  app.use(
    '/hello',
    createProxyMiddleware({
        // target: '20.21.67.221:9000',
      target: process.env.TARGET_BACKEND, // 'http://todo-backend-service.devops-intern.svc.cluster.local:9000',
      changeOrigin: true,
    })
  );
};
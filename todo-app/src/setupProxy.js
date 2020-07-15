const { createProxyMiddleware } = require('http-proxy-middleware');
const target = process.env.PROXY_API_TARGET || 'http://todo-backend:9000'
module.exports = function(app) {
  app.use(
    '/startup',
    createProxyMiddleware({
        // target: 'http://localhost:9000',
        // target: '20.21.67.221:9000',
      target, // 'todo-backend-service.devops-intern.svc.cluster.local:9000',   // backend service hostname
      changeOrigin: true,
    })
  );
  app.use(
    '/insert',
    createProxyMiddleware({
        // target: '20.21.67.221:9000',
      target, // 'http://todo-backend-service.devops-intern.svc.cluster.local:9000',
      changeOrigin: true,
    })
  );
  app.use(
    '/remove',
    createProxyMiddleware({
        // target: '20.21.67.221:9000',
      target, // 'http://todo-backend-service.devops-intern.svc.cluster.local:9000',
      changeOrigin: true,
    })
  );
  app.use(
    '/hello',
    createProxyMiddleware({
        // target: '20.21.67.221:9000',
      target, // 'http://todo-backend-service.devops-intern.svc.cluster.local:9000',
      changeOrigin: true,
    })
  );
};
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const apiBaseUrl = process.env.REACT_APP_TICKETMASTER_API_BASE_URL || 'https://app.ticketmaster.com';
  const apiPath = process.env.REACT_APP_TICKETMASTER_API_PATH || '/discovery/v2';
  const proxyPath = process.env.REACT_APP_API_PROXY_PATH || '/api/ticketmaster';

  app.use(
    proxyPath,
    createProxyMiddleware({
      target: apiBaseUrl,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        const newPath = apiPath + path;
        console.log('=== PROXY PATH REWRITE ===');
        console.log('Original path (after /api/ticketmaster stripped):', path);
        console.log('Rewritten path:', newPath);
        console.log('Full URL will be:', `${apiBaseUrl}${newPath}`);
        console.log('==========================');
        return newPath;
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('=== PROXY REQUEST ===');
        console.log('Request method:', req.method);
        console.log('Request URL:', req.url);
        console.log('Request path:', req.path);
        console.log('Proxy request path:', proxyReq.path);
        console.log('====================');
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('Response status:', proxyRes.statusCode);
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
      },
    })
  );
};
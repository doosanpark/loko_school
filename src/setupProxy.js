const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
module.exports = function(app) {
    app.use(cors());
    app.use(
        '/server',
        createProxyMiddleware({
            target: 'http://127.0.0.1:3001',
            changeOrigin: true,
        })
    );
};
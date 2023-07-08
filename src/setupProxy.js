const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api", //첫번째 Path (endpoint)
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true,
        })
    );
}

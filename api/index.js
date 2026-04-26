const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
    target: 'http://167.99.242.131:8090', 
    changeOrigin: true,
    ws: true
});

export default function handler(req, res) {
    delete req.headers['host'];

    return new Promise((resolve, reject) => {
        proxy.web(req, res, (err) => {
            if (err) {
                console.error('Proxy Error:', err);
                res.status(502).send('Gateway Error');
                return resolve();
            }
            resolve();
        });
    });
}
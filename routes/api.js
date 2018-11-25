const urlShortenerService = require('../service/urlShortenerService');

module.exports = app => {
    app.post('/api/url', async (req, res) => {
        const targetUrl = req.body.url;
        const url = await urlShortenerService.createSlug(targetUrl);
        res.contentType('application/json').send(url);
    });
};

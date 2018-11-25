
module.exports = app => {
    app.post('/api/url', async (req, res) => {
        const targetUrl = req.body.url;
        const url = await db.createUrlEntry(new URL(targetUrl, 'ABCDE'));
        res.contentType('application/json').send(url);
    });
};

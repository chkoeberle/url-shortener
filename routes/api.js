const urlShortenerService = require('../service/urlShortenerService');
const db = require('../service/persistenceService');

module.exports = app => {
    app.post('/api/url', async (req, res) => {
        const targetUrl = req.body.url;
        const url = await urlShortenerService.createSlug(targetUrl);
        res.contentType('application/json').send(url);
    });

    app.get('/:slug([a-zA-Z_-]{5,20})', async(req,res) =>{
        const slug = req.params.slug;
        const url = await db.getUrl(slug);
        if(!url) {
            res.status(404).send();
        }
        else{
            await db.createUrlViewEntry(slug);
            res.redirect(301, url.url);
        }
    });
};

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const urlShortenerService = require('../service/urlShortenerService');
const URL = require('../model/url');
chai.should();
chai.use(chaiHttp);

describe('URL shorter api', () => {
    const targetUrl = 'https://www.domain.tdl/foo';
    const slug = 'foo';
    let server;
    before(async () => {
        server = require('../app');
    });

    after(async () => {
        server.close();
    });

    describe('api GET', () => {

        it('should have an http endpoint ', async () => {
            const urlEntry = new URL(targetUrl, slug);
            const stub = sinon.stub(urlShortenerService, 'createSlug').returns(urlEntry)
            chai.request(server)
                .post('/api/url')
                .set('content-type', 'application/json')
                .send({url: targetUrl})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.url.should.equal(targetUrl);
                    res.body.slug.should.equal(slug);
                    stub.called.should.be.true;
                })
        });
    });

});
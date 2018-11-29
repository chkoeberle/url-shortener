const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const urlShortenerService = require('../service/urlShortenerService');
const db = require('../service/persistenceService');
const URL = require('../model/url');
chai.should();
chai.use(chaiHttp);

describe('URL shorter api', () => {
    const targetUrl = 'https://www.domain.tdl/foo';
    const slug = 'foobar';
    const urlEntry = new URL(targetUrl, slug);
    let server;
    before(async () => {
        server = require('../app');
    });

    after(async () => {
        server.close();
    });


    describe('api POST', () => {

        it('should take URL from body and returning slug', async () => {
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
                    urlShortenerService.createSlug.restore();
                })
        });
    });

    describe('api GET', ()=>{

        it('should redirect to associated target URL for slug', async()=>{
            const getUrl = sinon.stub(db, 'getUrl').returns(urlEntry);
            const createUrlViewEntry = sinon.stub(db, 'createUrlViewEntry').returns(true);
            chai.request(server)
                .get(`/${slug}`)
                .redirects(0)
                .end((err, res) => {
                    res.should.have.status(301);
                    res.should.redirectTo(targetUrl);
                    getUrl.calledOnce.should.be.true;
                    createUrlViewEntry.calledOnce.should.be.true;
                    db.getUrl.restore();
                    db.createUrlViewEntry.restore();
                })
        });

        it('should return 404 for unknown slug', async()=>{
            const getUrl = sinon.stub(db, 'getUrl').returns(undefined);
            chai.request(server)
                .get(`/${slug}`)
                .redirects(0)
                .end((err, res) => {
                    res.should.have.status(404);
                    getUrl.calledOnce.should.be.true;
                    db.getUrl.restore();
                })
        });
    });

});
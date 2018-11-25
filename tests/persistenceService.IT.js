const chai = require('chai');
const pool = require('../service/dbPools').pool;
const db = require('../service/persistenceService');
const URL = require('../model/url');
const sinon = require('sinon');
chai.should();

const slug = 'ABC';
const targetUrl = `https://www.domain.tdl/foo`;

describe('Persistence service ', () => {

    before(async()=>{
        await pool.query("DELETE FROM testo.url ");
        await pool.query("INSERT INTO testo.url (u_url, u_slug) VALUES($1,$2)", [targetUrl, slug]);
    });

    after(async()=>{
        await pool.query("DELETE FROM testo.url");
    });

    it('should put new url with slug to DB', async()=>{
        const url = new URL(targetUrl + '/bar', 'ABCD');
        const res = await db.createUrlEntry(url);
        res.should.be.true;
    });

    it('should return false if db error occurs while put new url with slug to DB', async()=>{
        const url = new URL(targetUrl, slug);
        const res = await db.createUrlEntry(url);
        res.should.be.false;
    });

    it('should put new url view slug to DB', async()=>{
        const res = await db.createUrlViewEntry("ABC");
        res.should.be.true;
    });

    it('should return false if db error occurs while put new url view to DB', async()=>{
        const stub = sinon.stub(pool, 'query').throws();
        const res = await db.createUrlViewEntry(slug);
        stub.called.should.be.true;
        res.should.be.false;
        pool.query.restore();
    });

    it('should get url by slug from DB', async()=>{
        const url = await db.getUrl(slug);
        url.url.should.equal(targetUrl);
        url.slug.should.equal(slug);
    });

    it('should return true if url entry for given slug exist in db DB', async()=>{
        const res = await db.slugExist(slug);
        res.should.be.true;
    });

    it('should return false if url entry for given slug not exist in db DB', async()=>{
        const res = await db.slugExist(slug);
        res.should.be.true;
    });

});
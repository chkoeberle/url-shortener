const chai = require('chai');
const pool = require('../service/dbPools').pool;
const db = require('../service/persistenceService');
const URL = require('../model/url');
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

});
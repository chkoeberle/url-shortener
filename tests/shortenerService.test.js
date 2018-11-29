const chai = require('chai');
const service = require('../service/urlShortenerService');
const db = require('../service//persistenceService');
const sinon = require('sinon');
chai.should();

describe('URL shorter service', () => {
    const targetUrl = 'https://www.domain.tdl/foo';
    const slug = 'foo';

    afterEach(function () {
        db.getSlugForUrl.restore();
        db.createUrlEntry.restore();
        db.slugExist.restore();
    });

    it('should generate slug for new given URL ', async () => {
        const getSlugForUrl = sinon.stub(db, 'getSlugForUrl').returns(undefined);
        const createUrlEntry = sinon.stub(db, 'createUrlEntry');
        const slugExist = sinon.stub(db, 'slugExist').returns(false);
        const slug = await service.createSlug(targetUrl);
        slug.should.not.be.undefined;
        getSlugForUrl.called.should.be.true;
        createUrlEntry.called.should.be.true;
        slugExist.called.should.be.true;
    });

    it('should get slug for existing entry not generation entry again ', async () => {
        const getSlugForUrl = sinon.stub(db, 'getSlugForUrl').returns(slug);
        const createUrlEntry = sinon.stub(db, 'createUrlEntry');
        const slugExist = sinon.stub(db, 'slugExist').returns(true);
        const result = await service.createSlug(targetUrl);
        result.url.should.equal(targetUrl);
        result.slug.should.equal(slug);
        getSlugForUrl.called.should.be.true;
        createUrlEntry.called.should.be.false;
        slugExist.called.should.be.false;
    });

    it('should retry to generate stub if stub already exists ', async () => {
        const getSlugForUrl = sinon.stub(db, 'getSlugForUrl').returns(undefined);
        const createUrlEntry = sinon.stub(db, 'createUrlEntry');
        const slugExist = sinon.stub(db, 'slugExist');
        slugExist.onFirstCall().returns(true);
        slugExist.onSecondCall().returns(false);
        const result = await service.createSlug(targetUrl);
        slug.should.not.be.undefined;
        result.slug.should.not.be.undefined;
        getSlugForUrl.called.should.be.true;
        createUrlEntry.called.should.be.true;
        slugExist.calledTwice.should.be.true;
    });


});
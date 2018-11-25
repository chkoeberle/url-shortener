const pool = require('./dbPools').pool;
const URL = require('../model/url');

const INSERT_URL_STMT = 'INSERT INTO testo.url (u_slug, u_url) VALUES($1, $2)';
const INSERT_URL_VIEW_STMT = 'INSERT INTO testo.url_views (uv_slug) VALUES($1)';
const SELECT_URL_BY_SLUG_STMT = 'SELECT u_url FROM testo.url WHERE u_slug = $1';
const SELECT_SLUG_BY_URL_STMT = 'SELECT u_slug FROM testo.url WHERE u_url=$1';



const createUrlEntry = async (url) => {
    try {
        const result = await pool.query(INSERT_URL_STMT, [url.slug, url.url]);
        return result.command === 'INSERT' && result.rowCount === 1;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const createUrlViewEntry = async (slug) => {
    try {
        const result = await pool.query(INSERT_URL_VIEW_STMT, [slug]);
        return result.command === 'INSERT' && result.rowCount === 1;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const getUrl = async (slug) => {
    const result = await pool.query(SELECT_URL_BY_SLUG_STMT, [slug]);
    const row = result.rows.pop();
    return row ? new URL(row.u_url, slug) : undefined;
};

const slugExist = async (slug) => {
    return getUrl(slug) !== undefined;
};

const getSlugForUrl = async (url) => {
    const result = await pool.query(SELECT_SLUG_BY_URL_STMT, [url]);
    const row = result.rows.pop();
    return row ? new URL(url, row.u_slug) : undefined;
};


module.exports = {
    createUrlEntry,
    createUrlViewEntry,
    getUrl,
    slugExist,
    getSlugForUrl
};
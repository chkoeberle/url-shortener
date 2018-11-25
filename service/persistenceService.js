const pool = require('./dbPools').pool;

const INSERT_URL_STMT = 'INSERT INTO testo.url (u_slug, u_url) VALUES($1, $2)';

const createUrlEntry = async (url) => {
    try {
        const result = await pool.query(INSERT_URL_STMT, [url.slug, url.url]);
        return result.command === 'INSERT' && result.rowCount === 1;
    } catch (e) {
        console.error(e);
        return false;
    }
};




module.exports = {
    createUrlEntry,
};
const pg = require('pg');

const pool = pg.Pool({
    user:       process.env.POSTGRES_USER || 'testo',
    host:       process.env.POSTGRES_HOST || 'localhost',
    database:   process.env.POSTGRES_DB || 'testo',
    password:   process.env.POSTGRES_PW,
    port:       process.env.POSTGRES_PORT || 65432,
});

module.exports = {pool};
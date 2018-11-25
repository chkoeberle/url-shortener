SET ROLE testo;

CREATE SCHEMA IF NOT EXISTS  testo;

CREATE TABLE IF NOT EXISTS testo.url (
    u_id serial  NOT NULL PRIMARY KEY,
    u_slug varchar NOT NULL UNIQUE,
    u_url varchar NOT NULL
);

CREATE INDEX ix_url_slug ON testo.url (u_slug);
CREATE INDEX ix_url_url ON testo.url (u_url);

CREATE TABLE IF NOT EXISTS testo.url_views(
    uv_id serial  NOT NULL PRIMARY KEY,
    uv_slug varchar NOT NULL
);

CREATE INDEX ix_url_views_slug ON testo.url_views (uv_slug);

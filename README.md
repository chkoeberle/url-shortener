# URL Shortener

## API 
find api definition in swagger.yaml. You can review API definition via swagger editor.
[Swagger editor](https://editor.swagger.io).

## Database
This project reads and writes to a postgres DB. To setup the database execute the SQL from cons.setupDB.sql.
The default settings expect a database called `testo` and a database user `testo`. 
This user needs admin permissions for those DB. 
You can set database environment via:
```sh
POSTGRES_USER=testo
POSTGRES_HOST=localhost
POSTGRES_DB=testo
POSTGRES_PORT=65432
POSTGRES_PW=secret
```
All environment variables expect `POSTGRES_PW` are preset with the values from above.
You must set `POSTGRES_PW`.

## run project

```sh
git clone https://github.com/chkoeberle/url-shortener.git
npm install
POSTGRES_PW=secret
npm start
```

## test project
### start unit tests
To run unit tests simply execute `npm test`.

### start integration tests 
To run integration tests execute 
```sh
POSTGRES_PW=secret
nzpm integration-test
```

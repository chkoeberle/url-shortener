# URL Shortener

## API 
find api definition in swagger.yaml. You can review API definition via swagger editor.
[Swagger editor](https://editor.swagger.io).

## Database
This project reads and writes to a postgres DB. To setup the database execute the SQL from cons.setupDB.sql.
The default settings expect a database called `testo` and a database user `testo`. 
This user needs admin permissions for those DB. 
You can set database environment via:
```bash
POSTGRES_USER=testo
POSTGRES_HOST=localhost
POSTGRES_DB=testo
POSTGRES_PORT=65432
POSTGRES_PW=secret
```
All environment variables expect `POSTGRES_PW` are preset with the values from above.
You must set `POSTGRES_PW`.

## run project

```bash
git clone https://github.com/chkoeberle/url-shortener.git
npm install
POSTGRES_PW=secret
npm start
```

## Use it
### commit url
```bash
curl -d'{"url":"hwww.google.com"}' -H "Content-Type: application/json" -X POST htp://localhost:3000/apttp://www.testo.de"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/url
```
This will return something like this:
```json
{"url":"http://www.testo.de","slug":"jmhyPYfXpScVNCFoj7XiVJ"}
```

### query url
In browser silly use the given slug in the path.
```
http://localhost:3000/jmhyPYfXpScVNCFoj7XiVJ
``` 

## test project
### start unit tests
To run unit tests simply execute `npm test`.

### start integration tests 
To run integration tests execute 
```bash
POSTGRES_PW=secret
nzpm integration-test
```

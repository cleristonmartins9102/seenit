### Seenit Test

#### Guideline
* Doesn't has database installed.
* All data are beeing saved in memory.
* Common codes are beeing shared beetwen services (@seenit-common/decrypter @seenit-common/errors)
* The layer infra, keep all adapters and repositories, making easy to add a real database or another type of repository, as filestorage.

#### Securityx
1. Auth based JWT
2. Cryptograph SHA256
3. Token duration 24 hours
4. Segmented Refresh Token
5. Endpoint security level


### Endpoints
#### __Barear token are required in all endpoints__
- Signup (response: SetCookie[token])



#### Starting application
__The prepare infra will build the services images and to run them__

1. npm start

#### Building
1. npm run build

#### Running Tests
1. npm run test
2. npm run test:dev
2. npm run test:dev:watch

#### Ports 
* 5050
* 5051
* 5052
* 3000
* 3001

#### Dependencies
* Docker
* NodeJs
* Jest
* Typescrypt
* Ts-Jest
* Eslint
* Super Test
* Cookie Session
* Sinon
* Apollo Server
* Graphql
* Swageer
* Express
* Express Gateway
* Open
* Ora
* Opener
* Child Process

### Architecture
* Clean Architecture

#### Doc
* http://127.0.0.1:8080/api-docs

#### GQL
* http://127.0.0.1:8080/graphql

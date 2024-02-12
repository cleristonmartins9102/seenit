### Seenit Test

#### Guideline
* Doesn't has database installed.
* The user and projects are saved in memory.
* Decrypter are mocked returning { id: 1, firstName: John, surname: Liam }
* Available a middleware component in the main folder responsable to decrypt the received token.
* Projects saveds will be considerated the mocked user decrypted.
* The layer infra, keep all adapters and repositories, making easy to add a real database or another type of repository, like filestorage.

#### Security
1. All HTTP routes are protegected. The permissions accepted are.
  * C
  * R
  * U
  * D
2. Bearear token must be provided. It is mocked, you can to use any value and will be accepted.


#### Starting
1. npm start

#### Building
1. npm run build

#### Running Tests
1. npm run test
2. npm run test:dev
2. npm run test:dev:watch

#### Doc
* http://127.0.0.1:3000/api-docs

#### GQL
* http://127.0.0.1:3000/graphql

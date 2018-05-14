const Koa = require('koa');
const KoaMount = require('koa-mount');
const KoaGraphQL = require('koa-graphql');
const KoaConvert = require('koa-convert');

const Schema = require('./data/schema');


const graphQLServer = new Koa();

const GRAPHQL_PORT = 3000;

// TODO разобраться как работает
graphQLServer.use(KoaMount('/', KoaConvert(KoaGraphQL({
    schema: Schema.schema,
    pretty: true,
    graphiql: true,
}))));


graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
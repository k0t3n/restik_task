const Koa = require('koa');
const KoaMount = require('koa-mount');
const KoaGraphQL = require('koa-graphql');
const KoaConvert = require('koa-convert');

const {schema} = require('./data/schema');

const graphQLServer = new Koa();
const GRAPHQL_PORT = 3000;

graphQLServer.use(
    KoaMount('/', KoaConvert(
        KoaGraphQL({
            schema: schema,
            pretty: true,
            graphiql: true,
        })
    ))
);


graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
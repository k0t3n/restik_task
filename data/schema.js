const graphQL = require('graphql');
const {database} = require('./database');


const simpleObjectType = new graphQL.GraphQLObjectType({
    name: 'simpleObjectTypeString',
    fields: {
        greeting: {
            type: graphQL.GraphQLString,
            resolve() {
                return database.getGreeting();
            }
        },
        name: {
            type: graphQL.GraphQLString,
            resolve() {
                return database.getName();
            }
        },
        message: {
            type: graphQL.GraphQLString,
            resolve() {
                return database.getMessage();
            }
        }
    },
});


const Root = new graphQL.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        simple: {
            type: simpleObjectType,
        }
    }
});


const schema = new graphQL.GraphQLSchema({
    query: Root,
});

module.exports.schema = schema;
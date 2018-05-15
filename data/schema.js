const graphQL = require('graphql');
const {database} = require('./database');


const simpleObjectType = new graphQL.GraphQLObjectType({
    name: 'simpleObjectTypeString',
    fields: {
        greeting: {
            type: graphQL.GraphQLString,
            resolve: (root, args, context, info) => {
                return root.greeting
            }
        },
        name: {
            type: graphQL.GraphQLString,
            resolve: (root, args, context, info) => {
                return root.name
            }
        },
        message: {
            type: graphQL.GraphQLString,
            resolve: (root, args, context, info) => {
                return `${root.greeting} ${root.name}`
            }
        }
    },
});


const Root = new graphQL.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        simple: {
            type: simpleObjectType,
            resolve() {
                return database.getItem();
            },
        },
        simpleWithArg: {
            type: simpleObjectType,
            args: {
                name: {
                    type: graphQL.GraphQLString,
                }
            },
            resolve: (root, {name,}, args, context, info) => {
                const item = database.getItem();

                if (name) {
                    item.name = name;
                }


                return item;
            }
        }
    }
});


const schema = new graphQL.GraphQLSchema({
    query: Root,
});

module.exports.schema = schema;
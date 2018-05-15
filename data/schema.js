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
                return root.message
            }
        }
    },
});


const RootQuery = new graphQL.GraphQLObjectType({
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
        },
        simpleWithContext: {
            type: simpleObjectType,
            resolve: (root, args, ctx, info) => {
                const item = database.getItem();
                item.message += `. Your ip ${ctx.ip}`;

                return item;
            }
        },
    }
});

const RootMutation = new graphQL.GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        setName: {
            type: graphQL.GraphQLString,
            args: {
                name: {
                    type: graphQL.GraphQLString,
                }
            },
            resolve: (root, {name}, args, ctx, info) => {

                if (name) {
                    let newName = database.changeName(name);

                    return `Name successfully changed to ${newName}!`;
                }
                else {
                    return `'name' parameter not provided!`
                }
            }
        }
    }
})


const schema = new graphQL.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});

module.exports.schema = schema;
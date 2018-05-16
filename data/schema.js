const {GraphQLObjectType, GraphQLString, GraphQLSchema} = require('graphql');
const {database} = require('./database');

/**
 * SimpleObjectType
 *
 * @field greeting
 * @field name
 * @field message
 */
const simpleObjectType = new GraphQLObjectType({
    name: 'simpleObjectTypeString',
    fields: {
        greeting: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        message: {
            type: GraphQLString,
        }
    },
});


/**
 * RootQuery
 *
 * @field simple - simple query
 * @field simpleWithArg - simple query with arg (name)
 * @field simpleWithContext - simple query with context (ip in message)
 */
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        simple: {
            type: simpleObjectType,
            resolve: (root, args, context, info) => (database.getItem())
        },
        simpleWithArg: {
            type: simpleObjectType,
            args: {
                name: {
                    type: GraphQLString,
                }
            },
            resolve: (root, {name,}, args, context, info) => {
                const item = database.getItem();

                // is arg 'name' exists
                if (name) {
                    item.name = name;
                    item.message = `${item.greeting}, ${item.name}`
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


/**
 * RootMutation
 *
 * @field setName - change name
 */
const RootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        setName: {
            type: GraphQLString,
            args: {
                name: {
                    type: GraphQLString,
                }
            },
            resolve: (root, {name}, args, ctx, info) => {
                // is arg 'name' exists
                if (name) {
                    let newName = database.changeName(name);

                    return `Name successfully changed to ${newName}!`;
                }
                else {
                    return `Parameter 'name' not provided!`
                }
            }
        }
    }
});


const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});

module.exports.schema = schema;
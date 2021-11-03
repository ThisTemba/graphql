const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const app = express();
const { books, authors } = require("./data.js");

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "HelloWorld",
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => "helo world",
      },
    }),
  }),
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
app.listen(5000, () => {
  console.log("Server Running");
});

const { query } = require("express");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const app = express();
const { books, authors } = require("./data.js");

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "this is a book",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "a list of books",
      resolve: () => books,
    },
  }),
});

const schema = new GraphQLSchema({ query: RootQueryType });

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));
app.listen(5000, () => {
  console.log("Server Running");
});

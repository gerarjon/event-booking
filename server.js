const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());



app.use(
  '/api', 
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@event.fchc8.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(()=> {
  app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`)
  });
})
.catch (err => {
  console.log(err);
});



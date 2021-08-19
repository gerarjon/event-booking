const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// CORS Headers
app.use((req,res,next) => {
  // every client can access server
  res.setHeader('Access-Control-Allow-Origin', "*");
  // post, get, options requests can be sent to server
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  } 
  next();
});

// isAuth 
const isAuth = require('./middleware/is-auth');

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// isAuth will run on every request/resolver
app.use(isAuth);

app.use(
  '/api',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  }),
  createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
  })
);


mongoose.connect(process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  );
  
  
  //Get the default connection
  const db = mongoose.connection;
  
  db.once('open', () => console.log('connected to the database'));
  
  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  
  // Default behavior: send every unmatched route request to the React app (in production)
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});




const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Event = require ('./models/event');
const User = require ('./models/user');

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(
  '/api', 
  graphqlHTTP({
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type User {
        _id: ID!
        email: String!
        password: String
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      input UserInput {
        email: String!
        password: String!
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput) : User
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: () => {
        return Event.find()
          .then(events => {
            return events.map(event => {
              return { ...event._doc, _id: event.id };
            });
          })
          .catch(err => {
            throw err;
          });
      },
      
      // Create Event
      createEvent: (args) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price, 
          date: new Date(args.eventInput.date),
          creator: '611b2b336a6e6d918e9ae628'
        });
        let createdEvent;
        return event
          .save()
          .then(result => {
            createdEvent = { ...result._doc, _id: result._doc._id.toString() };
            return User.findById('611b2b336a6e6d918e9ae628')
          })
          .then(user => {
            if (!user) {
              throw new Error('User not found');
            }
            user.createdEvents.push(event);
            return user.save()
          })
          .then(result => {
            return createdEvent;
          })
          .catch(err => {
            console.log(err);
            throw err;
        });
      },

      // Create User 
      createUser: args => {
        return User.findOne({email: args.userInput.email})
          .then(user => {
            if (user) {
              throw new Error('User exists already.')
            }
            return bcrypt.hash(args.userInput.password, 12)
          })
          .then(hashedPassword => {
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword
            });
            return user.save();
          })
          .then(result => {
            return { ...result._doc, password: null, _id: result.id}
          })
          .catch(err => {
            throw err
          });
      }
    },
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



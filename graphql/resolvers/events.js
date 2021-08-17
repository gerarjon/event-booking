const Event = require ('../../models/event');
const { transformEvent } = require('./merge');

module.exports = {
  // Retrieve Events
  events: () => {
    return Event.find()
      .then(events => {
        return events.map(event => {
          return transformEvent(event);
        });
      })
      .catch(err => {
        throw err;
      });
  },

  // Create Event
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price, 
      date: new Date(args.eventInput.date),
      creator: '611b2b336a6e6d918e9ae628'
    });
    let createdEvent;
    try {
      const result = await event.save()
      createdEvent = transformEvent(result); 
      const creator = await User.findById('611b2b336a6e6d918e9ae628');

      if (!creator) {
        throw new Error('User not found');
      }
      creator.createdEvents.push(event);
      await creator.save()
      
      return createdEvent;
    }
      catch (err) {
      throw err;
    }
  },
}
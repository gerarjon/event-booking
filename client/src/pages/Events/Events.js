import React, { useState, useRef, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth-context';
import Modal from '../../components/Modal';
import ModalDetails from '../../components/ModalDetails';
import './style.css'

const EventsPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDetailsActive, setIsDetailsActive] = useState(false);
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const titleElRef = useRef();
  const priceElRef = useRef();
  const dateElRef = useRef();
  const descriptionElRef = useRef();

  const context = useContext(AuthContext);

  useEffect(() => {
    fetchEvents()
  }, []) // eslint-disable-line

  const isActiveHandler = () => {
    titleElRef.current.value = ""
    priceElRef.current.value = ""
    dateElRef.current.value = ""
    descriptionElRef.current.value = ""
    setIsActive(!isActive)
  }

  const isDetailsActiveHandler = () => {
    setIsDetailsActive(!isDetailsActive)
  }

  // Create Event Handler
  const onConfirm = () => {
    const title = titleElRef.current.value;
    const price = +priceElRef.current.value;
    const date = dateElRef.current.value;
    const description = descriptionElRef.current.value;

    if (
      title.trim().length === 0 || 
      price <= 0 || 
      date.trim().length === 0 || 
      description.trim().length === 0
    ) {
      return;
    }

    const requestBody = {
      query: `
        mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
          createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}) {
            _id
            title
            description
            price
            date
          }
        }
      `,
      variables: {
        title: title,
        price: price,
        description: description,
        date: date
      }
    }

    const token = context.token;

    fetch('/api', { //change later
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed');
      }
      return res.json();
    })
    .then(resData => {
      const newEvent = {
        _id: resData.data.createEvent._id,
        title: resData.data.createEvent.title,
        description: resData.data.createEvent.description,
        date: resData.data.createEvent.date,
        price: resData.data.createEvent.price,
        creator: {
          _id: context.userId
        }
      }
      setEvents(events => [...events, newEvent]);
    })
    .catch( err => {
      console.log(err)
    })
    isActiveHandler();
  }

  // Get Events Handler
  const fetchEvents = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            date
            price
            creator {
              _id
              email
            }
          }
        }
      `
    }
    fetch('/api', { //change later
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed');
      }
      return res.json();
    })
    .then(resData => {
      const events = resData.data.events;
      setEvents(events);
      setIsLoading(false)
 
    })
    .catch( err => {
      console.log(err);
      setIsLoading(false)
    })
  }

  // Show Event Handler
  const showDetailHandler = (eventId) => {
    let newEvent = events.find(e=>e._id === eventId)
    setSelectedEvent(newEvent)
    setIsDetailsActive(!isDetailsActive)
  }

  // Delete Event Handler
  const deleteEventHandler = (eventId) => {
    setIsLoading(true);
    const requestBody = {
      query: `
        mutation DeleteEvent($id: ID!) {
          deleteEvent(eventId: $id) {
            _id
            title
          }
        }
      `,
      variables: {
        id: eventId
      }
    };

    fetch('/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + context.token
      }
    })
    .then(res=> {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed');
      }
      return res.json();
    })
    .then(resData => {
      console.log(resData);
      let updatedEvents = events.filter(event => {
        return event._id !== eventId;
      })
      setEvents(updatedEvents)
      setIsLoading(false)
    })
    .catch( err => {
      console.log(err);
      setIsLoading(false)
    })
  }


  // Book Event Handler
  const bookEventHandler = () => {
    if (!context.token) {
      setSelectedEvent(null)
    }
    const requestBody = {
      query: `
        mutation BookEvent($id: ID!){
          bookEvent(eventId: $id) {
            _id
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id: selectedEvent._id
      }
    }
    fetch('/api', { //change later
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + context.token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed');
      }
      return res.json();
    })
    .then(resData => {
      setSelectedEvent(null)
    })
    .catch( err => {
      console.log(err);
      setIsLoading(false)
    })
  }

  return(
    <div className='events-section'>
      <section className="section section-first">

        <p className="title">
          Events
        </p>
        <p className="subtitle">
          View events here

        </p>
        {context.token && (
          <div>
            {/* Add Event Modal  */}
            <p>Create an event here!</p>
            <Modal 
              isActive={isActive}
              isActiveHandler={isActiveHandler}
              title="Create an Event" 
              buttonName="Create Event" 
              onConfirm={onConfirm}
              titleElRef={titleElRef}
              priceElRef={priceElRef}
              dateElRef={dateElRef}
              descriptionElRef={descriptionElRef}
            />
          </div>
        )}
      </section>

      {/* View Event Modal */}
      {selectedEvent && (
        <ModalDetails
        isDetailsActive={isDetailsActive}
        isDetailsActiveHandler={isDetailsActiveHandler}
        bookEventHandler={bookEventHandler}
        title={selectedEvent.title}
        price={selectedEvent.price}
        date={selectedEvent.date}
        description={selectedEvent.description}
        confirmText={context.token? 'Book event' : 'Confirm'}
        />
      )}
      
      
      {isLoading? 
      <div className="spinner-container">
        <div className="lds-dual-ring"></div>
      </div>
      : 
      <section className="section">
        <div className="columns is-multiline">
          {events.map(event => {
            return (
              <div className="column is-one-third-tablet" key={event._id}>
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <p className="events-price-text">
                        ${event.price}
                      </p>
                      <p className="title is-5 events-card-title">
                        {event.title}
                      </p>
                      <p className='events-button-container'>
                        {/* Show Event Handler */}
                        <button onClick={() => showDetailHandler(event._id)} id={event._id} data-target="modal-de">View details</button>
                        {/* Delete Event Handler */}
                        {context.userId === event.creator._id && (<button onClick={() => deleteEventHandler(event._id)}>Delete Event
                        </button>)}
                      </p>
                      <p>
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      }
      
    </div>
  )
}

export default EventsPage;
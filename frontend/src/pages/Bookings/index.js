import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth-context';

import './style.css'

const BookingsPage = () => {
  const [isLoading, setIsLoading] = useState();
  const [bookings, setBookings] = useState([]);

  useEffect( () => {
    fetchBookings();
  }, [])  // eslint-disable-line

  const context = useContext(AuthContext);

  const fetchBookings = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            event {
              _id
              title
              date
              price
            }
          }
        }
      `
    }
    fetch('http://localhost:3001/api', {
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
      const bookings = resData.data.bookings;
      console.log(bookings)
      setBookings(bookings);
      setIsLoading(false)
 
    })
    .catch( err => {
      console.log(err);
      setIsLoading(false)
    })
  }

  return(
    <div>  
      <section className="section">
        <p className="title">
           Bookings
        </p>
        <p className="subtitle">
          View booked events here
        </p>
      </section>

      {isLoading? 
      <div className="spinner-container">
        <div className="lds-dual-ring"></div>
      </div>
      : 
      <section className="section">
        <div className="columns is-multiline">
          {bookings.map(booking => {
            return (
              <div className="column is-one-third-tablet" key={booking.event._id}>
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <p className="events-price-text">
                        ${booking.event.price}
                      </p>
                      <p className="title is-5 events-card-title">
                        {booking.event.title}
                      </p>
                      <p>
                        <button id={booking.event._id} data-target="modal-de">View details</button>
                      </p>
                      <p>
                        {new Date(booking.event.date).toLocaleDateString()}
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

export default BookingsPage;
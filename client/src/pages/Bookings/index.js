import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth-context';
import BookingList from '../../components/Booking/BookingList'

import './style.css'

const BookingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
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
      setBookings(bookings);
      setIsLoading(false)
    })
    .catch( err => {
      console.log(err);
      setIsLoading(false)
    })
  }

  const onDeleteHandler = bookingId => {
    setIsLoading(true);
    const requestBody = {
      query: `
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id) {
          _id
          title
          }
        }
      `,
      variables: {
        id: bookingId
      }
    };

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
      let updatedBookings = bookings.filter(booking => {
        return booking._id !== bookingId
      })
      setBookings(updatedBookings);
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
        <BookingList 
          bookings={bookings}
          onDelete={onDeleteHandler}
        />
      </section>
      }
    </div>
  )
}

export default BookingsPage;
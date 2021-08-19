import React from 'react';

const BookingList = ({bookings, onDelete}) => {
  return (
    <div className="columns is-multiline">
      {bookings.map(booking => {
        return (
          <div className="column is-one-third-tablet" key={booking._id}>
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
                    <button id={booking.event._id} onClick={()=>onDelete(booking._id)}>Delete Event</button>
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
  )

}

export default BookingList;
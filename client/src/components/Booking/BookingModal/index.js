import React from 'react';

const BookingModal = (props) => {
  return (
    <>
      <div className={`modal ${props.isDetailsActive ? "is-active": ""}`} id="modal-be">
        <div className="modal-background" onClick={props.isDetailsActiveHandler} data-target="modal-be"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{props.title}</p>
            <button className="delete" onClick={props.isDetailsActiveHandler} data-target="modal-be" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <p className="subtitle is-5">{props.description}</p>
            <p>Date: {new Date(props.date).toLocaleDateString()}</p>
            <p>${props.price}</p>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={props.onDelete} id={props._id}>Delete</button>
            <button className="button" onClick={props.isDetailsActiveHandler} data-target="modal-be">Cancel</button>
          </footer>
        </div>
      </div>
    </>
  )
}

export default BookingModal;
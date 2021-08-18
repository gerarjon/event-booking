import React, { useState } from 'react';

import './style.css';

const Modal = (props) => {
  const [isActive, setIsActive] = useState(false);

  const isActiveHandler = () => {
    setIsActive(!isActive)
  }

  return (
    <>
    <button className="button" onClick={isActiveHandler} data-target="modal-ev">Create New Event</button>
    <div className={`modal ${isActive ? "is-active": ""}`} id="modal-ev">
      <div className="modal-background" onClick={isActiveHandler} data-target="modal-ev"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" onClick={isActiveHandler} data-target="modal-ev" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          hello
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Confirm</button>
          <button className="button" onClick={isActiveHandler} data-target="modal-ev">Cancel</button>
        </footer>
      </div>
    </div>
    </>
  )
}

export default Modal;
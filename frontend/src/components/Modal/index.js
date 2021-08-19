import React from 'react';

import './style.css';

const Modal = (props) => {

  return (
    <>
      <button className="button is-small" onClick={props.isActiveHandler} data-target="modal-ev">{props.buttonName}</button>
      <div className={`modal ${props.isActive ? "is-active": ""}`} id="modal-ev">
        <div className="modal-background" onClick={props.isActiveHandler} data-target="modal-ev"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{props.title}</p>
            <button className="delete" onClick={props.isActiveHandler} data-target="modal-ev" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            {/* Title */}
            <div className="field">
              <label className="label" htmlFor="title">Title</label>
              <div className="control">
                <input className="input" id="title" type="text" placeholder="e.g Alex Smith" ref={props.titleElRef}/>
              </div>
            </div>

            {/* Price */}
            <div className="field">
              <label className="label" htmlFor="price">Price</label>
              <div className="control">
                <input className="input" id="price" type="number" placeholder="1.99" ref={props.priceElRef}/>
              </div>
            </div>

            {/* Date */}
            <div className="field">
              <label className="label" htmlFor="datetime">Date</label>
              <div className="control">
                <input className="input" id="date" type="date" ref={props.dateElRef}/>
              </div>
            </div>

            {/* Description */}
            <div className="field">
              <label className="label" htmlFor="description">Description</label>
              <div className="control">
                <textarea className="textarea" id="description" type="text" ref={props.descriptionElRef}/>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={props.onConfirm}>Confirm</button>
            <button className="button" onClick={props.isActiveHandler} data-target="modal-ev">Cancel</button>
          </footer>
        </div>
      </div>
    </>
  )
}

export default Modal;
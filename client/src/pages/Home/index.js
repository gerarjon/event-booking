import { Link } from "react-router-dom";
import mockup from "../../assets/event-booking-mockup.png";
import './style.css'

const Home = () => {
  return (
    <>
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">

            <div className="columns">
              <div className="column">
                <div className="has-text-centered">
                  <p className="title is-size-1">
                    An Easy Way to Organize Events
                  </p>
                  <p className="subtitle is-size-4">
                    Create and book events with a click of a button.
                  </p>
                  <Link className="button is-link has-text-weight-bold is-size-4" to="/auth">Click here to begin</Link>
                </div>
              </div>

              <div className="column is-hidden-mobile">
                <div className="hero-iphone">
                  <img src={mockup} alt="Mockup" />
                </div>
              </div>
            </div>

          </div>
          
        </div>
    </section>
    
  </>
)}

export default Home;
import { Link } from 'react-router-dom';
import './style.css';

const Footer = () => {
  return (
    <footer className='footer has-background-danger'>
      <div className='content has-text-centered'>
        <p><Link to="https://github.com/gerarjon/event-booking">Github</Link></p>
      </div>
    </footer>
  )
}

export default Footer;
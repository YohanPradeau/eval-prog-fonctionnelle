import './index.scss';
import Message from './classes/message';
import Contact from './classes/contact';

const SEND_BUTTON = document.getElementById('sendButton');
const SEND_INPUT = document.getElementById('sendInput');
const MY_IMAGE = './public/user.svg';
const JCVD_IMAGE = './public/jcvd.jpg';
const STALLONE_IMAGE = './public/stallone.jpg';
const REEVES_IMAGE = './public/reeves.jpg';

const sendMessage = function sendMessage() {
  const myMessage = new Message('Moi', MY_IMAGE, SEND_INPUT.textContent);

  myMessage.save();
  myMessage.render();

  SEND_INPUT.textContent = '';
};

const initializing = function initializing() {
  SEND_BUTTON.addEventListener('click', sendMessage());

  const recovered = JSON.stringify(localStorage);

  const jcvd = new Contact('Jean-Claude VD', JCVD_IMAGE, 0);
  const stallone = new Contact('Sylvester  S.', STALLONE_IMAGE, 0);
  const reeves = new Contact('Keanu R.', REEVES_IMAGE, 0);
};

initializing();

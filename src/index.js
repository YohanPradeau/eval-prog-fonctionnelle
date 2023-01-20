import './index.scss';
import Message from './classes/message';
import Contact from './classes/contact';

const SEND_BUTTON = document.getElementById('sendButton');
const SEND_INPUT = document.getElementById('sendInput');
const CONTAINER_MESSAGE = document.getElementById('messagesList');
const CONTAINER_CONTACTS = document.getElementById('contactsList');
const MY_IMAGE = '/public/user.svg';
const JCVD_IMAGE = '/public/jcvd.svg';
const STALLONE_IMAGE = '/public/stallone.svg';
const REEVES_IMAGE = '/public/reeves.svg';

const selectedTarget = '';

const sendMessage = function sendMessage() {
  const myMessage = new Message('Moi', MY_IMAGE, SEND_INPUT.value, selectedTarget);

  myMessage.save();
  CONTAINER_MESSAGE.appendChild(myMessage.render());

  SEND_INPUT.value = '';
};

const initializing = function initializing() {
  SEND_BUTTON.addEventListener(
    'click',
    () => {
      sendMessage('shazam');
    }
  );

  const recovered = { ...localStorage };

  Object.keys(recovered).forEach((key) => {
    const parsing = recovered[key].split(',');
    const oldMessage = new Message(parsing[0], parsing[1], parsing[2], parsing[3], parsing[4]);

    CONTAINER_MESSAGE.appendChild(oldMessage.render());
  });

  const jcvd = new Contact('Jean-Claude VD', JCVD_IMAGE, 0);
  const stallone = new Contact('Sylvester  S.', STALLONE_IMAGE, 0);
  const reeves = new Contact('Keanu R.', REEVES_IMAGE, 0);

  CONTAINER_CONTACTS.appendChild(jcvd.render());
  CONTAINER_CONTACTS.appendChild(stallone.render());
  CONTAINER_CONTACTS.appendChild(reeves.render());
};

initializing();

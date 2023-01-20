import './index.scss';
import Chat from './classes/chat';
import mock from './mock/contact';

const initializing = function initializing() {
  const chat = new Chat(mock);

  chat.initial_render();
};

initializing();

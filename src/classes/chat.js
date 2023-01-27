import Contact from './contact';

const Chat = class Chat {
  constructor(contacts) {
    this.contacts = contacts.map((contact) => new Contact(contact));
  }

  initial_render() {
    const SEND_BUTTON = document.getElementById('sendButton');
    const SEND_INPUT = document.getElementById('sendInput');

    this.contacts.forEach((contact) => { this.renderContact(contact); });

    SEND_BUTTON.addEventListener(
      'click',
      () => {
        this.messageFromMe();
      }
    );

    SEND_INPUT.addEventListener(
      'keypress',
      (e) => {
        if (e.key === 'Enter') this.messageFromMe();
      }
    );

    this.loadAllMessagesFromLocalStorage();
    this.autoscroll();
  }

  messageFromMe() {
    const SEND_INPUT = document.getElementById('sendInput');
    const CONTAINER_MESSAGES = document.getElementById('messagesList');
    const DATE_MESSAGE = new Date().toLocaleString('FR-fr');

    this.save('Moi', SEND_INPUT.value, DATE_MESSAGE, 'me');
    CONTAINER_MESSAGES.innerHTML += this.templateSended(DATE_MESSAGE, SEND_INPUT.value);
    this.callAction(SEND_INPUT.value);
    SEND_INPUT.value = '';
    this.autoscroll();
  }

  templateContact(image, name, id) {
    return `
              <li class="bg-secondary text-light list-group-item d-flex justify-content-between align-items-center m-2">
                <img width="50" class="rounded-circle border border-white border-2" src="${image}" />
                ${name}
                <span class="badge bg-primary rounded-pill" id="contact-${id}">0</span>
              </li>
    `;
  }

  templateReceived(image, name, time, content) {
    return `
            <div class="row mt-2">
              <div class="col-6">
                <div class="card text-bg-light">
                  <h5 class="card-header">
                    <img  width="20%" src="${image}" class="rounded-circle img-thumbnail" alt="...">
                   ${name}
                  </h5>
                  <div class="card-body">
                    <h5 class="card-title">${time}</h5>
                    ${content}</p>
                  </div>
                </div>
              </div>
              <div class="col-6"></div>
            </div>
    `;
  }

  templateSended(time, content) {
    return `
            <div class="row mt-2">
              <div class="col-6"></div>
              <div class="col-6">
                <div class="card text-bg-light">
                  <h5 class="card-header">
                    <img  width="50px" src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" class="rounded-circle img-thumbnail" alt="...">
                   Moi
                  </h5>
                  <div class="card-body">
                    <h5 class="card-title">${time}</h5>
                    <p class="card-text">${content}</p>
                  </div>
                </div>
              </div>
            </div>
    `;
  }

  renderContact(contact) {
    const CONTAINER_CONTACTS = document.getElementById('contactsList');

    CONTAINER_CONTACTS.innerHTML += this.templateContact(contact.image, contact.name, contact.id);
  }

  loadAllMessagesFromLocalStorage() {
    let rawMessages = JSON.parse(localStorage.getItem('yohan_messages'));
    const CONTAINER_MESSAGES = document.getElementById('messagesList');

    if (rawMessages === null) {
      rawMessages = { yohan_messages: [] };
      localStorage.setItem('yohan_messages', JSON.stringify(rawMessages));
    }

    rawMessages.yohan_messages.forEach((message) => {
      if (message.source === 'me') {
        CONTAINER_MESSAGES.innerHTML += this.templateSended(
          message.datetime,
          message.content
        );
        return;
      }

      const MY_CONTACT = document.getElementById(`contact-${message.source}`);

      MY_CONTACT.innerText = parseInt(MY_CONTACT.innerText, 10) + 1;

      CONTAINER_MESSAGES.innerHTML += this.templateReceived(
        message.image,
        message.name,
        message.datetime,
        message.content
      );
    });
  }

  save(name, content, datetime, source, image = null) {
    const rawMessages = JSON.parse(localStorage.getItem('yohan_messages'));
    const newMessage = {
      name, image, content, datetime, source
    };

    rawMessages.yohan_messages.push(newMessage);

    localStorage.setItem('yohan_messages', JSON.stringify(rawMessages));
  }

  callAction(content) {
    this.contacts.forEach(async (contact) => {
      const myAction = contact.actions.find((action) => action.name === content);
      const MY_RESPONSE = await contact.checkForAction(content);

      if (myAction && MY_RESPONSE) {
        const DATE_MESSAGE = new Date().toLocaleString('FR-fr');
        const CONTAINER_MESSAGES = document.getElementById('messagesList');
        const MY_CONTACT = document.getElementById(`contact-${contact.id}`);

        MY_CONTACT.innerText = parseInt(MY_CONTACT.innerText, 10) + 1;
        CONTAINER_MESSAGES.innerHTML += this.templateReceived(
          contact.image,
          contact.name,
          DATE_MESSAGE,
          MY_RESPONSE
        );

        this.save(contact.name, MY_RESPONSE, DATE_MESSAGE, contact.id, contact.image);
        this.autoscroll();
      }
    });
  }

  autoscroll() {
    const CONTAINER_MESSAGES = document.getElementById('messagesList');

    CONTAINER_MESSAGES.scrollTo(0, CONTAINER_MESSAGES.scrollHeight);
  }
};

export default Chat;

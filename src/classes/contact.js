const Contact = class Contact {
  constructor(contactName, contactImage, contactMessages) {
    this.name = contactName;
    this.image = contactImage;
    this.totalMessages = contactMessages;
  }

  render() {
    const listElement = document.createElement('li');
    const listImage = document.createElement('img');
    const listMessages = document.createElement('span');

    listElement.classList.add('text-light', 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'rounded', 'bg-secondary');

    // image de profil du contact
    listImage.classList.add('rounded-circle', 'border', 'border-white', 'border-2');
    listImage.style.width = '50px;';
    listImage.src = this.image;

    // date du message
    listMessages.classList.add('badge', 'bg-primary', 'rounded-pill');
    listMessages.innerText = this.totalMessages;

    listElement.appendChild(listImage);
    listElement.appendChild(listMessages);

    return listElement;
  }
};

export default Contact;

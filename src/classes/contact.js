const Contact = class Contact {
  constructor(contact) {
    this.id = contact.id;
    this.name = contact.name;
    this.image = contact.image;
    this.actions = contact.actions;
  }

  checkForAction(messageContent) {
    const myAction = this.actions.find((action) => action.name === messageContent);
    if (myAction) {
      return myAction.response();
    }
    return '<p class="card-text">Rien à faire... pour l\'instant !</p>';
  }
};

export default Contact;

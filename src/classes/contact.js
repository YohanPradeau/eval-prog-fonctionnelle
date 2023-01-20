const Contact = class Contact {
  constructor(contact) {
    this.id = contact.id;
    this.name = contact.name;
    this.image = contact.image;
    this.actions = contact.actions;
  }

  async checkForAction(messageContent) {
    const myAction = this.actions.find((action) => action.name === messageContent);

    if (myAction) {
      try {
        return myAction.response();
      } catch (e) { return e; }
    }
    return undefined;
  }
};

export default Contact;

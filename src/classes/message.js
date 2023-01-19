const Message = class Message {
  constructor(nameMessage, imageMessage, contentMessage, targetMessage) {
    this.name = nameMessage;
    this.image = imageMessage;
    this.content = contentMessage;
    this.target = targetMessage;
    this.datetime = new Date().toLocaleString('fr-FR');
  }

  render() {
    const gridRow = document.createElement('div');
    const gridCol = document.createElement('div');
    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const gridMargin = document.createElement('div');
    const cardHeader = document.createElement('h5');
    const cardImage = document.createElement('img');
    const cardDate = document.createElement('h5');
    const cardContent = document.createElement('p');

    gridRow.classList.add('row', 'mt-2');
    gridCol.classList.add('col-6');
    card.classList.add('card', 'text-bg-light');
    cardBody.classList.add('card-body');
    gridMargin.classList.add('col-6');

    // nom de l'expediteur
    cardHeader.classList.add('card-header');
    cardHeader.textContent = this.name;

    // image de profil de l'expediteur
    cardImage.classList.add('rounded-circle', 'img-thumbnail');
    cardImage.src = this.image;

    // date du message
    cardDate.classList.add('card-title');
    cardDate.innerText = this.datetime;

    // Contenu du message
    cardContent.classList.add('card-text');
    cardContent.innerText = this.Message;

    cardHeader.appendChild(cardImage);
    card.appendChild(cardHeader);

    cardBody.appendChild(cardDate);
    cardBody.appendChild(cardContent);
    card.appendChild(cardBody);

    gridCol.appendChild(card);

    if (this.target === 'Moi') {
      gridRow.appendChild(gridMargin);
      gridRow.appendChild(gridCol);
    } else {
      gridRow.appendChild(gridCol);
      gridRow.appendChild(gridMargin);
    }

    return gridRow;
  }

  save() {
    localStorage.setItem(this.datetime, [this.name, this.image, this.content, this.target]);

    return this;
  }
};

export default Message;

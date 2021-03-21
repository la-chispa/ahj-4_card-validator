export default class DOM {
  constructor(networks) {
    this.networks = networks;
    this.create();
  }

  create() {
    const container = document.createElement('div');
    container.classList.add('widget-container');
    document.body.appendChild(container);
    const list = document.createElement('ul');
    list.classList.add('cards');
    container.appendChild(list);
    for (const network of this.networks) {
      const card = document.createElement('li');
      card.classList.add('card', `card__${network}`);
      list.appendChild(card);
    }
    const form = document.createElement('form');
    form.classList.add('form');
    form.id = 'form';
    container.appendChild(form);
    form.innerHTML = `
      <div class="form__content">
        <input class="input" placeholder="Enter card number">
        <button class="button">Click to Validate</button>
      </div>
    `;
    this.cards = document.getElementsByClassName('card');
    this.input = document.querySelector('.input');
  }

  showNetwork(data) {
    for (const el of this.cards) {
      if (!el.classList.contains(`card__${data}`)) {
        el.classList.add('card_deactivated');
      }
    }
  }

  activateNetworks() {
    for (const el of this.cards) {
      if (el.classList.contains('card_deactivated')) {
        el.classList.remove('card_deactivated');
      }
    }
  }

  showChecking(luhn, network) {
    if (luhn && network) {
      this.input.classList.add('input_checked', 'input_true');
    } else {
      this.input.classList.add('input_checked', 'input_false');
    }
  }

  hideChecking() {
    if (this.input.classList.contains('input_checked')) {
      this.input.classList.remove('input_checked', 'input_true', 'input_false');
    }
  }
}

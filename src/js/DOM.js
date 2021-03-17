export default class DOM {
  constructor() {
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

  showChecking(data) {
    if (data) {
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

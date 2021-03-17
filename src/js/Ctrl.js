export default class Ctrl {
  constructor(validator, dom) {
    this.validator = validator;
    this.dom = dom;
    this.form = document.getElementById('form');
    this.setSubmitListener();
    this.setInputListener();
  }

  setSubmitListener() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const check = this.validator.checkLuhnAlgorithm();
      this.dom.showChecking(check);
    });
  }

  setInputListener() {
    this.form.addEventListener('input', (e) => {
      this.dom.hideChecking();
      const network = this.validator.checkDigit(e.target.value);
      if (!network) {
        this.dom.activateNetworks();
      } else {
        this.dom.showNetwork(network);
      }
    });
  }
}

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
      this.dom.showChecking(check, this.network);
    });
  }

  setInputListener() {
    this.form.addEventListener('input', (e) => {
      this.dom.hideChecking();
      this.network = this.validator.checkSystem(e.target.value);
      if (!this.network) {
        this.dom.activateNetworks();
      } else {
        this.dom.showNetwork(this.network);
      }
    });
  }
}

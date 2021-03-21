export default class Validator {
  cleanData(data) {
    this.number = data.replace(/\s/g, '');
  }

  isNumber() {
    if (this.number.match(/\D/)) {
      throw new Error('Number should includes digits only');
    }
  }

  isCard() {
    if (this.number.length > 19 || this.number.length < 8) {
      return false;
    }
    return true;
  }

  checkLuhnAlgorithm() {
    if (this.isCard()) {
      let checking = 0;
      let isEven = false;
      for (let i = this.number.length - 1; i >= 0; i -= 1) {
        let digit = Number(this.number[i]);
        if (isEven) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        checking += digit;
        isEven = !isEven;
      }
      if (checking % 10 === 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  checkSystem(data) {
    this.cleanData(data);
    this.isNumber();
    let paymentSystem = false;
    const tmp = Number(this.number.slice(2, 4));
    const jcb = !!((tmp >= 28 && tmp <= 89));
    if (this.number.match(/^35/) && jcb) {
      paymentSystem = 'jcb';
    }
    if (this.number.match(/^4/)) {
      paymentSystem = 'visa';
    }
    if (this.number.match(/^2/)) {
      paymentSystem = 'mir';
    }
    if (this.number.match(/^5/)) {
      paymentSystem = 'mastercard';
    }
    if (this.number.match(/^62/)) {
      paymentSystem = 'cup';
    }
    if (this.number.match(/^34/) || this.number.match(/^37/)) {
      paymentSystem = 'amex';
    }
    if (this.number.match(/^36/)) {
      paymentSystem = 'dc';
    }
    return paymentSystem;
  }
}

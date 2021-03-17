import Validator from './Validator';
import DOM from './DOM';
import Ctrl from './Ctrl';

const dom = new DOM();
const validator = new Validator();
const ctrl = new Ctrl(validator, dom);
console.log(ctrl);

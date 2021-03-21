import Validator from './Validator';
import DOM from './DOM';
import networks from './networks';
import Ctrl from './Ctrl';

const dom = new DOM(networks);
const validator = new Validator();
const ctrl = new Ctrl(validator, dom);
console.log(ctrl);

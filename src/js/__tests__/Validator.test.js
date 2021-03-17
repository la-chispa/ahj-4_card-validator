import Validator from '../Validator';

test.each([
  ['true. Visa', '4929891369735230', true],
  ['true. Visa Electron', '4917043263559282', true],
  ['true. Mastercard', '5106899349259660', true],
  ['true. American Express', '370341395521958', true],
  ['true. American Express', '348370904365200', true],
  ['true. China UnionPay', '6228223624220258', true],
  ['true. Diners Club', '36989984464273', true],
  ['true. JCB', '3542934068759611', true],
  ['true. JCB', '3528934068759619', true],
  ['true. JCB', '3589340687596190', true],
  ['true. JCB', '3544966850838325623', true],
  ['true. Mir', '2203008828232474', true],
  ['false. Visa', '4929891369735231', false],
  ['false. Visa Electron', '4917043263559281', false],
  ['false. Mastercard', '5107899349259660', false],
  ['false. American Express', '370341395521959', false],
  ['false. American Express', '348370904365202', false],
  ['false. China UnionPay', '6228223624220250', false],
  ['false. Diners Club', '36989984464243', false],
  ['false. JCB', '3542934068759610', false],
  ['false. JCB', '3528934068459619', false],
  ['false. Mir', '2203008828232470', false],
])(('it should be %s'), (_, input, expected) => {
  const validator = new Validator();
  validator.number = input;
  const checkingCard = validator.checkLuhnAlgorithm();
  expect(checkingCard).toBe(expected);
});

test.each([
  ['true. Visa', '4929891369735230', 'visa'],
  ['true. Visa Electron', '4917043263559282', 'visa'],
  ['true. Mastercard', '5106899349259660', 'mastercard'],
  ['true. American Express', '370341395521958', 'amex'],
  ['true. American Express', '348370904365200', 'amex'],
  ['true. China UnionPay', '6228223624220258', 'cup'],
  ['true. Diners Club', '36989984464273', 'dc'],
  ['true. JCB', '3542934068759611', 'jcb'],
  ['true. JCB', '3528934068759619', 'jcb'],
  ['true. JCB', '3589340687596190', 'jcb'],
  ['true. JCB', '3544966850838325623', 'jcb'],
  ['true. Mir', '2203008828232474', 'mir'],
  ['false', '  0000', false],
  ['false', '0517899349259660', false],
  ['false', '380341395521959', false],
  ['false', '338370904365202', false],
  ['false', '1162223624220250', false],
  ['false', '39089984464243', false],
  ['false. JCB', '3522934068759610', false],
  ['false. JCB', '3591934068459619', false],
  ['false', '0000208828232470', false],
])(('it should be %s'), (_, input, expected) => {
  const validator = new Validator();
  const checkingCard = validator.checkDigit(input);
  expect(checkingCard).toBe(expected);
});

test.each([
  ['hyphen', '0517-8993-4925-9660'],
  ['comma', '0517899349259660,'],
  ['letter', 'O517899349259660,'],
])(('There are not digits only, there is %s'), (_, input) => {
  function check() {
    const validator = new Validator();
    validator.cleanData(input);
    validator.isNumber();
  }
  expect(check).toThrow();
});

test.each([
  ['too many digits', '5106 8993 4925 9660 0000', false],
  ['too less digits', '0517 899', false],
  ['min true length', '5106 8993', true],
  ['max true length', '5106 8993 4925 9660 000', true],
  ['usual true length', '5106 8993 4925 9660', true],
])(('%s'), (_, input, expected) => {
  const validator = new Validator();
  validator.cleanData(input);
  const checkingCard = validator.isCard();
  expect(checkingCard).toBe(expected);
});

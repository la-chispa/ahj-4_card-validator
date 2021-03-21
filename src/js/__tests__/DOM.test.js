import DOM from '../DOM';
import networks from '../networks';

test.each([
  ['visa', false],
  ['mastercard', true],
  ['amex', true],
  ['cup', true],
  ['dc', true],
  ['jcb', true],
  ['mir', true],
])('widget should shows payment system', (network, expected) => {
  const dom = new DOM(networks);
  dom.showNetwork('visa');
  const el = document.querySelector(`.card__${network}`);
  expect(el.classList.contains('card_deactivated')).toBe(expected);
});

test('widget shows all networks', () => {
  const dom = new DOM(networks);
  const el = document.querySelector('.card__visa');
  el.classList.add('card_deactivated');
  dom.activateNetworks();
  expect(el.classList.contains('card_deactivated')).toBeFalsy();
});

test.each([
  [true, false, 'false'],
  [true, true, 'true'],
  [false, true, 'false'],
  [true, 'visa', 'true'],
  [false, 'visa', 'false'],
])('widget should shows result', (luhn, network, mark) => {
  const dom = new DOM(networks);
  dom.showChecking(luhn, network);
  expect(dom.input.classList.contains('input_checked')).toBeTruthy();
  expect(dom.input.classList.contains(`input_${mark}`)).toBeTruthy();
});

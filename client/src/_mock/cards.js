// src/_mock/card.js

import { faker } from '@faker-js/faker';

export const cards = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  name: faker.finance.accountName(),
  cardNumber: faker.finance.creditCardNumber('#### #### #### ####'),
  expiryDate: faker.date.future().toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }),
  isDefault: index === 0, // First card is default
  status: faker.helpers.arrayElement(['active', 'expired', 'blocked']),
  cardType: faker.helpers.arrayElement(['Visa', 'MasterCard', 'American Express', 'Discover']),
  lastFourDigits: faker.finance.creditCardNumber('####'),
}));


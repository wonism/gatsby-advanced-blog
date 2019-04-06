import { flow, split, toNumber, get, defaultTo } from 'lodash/fp';

const getPage = index => flow(
  get('pathname'),
  split('/'),
  get(index),
  defaultTo('1'),
  toNumber
);

export default getPage;

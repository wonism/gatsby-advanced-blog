import { has } from 'lodash/fp';

const createReducer = (reducers = {}, initialState = {}) =>
  (state = initialState, { type, ...action }) =>
    (has(type)(reducers)
      ? reducers[type](state, action)
      : state);

export default createReducer;

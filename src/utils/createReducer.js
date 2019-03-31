const createReducer = (reducers = {}, initialState = {}) =>
  (state = initialState, { type, ...action }) =>
    ({}.hasOwnProperty.call(reducers, type)
      ? reducers[type](state, action)
      : state);

export default createReducer;

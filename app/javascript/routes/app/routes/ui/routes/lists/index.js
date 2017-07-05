export default {
  path: 'lists',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Lists'));
    });
  }
};

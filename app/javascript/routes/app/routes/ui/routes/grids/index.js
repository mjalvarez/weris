export default {
  path: 'grids',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Grids'));
    });
  }
};

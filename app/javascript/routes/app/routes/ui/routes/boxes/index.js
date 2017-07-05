export default {
  path: 'boxes',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Boxes').default);
    });
  }
};

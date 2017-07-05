export default {
  path: 'full-width',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/FullWidth').default);
    });
  }
};

export default {
  path: '500',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/500').default);
    });
  }
};

export default {
  path: 'lock-screen',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/LockScreen').default);
    });
  }
};

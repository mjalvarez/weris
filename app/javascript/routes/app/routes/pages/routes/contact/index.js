export default {
  path: 'contact',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Contact').default);
    });
  }
};

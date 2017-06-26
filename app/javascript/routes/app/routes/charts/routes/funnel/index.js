export default {
  path: 'funnel',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Funnel').default);
    });
  }
};

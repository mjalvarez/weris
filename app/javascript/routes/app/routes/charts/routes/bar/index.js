export default {
  path: 'bar',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Bar').default);
    });
  }
};

export default {
  path: 'Scatter',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Scatter').default);
    });
  }
};

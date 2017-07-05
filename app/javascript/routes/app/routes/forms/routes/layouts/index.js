export default {
  path: 'layouts',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Layouts').default);
    });
  }
};

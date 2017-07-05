export default {
  path: 'data',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/DataTables').default);
    });
  }
};

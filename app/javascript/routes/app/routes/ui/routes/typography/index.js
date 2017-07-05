export default {
  path: 'typography',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Typography').default);
    });
  }
};

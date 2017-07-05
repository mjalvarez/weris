export default {
  path: 'radar',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Radar').default);
    });
  }
};

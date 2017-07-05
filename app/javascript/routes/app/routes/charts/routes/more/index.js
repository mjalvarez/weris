export default {
  path: 'more',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/More').require);
    });
  }
};

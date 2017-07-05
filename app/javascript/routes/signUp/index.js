export default {
  path: 'sign-up',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/SignUp').default);
    });
  }
};

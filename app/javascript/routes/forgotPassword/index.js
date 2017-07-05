export default {
  path: 'forgot-password',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ForgotPassword').default);
    });
  }
};

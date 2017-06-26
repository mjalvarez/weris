export default {
  path: 'confirm-email',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ConfirmEmail').default);
    });
  }
};

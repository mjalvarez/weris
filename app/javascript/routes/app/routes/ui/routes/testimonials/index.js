export default {
  path: 'testimonials',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Testimonials'));
    });
  }
};

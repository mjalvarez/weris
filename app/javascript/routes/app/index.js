export default {
  path: 'app',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/charts').default,
        require('./routes/dashboard').default,
        require('./routes/ecommerce').default,
        require('./routes/forms').default,
        require('./routes/pageLayouts').default,
        require('./routes/pages').default,
        require('./routes/tables').default,
        require('./routes/ui').default,
      ]);
    });
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/MainApp'));
    });
  }
};

export default {
  path: 'table',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/data').default,
        require('./routes/responsive').default,
        require('./routes/static').default,
      ]);
    });
  }
};

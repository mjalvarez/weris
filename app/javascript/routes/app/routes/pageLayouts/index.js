module.exports = {
  path: 'pglayout',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/centered').default,
        require('./routes/fullWidth').default,
      ]);
    });
  }
};

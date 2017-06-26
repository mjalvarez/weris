module.exports = {
  path: 'form',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/components').default,
        require('./routes/layouts').default,
        require('./routes/steppers').default,
      ]);
    });
  }
};

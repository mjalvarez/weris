export default {
  path: 'chart',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/bar').default,
        require('./routes/funnel').default,
        require('./routes/line').default,
        require('./routes/more').default,
        require('./routes/pie').default,
        require('./routes/radar').default,
        require('./routes/scatter').default,
      ]);
    });
  }
};

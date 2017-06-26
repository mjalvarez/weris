module.exports = {
  path: 'page',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/about').default,
        require('./routes/blog').default,
        require('./routes/careers').default,
        require('./routes/contact').default,
        require('./routes/faqs').default,
        require('./routes/services').default,
        require('./routes/terms').default,
      ]);
    });
  }
};

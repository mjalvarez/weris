export default {
  path: 'ecommerce',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/horizontalProducts').default,
        require('./routes/products').default,
        require('./routes/invoice').default,
      ]);
    });
  }
};

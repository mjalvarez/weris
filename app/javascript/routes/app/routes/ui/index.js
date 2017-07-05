export default {
  path: 'ui',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/boxes').default,
        require('./routes/buttons').default,
        require('./routes/callToActions').default,
        require('./routes/cards').default,
        require('./routes/colors').default,
        require('./routes/components').default,
        require('./routes/featureCallouts').default,
        require('./routes/grids').default,
        require('./routes/hover').default,
        require('./routes/iconBoxes').default,
        require('./routes/icons').default,
        require('./routes/lists').default,
        require('./routes/menus').default,
        require('./routes/pricingTables').default,
        require('./routes/sashes').default,
        require('./routes/testimonials').default,
        require('./routes/timeline').default,
        require('./routes/typography').default,
      ]);
    });
  }
};

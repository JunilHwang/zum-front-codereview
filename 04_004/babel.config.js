module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: {
          version: '3',
          proposal: true,
        },
        targets: 'defaults, > 1%, ie 11',
      }
    ]
  ]
};
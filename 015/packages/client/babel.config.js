module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: '11',
        },
        // 필요한 폴리필만 해당 파일에 import
        useBuiltIns: 'usage',
        corejs: 3,
        // 브라우저에서 제공하는 proposal 지원
        shippedProposals: true,
        modules: false,
      },
    ],
    '@babel/preset-typescript',
  ];

  const plugins = ['@babel/plugin-proposal-optional-chaining'];

  return {
    presets,
    plugins,
  };
};

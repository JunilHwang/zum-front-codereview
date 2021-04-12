const presets = [
  [
    "@babel/preset-env",
    {
      targets: "> 0.25%, not dead",
      useBuiltIns: "usage",
      modules: process.env.NODE_ENV === "production" ? false : "auto",
      corejs: "3.0.0",
    },
  ],
];

module.exports = {
  presets,
};

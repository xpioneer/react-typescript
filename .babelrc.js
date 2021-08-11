
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 0.25%, not dead',
        ignoreBrowserslistConfig: true,
        useBuiltIns: false,
        modules: false,
        exclude: ['transform-typeof-symbol']
      }
    ],
    '@babel/preset-react',
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
        allowNamespaces: true,
        allowDeclareFields: true
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {legacy: true}
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {loose: true}
    ]
  ]
}
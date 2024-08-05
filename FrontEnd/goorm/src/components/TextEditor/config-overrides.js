const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          babel: false,
          icon: true,
          svgoConfig: {
            plugins: {
              removeViewBox: false
            }
          },
          throwIfNamespace: false // 이 줄을 추가하여 네임스페이스 태그 오류 해결
        }
      }
    ]
  })
);

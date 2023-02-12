module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          '@/assets': './src/assets',
          '@/components': './src/components',
          '@/navigations': './src/navigations',
          '@/screens': './src/screens',
          '@/styles': './src/styles',
        },
      },
    },
  },
};

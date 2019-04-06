const off = 0;
const warn = 1;
const error = 2;

module.exports = {
  extends: ['airbnb', 'plugin:import/errors', 'plugin:import/warnings'],
  plugins: ['react', 'import'],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    'comma-dangle': [
      error,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      },
    ],
    'function-paren-newline': [error, 'consistent'],
    'global-require': off,
    'implicit-arrow-linebreak': off,
    'import/extensions': off,
    'import/no-deprecated': warn,
    'import/no-dynamic-require': off,
    'import/no-unresolved': off,
    'import/no-webpack-loader-syntax': off,
    'import/prefer-default-export': off,
    indent: [
      error,
      2,
      {
        SwitchCase: 1,
      },
    ],
    'jsx-a11y/anchor-is-valid': off,
    'jsx-a11y/click-events-have-key-events': error,
    'jsx-a11y/heading-has-content': off,
    'jsx-a11y/href-no-hash': off,
    'jsx-a11y/label-has-for': off,
    'jsx-a11y/label-has-associated-control': off,
    'jsx-a11y/mouse-events-have-key-events': off,
    'jsx-a11y/no-autofocus': off,
    'max-len': [error, 150, { ignoreComments: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
    'no-console': error,
    'no-lonely-if': off,
    'no-multiple-empty-lines': [error, { max: error, maxEOF: error }],
    'no-implicit-coercion': error,
    'no-shadow': off,
    'no-underscore-dangle': off,
    'no-unused-vars': [error, { args: 'after-used', ignoreRestSiblings: false }],
    'object-curly-newline': [error, { consistent: true }],
    'prefer-spread': off,
    'react/jsx-filename-extension': [error, { extensions: ['.js', '.jsx'] }],
    'react/jsx-no-target-blank': error,
    'react/no-typos': error,
    'react/no-unescaped-entities': off,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      jsx: true,
      modules: true,
      globalReturn: false,
      experimentalObjectRestSpread: true,
    },
    babelOptions: {
      configFile: '.babelrc.js',
    },
  },
  overrides: [
    {
      files: ['gatsby-node.js'],
      rules: {
        'import/no-extraneous-dependencies': off,
      },
    },
    {
      files: ['src/components/Resume/index.jsx', 'src/components/Portfolio/index.jsx', 'src/components/Post/index.jsx', 'src/templates/*.jsx'],
      rules: {
        'react/no-danger': off,
      },
    },
    {
      files: ['src/html.jsx'],
      rules: {
        'react/prefer-stateless-function': off,
        'react/prop-types': off,
        'react/no-danger': off,
      },
    },
    {
      files: ['src/**/*.test.js'],
      rules: {},
    },
  ],
  settings: {
    react: {
      pragma: 'React',
      version: '16.8.5',
    }
  }
};

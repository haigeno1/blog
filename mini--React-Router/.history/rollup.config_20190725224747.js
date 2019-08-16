import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
export default {
  input: 'lib/index.js',
  output: {
    file: 'mini-router.js',
    format: 'es',
    // name: 'iifeName'
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ]
};


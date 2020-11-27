
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import alias from '@rollup/plugin-alias'

const plugins = [
    alias({
        entries: {
            '@toolkit': './src/index.js'
        }
    }),
    buble(),
    commonjs(),
    resolve()
]

export default [
    {
        input: 'src/index.js',
        output: {
            name: '_toolkit',
            file: 'dist/index.js',
            format: 'umd'
        },
        plugins
    },

    {
        input: 'test/index.js',
        output: {
            name: '_toolkit-tests',
            file: 'dist/test.js',
            format: 'umd'

        },


        plugins
    }
/*
    {
        input: 'benchmark/index.js',
        output: {
            name: 'colorchess_toolkit_benchmarks',
            file: 'dist/benchmark.js',
            format: 'umd'
        },
        plugins
    }
*/
]

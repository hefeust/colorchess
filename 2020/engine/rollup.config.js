
import buble from '@rollup/plugin-buble'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'

const plugins = [
    alias({
        entries: {
            '@toolkit': '../toolkit/dist/index.js',
            '@engine': 'dist/index.js'
        }
    }),

    buble({
        transforms: {
            spreadRest: true
        },

        objectAssign: 'Object.assign'
    }),
    commonjs(),
    resolve()
]

export default [
    {
        input: 'src/index.js',
        output: {
            name: 'ColorChessEngine',
            file: 'dist/index.js',
            format: 'umd'
        },
        plugins
    },

    {
        input: 'test/index.js',
        output: {
            name: 'ccengine_test',
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

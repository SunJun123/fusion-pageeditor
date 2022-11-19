import baseConfig from '../../scripts/rollup.base.js'
import postcss from 'rollup-plugin-postcss'
const plugins = [postcss({
    minimize: true,
    modules: true,
    extensions: ['.css','.scss'],
    use: {
        scss: null,
        sass: null,
        stylus: null,
    },
    plugins: [],
})];

export default baseConfig('fusion.components', 'Fusion.Components',...plugins)

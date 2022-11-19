import baseConfig from '../../scripts/rollup.base.js'
import postcss from 'rollup-plugin-postcss'
const plugins = [postcss({
    minimize: true,
    modules: true,
})];

export default baseConfig('fusion.components', 'Fusion.Components',...plugins)

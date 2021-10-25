// 自动导入所有图标
const iconContext = require.context('./modules', true, /\.svg$/)

const requireAll = iconContext => iconContext.keys().map(iconContext)
requireAll(iconContext)

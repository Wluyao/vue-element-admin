// 自动导入所有图标
const iconContext = require.context('./modules', false, /\.svg$/)

const requireAll = iconContext => iconContext.keys().map(iconContext)
requireAll(iconContext)

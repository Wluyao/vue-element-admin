## 项目简介

    后台管理系统。

## 技术依赖

主体：Vue、ElementPlus、TypeScript、Vite

## 功能

- 登录/退出
- 全屏浏览
- 一键换肤
- 系统风格
- 元素大小
- 个人中心
- 侧边菜单
- 标签导航
- 图表
  - 折线图
  - 面积图
  - 柱状图
  - 条形图
  - 饼图
  - 散点图
- 表单
  - 基础表单
  - 步骤表单
  - 动态表单
- 表格
- Tab 选项卡
- 权限控制
- 用户管理
- 文章管理
  - 创建文章
  - 文章列表
- pdf
- 上传
  - 头像上传
  - 文件上传
- 错误处理
  - 403
  - 404
- 其他功能
  - 导入/导出 excel
  - 滚动条
  - 打印
  - html2canvas
  - 拖拽 Dialog
  - 地图
  - 快捷复制
  - 文本溢出

## 目录结构

```

|-- public              html模板
|-- src                 源码
|	|-- @types                全局类型定义
|	|-- apis                  接口
|	|-- assets                静态资源文件
|		|-- images                图片
|		|-- icons                 图标
|		|-- styles                样式
|	|-- components            组件
|		|-- base                  基础组件
|		|-- business              业务组件
|	|-- directive             通用指令
|	|-- layouts               基础布局
|		|-- platform              平台布局
|		|-- portal                门户布局
|	|-- mock                  数据模拟
|	|-- views                 页面
|	|-- router                路由管理
|	|-- store                 状态管理
|	|-- utils                 全局公用方法
|	|-- App.vue               根组件
|	|-- main.ts               入口文件
```

## 使用

#### 安装依赖

```
yarn
```

#### 运行

```
yarn serve
```

#### 构建

```
yarn build
```

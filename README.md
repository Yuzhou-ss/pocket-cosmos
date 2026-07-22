# pocket-cosmos

> 一个带宇宙主题的 Vue 3 终端式个人门户：终端、导航、天气特效、Live2D 桌宠、壁纸管理，一屏搞定。

## ✨ 特性

- 🖥️ **终端式首页** — 基于 `vue-web-terminal`，输入指令获取壁纸、天气、介绍等
- 🌌 **宇宙主题路由** — 所有页面位于 `/yuzhou/*` 下
- 🌧️ **天气特效** — 雪花 / 雨 / 樱花飘落，canvas 绘制，根据用户城市天气自动切换
- 🐱 **Live2D 桌宠** — `pixi-live2d-display` 驱动，可拖拽、交互
- 🖼️ **壁纸管理** — 接入 birdpaper 壁纸 API，支持分类、关键词搜索、随机获取
- 🧭 **导航页** — 快捷访问、AI 工具集、图片处理工具集、自定义背景
- 🌤️ **高德天气** — AMap SDK 定位城市并查询实时天气
- 💾 **本地持久化** — Pinia + localStorage，登录态与配置跨刷新保留

## 🛠️ 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | Vue 3 + TypeScript + Vite |
| 状态管理 | Pinia（镜像到 localStorage） |
| 路由 | Vue Router（hash 模式） |
| UI | Element Plus（自动导入）+ SCSS |
| 终端 | vue-web-terminal |
| 桌宠 | pixi-live2d-display + pixi.js |
| 地图/天气 | AMap (高德地图) SDK |
| HTTP | axios（项目后端 + 第三方代理双实例） |
| 包管理 | pnpm |

## 📦 安装

```bash
pnpm install
```

## 🚀 使用

```bash
# 开发
pnpm dev

# 生产构建
pnpm build

# 预览构建产物
pnpm preview
```

## 🌍 环境变量

- `.env.development` — `VITE_APP_API_URL=http://localhost:3000/api`
- `.env.production` — `VITE_APP_API_URL=http://121.36.205.18:3000/api`

Vite 开发服务器代理了以下第三方接口（见 `vite.config.ts`）：

- `/apiSohu`、`/apiShou` → `http://pv.sohu.com/`（IP 定位）
- `/intf` → `http://wp.birdpaper.com.cn/`（壁纸）

## 📂 项目结构

```
src/
├── components/
│   ├── terminal-window/     # 终端组件、指令、壁纸分类
│   ├── desktopPet/          # Live2D 桌宠
│   ├── suspended-menu/      # 悬浮菜单
│   └── about/               # 关于页卡片
├── views/
│   ├── terminal/            # 终端首页（落地页）
│   ├── navigation/          # 导航页
│   ├── home/ about/ login/  # 其他页面
│   └── windowsTerminal/     # xterm 风格终端
├── hooks/                   # 天气特效（snow/rain/sakura-snow）
├── api/
│   ├── http.ts              # 项目后端 axios 实例
│   └── orther/ortherHttp.ts # 第三方接口 axios 实例
├── store/modules/           # Pinia: user / search / navbg
└── utils/                   # weather / bus (mitt) / petName 等
```

## 📝 备注

- 终端模块 `src/components/terminal-window/commands.ts` 在模块加载时使用了顶层 `await initBgCategory()`，因此构建目标为 `es2020` 并依赖 `vite-plugin-top-level-await`。**不要移除该调用**——壁纸分类缓存被 `src/api/orther/index.ts` 依赖。
- 后端有 Node.js 与 SpringBoot 两个版本，通过 `src/api/index.ts` 中注释切换。当前启用的是 Node.js 版本。
- `vue-web-terminal` 为第三方库，不在本仓库内。

## 📜 License

MIT

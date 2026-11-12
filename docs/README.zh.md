# Oikoumene · 寰宇时序

[**打开地图**](https://oikoumene.pages.dev) · [English](../README.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Italiano](README.it.md)

Οἰκουμένη（oikoumene）是古希腊人对"有人居住的世界"的称呼——从直布罗陀到赛里斯（中国），他们所知道的一切。这张交互地图把那个世界画在一张图上：西起大西洋，东到日本，南起赤道，北到北冰洋，公元前 500 年到公元 2000 年，拖动时间轴看帝国兴衰、城市改名、人物迁徙。

纯静态页面：一个 HTML、一个 JSON 文件夹、d3-geo 做投影。没有后端，不收集任何数据。

## 图上有什么

- **边界**：公元前 500 年至 2000 年的 29 个切片，上一切片以虚线"残影"显示，得失一目了然。
- **山川**：地形晕渲、河流、湖泊、山脉、沙漠、山峰在最底层，帝国落在塑造它的山川之上。
- **城市**：128 座，每座城历代的名字用当时统治者的文字记录（拜占庭 → 君士坦丁堡 → قسطنطينيه → İstanbul）、都城时段，主要城市有一句话标签和一段简史。
- **人物**：62 位，按生活年代显示在他们活动的地方，有传记和「生平行迹」按钮：亚历山大到印度河、玄奘到那烂陀、伊本·白图泰到杭州。
- **事件**：138 条，六类着色——政治、科学、技术、思想、宗教、艺术——同时出现在地图、时间轴和右侧编年栏。
- **巡礼**：逐时期播放。全景保持全区视野，跟随则放大到每一站。拖拽或缩放地图会退出跟随。`?tour=1` 仍会开始巡礼。
- **六种界面语言**：英文、法文、德文、意大利文、西班牙文、中文。每张卡片都有维基百科链接。

## 试一试

`?year=-323` 亚历山大去世那一年 · `?year=1200` 蒙古西征前夜 · `?year=1453&lang=zh` 君士坦丁堡陷落 · `?journey=alexander` 东征路线 · `?tour=1` 自动巡礼

## 主题

主题是可以走进去的故事：无关的一切淡出，时间轴只显示它的区间，一站一站地走。已上线四个，另有二十个待投票，选择理由见 [THEMES.zh.md](THEMES.zh.md)。

## 姊妹项目

本项目以 [江山时序 jiangshan-map](https://github.com/DeanChensj/jiangshan-map)（Dean Chen）为范本，后者以手工描绘的边界和年号纪年做了同样的事。两者共用一套交互模型和 `?year=` 链接约定，计划让地名链接在两张图之间互跳，从长安到巴格达的行程可以一路看完。

## 声明

Oikoumene（寰宇时序）是一幅面向教育和人文阅读的历史可视化。它不代表、也不支持任何政治立场。

边界、路线、年代和名称都是近似的，只供示意。

边界来自 [aourednik/historical-basemaps](https://github.com/aourednik/historical-basemaps)（CC BY 4.0），是一份已知有误差的大洲尺度数据。地形、河流和湖泊来自 Natural Earth。人物传记、城市简史、事件和主题文章是为本图写的导读，不是学术考据。

欢迎通过 [GitHub issues](https://github.com/wangyuexiang/oikoumene/issues) 指正。本仓库的代码与整理过的文字以 [MIT 许可证](../LICENSE)发布。分叉、镜像和修改副本都不是本项目的正式版本。

地图界面里的「声明」打开同一份说明。

## 局限

边界来自 historical-basemaps，是大洲尺度的数据，有已知错误，仅为示意，将逐时期替换为参照 Euratlas 与 Barrington Atlas 手工描绘的版本。传记和城市简史是为本图写的入门概述，不是考据。欢迎 issue 和 PR 纠错。

## 用 Claude 制作

本项目由王悦翔与 Anthropic 的 Claude 在 2026 年 11 月的两天对话中设计并构建：数据管道、页面、传记、城市简史和 README 均如此。方向、取舍和名字是悦翔的，键盘大多是 Claude 敲的。

详细的数据格式和贡献方法见英文 [README](../README.md) 与 [CONTRIBUTING](../CONTRIBUTING.md)。

## 中国大陆可访问的静态构建

主站 `public/` 仍是 Cloudflare 上的六种语言版本，构建不会改它。给大陆读者的是另一份产物 `dist-cn/`：只有中文和英文，默认中文；页面不请求 Google 字体，也不请求 cdnjs、jsDelivr、unpkg。d3 随包放在 `vendor/d3.min.js`（与主站相同的 7.9.0，ISC）。地图不用 topojson。字体用系统字体。中文界面的百科按钮打开抖音百科搜索（`https://www.baike.com/search?keyword=`），英文界面仍用英文维基百科。声明文字与主站相同。2000 年切片里，岛屿多边形并在中国多边形上，标签也是中国。

GitHub 上的声明链接和「更多主题」链接是点击才打开的，页面加载不依赖它们。大陆网络访问 GitHub 可能较慢。

### 本地构建

```bash
./scripts/build-cn.sh
cd dist-cn && python3 -m http.server 8000
```

### 创建 Bucket

1. 在阿里云 OSS 新建 Bucket，地域选**中国香港**（`oss-cn-hongkong`）。香港地域不需要 ICP 备案，适合小范围访问。
2. 读写权限设为**公共读**（public-read），否则浏览器读不到文件。
3. 基础设置里打开**静态页面**，默认首页填 `index.html`。
4. 新 Bucket 的默认域名（`*.oss-cn-hongkong.aliyuncs.com`）会把 HTML 当成附件下载，地址栏打开是下载而不是网页。给 Bucket **绑定自定义域名**后再访问，HTML 才会按网页返回。香港地域绑定域名一般不要求备案。也可以在 OSS 前面加 CDN，用 CDN 域名访问，回源到这个 Bucket。

### 最小权限的 RAM

为上传单独建一个 RAM 用户，只允许这一个 Bucket。把下面的 `YOUR-BUCKET` 换成实际名字：

```json
{
  "Version": "1",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "oss:PutObject",
      "oss:GetObject",
      "oss:DeleteObject",
      "oss:ListObjects",
      "oss:AbortMultipartUpload",
      "oss:ListParts"
    ],
    "Resource": [
      "acs:oss:*:*:YOUR-BUCKET",
      "acs:oss:*:*:YOUR-BUCKET/*"
    ]
  }]
}
```

AccessKey 只放在环境变量里，不要写进仓库。

### 上传

安装 [ossutil](https://www.alibabacloud.com/help/zh/oss/developer-reference/ossutil-overview) 1.7 或 2.x，然后：

```bash
export OSS_BUCKET=your-bucket
export OSS_REGION=oss-cn-hongkong
export ALIBABA_CLOUD_ACCESS_KEY_ID=你的AccessKeyId
export ALIBABA_CLOUD_ACCESS_KEY_SECRET=你的AccessKeySecret
./scripts/deploy-oss.sh
```

`index.html` 为 `Cache-Control: no-cache`。`data/` 以及 `vendor/` 缓存一天。脚本按扩展名设置 Content-Type（`.html` 为 `text/html`，`.json` 为 `application/json`，`.js` 为 `text/javascript`，`.webp` 为 `image/webp`）。

/**
 * 站点罗盘导航数据源
 * 用于 /compass/ 页面展示
 */

export interface CompassEntry {
	label: string;
	href: string;
	note?: string;
	icon?: string;
	image?: string;
}

export interface CompassShelf {
	key: string;
	name: string;
	icon?: string;
	blurb?: string;
	entries: CompassEntry[];
}

export const compassData: CompassShelf[] = [
	{
		key: "gongjuxiang",
		name: "工具箱",
		icon: "material-symbols:handyman-rounded",
		entries: [
			{
				label: "网络工具 | 中科大测速",
				href: "https://test.ustc.edu.cn/",
				note: "中科大提供的网络测速工具，用于快速测试本地带宽与网络延迟。",
				icon: "https://favicon.im/test.ustc.edu.cn",
			},
			{
				label: "网络工具 | ITDOG",
				href: "https://www.itdog.cn/",
				note: "在线网络工具箱，支持 Ping、TCPing、网站测速、HTTP 测速、路由追踪与 DNS 查询。",
				icon: "https://favicon.im/itdog.cn",
			},
			{
				label: "图片处理 | 在线图像工具箱",
				href: "https://phototool.cn/",
				note: "在线图片处理工具箱，支持格式转换、压缩、裁剪与批量下载。",
				icon: "https://favicon.im/phototool.cn",
			},
			{
				label: "图片查找 | SauceNAO",
				href: "https://saucenao.com/",
				note: "以图搜图引擎，支持查找动漫插画、同人图等图片来源。",
				icon: "https://favicon.im/saucenao.com",
			},
			{
				label: "图床 | StarDots",
				href: "https://dashboard.stardots.io/?lang=zh",
				note: "一站式图片托管与 CDN 加速平台，支持图片管理、转换与分发。",
				icon: "https://favicon.im/stardots.io",
			},
			{
				label: "抠图 | 抠抠图",
				href: "https://www.koukoutu.com/removebgtool/all",
				note: "免费 AI 在线抠图工具，支持一键自动去背景、批量处理与透明 PNG 生成。",
				icon: "https://favicon.im/koukoutu.com",
			},
			{
				label: "GIF 背景移除 | AdWorker",
				href: "https://adworker.ai/zh/tools/gif-background-remover/",
				note: "在线 GIF 动图背景去除工具，支持自动识别并移除 GIF 背景。",
				icon: "https://favicon.im/adworker.ai",
			},
			{
				label: "PatorJK",
				href: "https://patorjk.com/",
				note: "在线 ASCII 艺术字生成器，还提供多种实用小工具集合。",
				icon: "https://favicon.im/patorjk.com",
			},
		],
	},
	{
		key: "aizhushou",
		name: "AI 助手",
		icon: "material-symbols:smart-toy-outline",
		entries: [
			{
				label: "豆包",
				href: "https://www.doubao.com/",
				note: "字节跳动推出的 AI 助手，支持对话、写作、翻译与编程辅助。",
				icon: "https://favicon.im/doubao.com",
			},
			{
				label: "ChatGPT",
				href: "https://chatgpt.com/",
				note: "OpenAI 开发的对话式 AI，适用于写作、编程、分析与日常问答。",
				icon: "https://favicon.im/chatgpt.com",
			},
			{
				label: "Claude",
				href: "https://claude.ai/",
				note: "Anthropic 开发的 AI 助手，擅长长文本理解、代码分析与深度推理。",
				icon: "https://favicon.im/claude.ai",
			},
			{
				label: "Gemini",
				href: "https://gemini.google.com/",
				note: "Google 推出的多模态 AI，支持文本、图片理解与代码生成。",
				icon: "https://favicon.im/gemini.google.com",
			},
			{
				label: "Grok",
				href: "https://grok.com/",
				note: "xAI 开发的 AI 助手，支持实时搜索、图像生成与深度推理。",
				icon: "https://favicon.im/grok.com",
			},
		],
	},
	{
		key: "aigongju",
		name: "AI 工具",
		icon: "material-symbols:auto-awesome-outline",
		entries: [
			{
				label: "能力排行榜 | Artificial Analysis",
				href: "https://artificialanalysis.ai/?intelligence-category=reasoning-vs-non-reasoning",
				note: "AI 模型推理能力对比分析平台，帮助理解不同模型的性能差异。",
				icon: "https://favicon.im/artificialanalysis.ai",
			},
			{
				label: "能力排行榜 | AI Arena",
				href: "https://arena.ai/leaderboard",
				note: "AI 模型竞技排行榜，综合对比各大语言模型的能力表现。",
				icon: "https://favicon.im/arena.ai",
			},
			{
				label: "ModelScope 魔搭社区",
				href: "https://www.modelscope.cn/",
				note: "阿里达摩院开源模型社区，提供丰富的 AI 模型与推理服务。",
				icon: "https://favicon.im/modelscope.cn",
			},
			{
				label: "skill市场 | Skills Marketplace",
				href: "https://skillsmp.com/",
				note: "AI 技能市场，发现和分享各类 AI 工具与自动化工作流。",
				icon: "https://favicon.im/skillsmp.com",
			},
			{
				label: "提示词优化 | PromptPilot",
				href: "https://promptpilot.volcengine.com/",
				note: "火山引擎推出的 Prompt 优化工具，帮助提升大模型输出质量。",
				icon: "https://favicon.im/volcengine.com",
			},
			{
				label: "资源站 | ACGN AI 资源站",
				href: "https://res.acgnai.top/",
				note: "ACGN 方向的 AI 资源聚合平台，提供模型下载、工具推荐与教程。",
				icon: "https://favicon.im/acgnai.top",
			},
			{
				label: "图像生成 | Oblivion Image Gallery",
				href: "https://image.oblivionis.net/gallery",
				note: "免费的GPT AI 生成图像画廊，展示高质量的人工智能艺术作品。",
				icon: "https://favicon.im/oblivionis.net",
			},
			{
				label: "设计工具 | Figma",
				href: "https://www.figma.com/",
				note: "在线 UI/UX 设计协作工具，支持团队协作与 AI 辅助设计。",
				icon: "https://favicon.im/figma.com",
			},
			{
				label: "设计工具 | Google AI Studio",
				href: "https://aistudio.google.com/",
				note: "Google 官方 AI 开发平台，支持 Chat/Build/Stream 三模式，可快速原型化 Gemini 应用。",
				icon: "https://favicon.im/aistudio.google.com",
			},
			{
				label: "设计工具 | Google Stitch",
				href: "https://stitch.withgoogle.com/",
				note: "Google Labs 推出的 AI 原生 UI 设计工具，用文字或图片生成界面并导出代码。",
				icon: "https://favicon.im/withgoogle.com",
			},
			{
				label: "模型部署 | Ollama",
				href: "https://ollama.com/",
				note: "本地运行大语言模型的轻量框架，支持一键部署 Llama、Qwen 等开源模型。",
				icon: "https://favicon.im/ollama.com",
			},
		],
	},
	{
		key: "aibot",
		name: "AI BOT",
		icon: "material-symbols:forum-outline",
		entries: [
			{
				label: "NapCat",
				href: "https://napneko.github.io/",
				note: "基于 NTQQ 的 QQ 机器人框架，支持插件扩展与多协议接入。",
				icon: "https://favicon.im/napneko.github.io",
			},
			{
				label: "AstrBot",
				href: "https://astrbot.app/",
				note: "多平台聊天机器人框架，支持 QQ、Discord、Telegram 等主流平台。",
				icon: "https://favicon.im/astrbot.app",
			},
			{
				label: "Mai-bot",
				href: "https://docs.mai-mai.org/",
				note: "音乐游戏 MaiMai 相关机器人，支持查分、排位等功能。",
				icon: "https://favicon.im/mai-mai.org",
			},
			{
				label: "NoneBot",
				href: "https://nonebot.dev/docs/",
				note: "Python 异步机器人框架，支持多平台适配器与丰富的插件生态。",
				icon: "https://favicon.im/nonebot.dev",
			},
			{
				label: "LLBot",
				href: "https://github.com/LLOneBot/LuckyLilliaBot",
				note: "基于 NTQQ 的轻量 QQ 机器人框架，支持 OneBot 协议。",
				icon: "https://favicon.im/github.com",
			},
		],
	},
	{
		key: "qianduan",
		name: "前端组件库",
		icon: "material-symbols:code-rounded",
		entries: [
			{
				label: "单页设计 | One Page Love",
				href: "https://onepagelove.com/",
				note: "单页网站设计灵感库，汇集 Landing Page 模板与创意参考。",
				icon: "https://favicon.im/onepagelove.com",
			},
			{
				label: "移动端设计 | Mobbin",
				href: "https://mobbin.com/",
				note: "移动端 UI 设计参考库，收录大量 App 界面截图与交互模式。",
				icon: "https://favicon.im/mobbin.com",
			},
			{
				label: "设计作品 | Awwwards",
				href: "https://www.awwwards.com/",
				note: "全球优秀网页设计作品评选平台，汇集创意灵感与设计趋势。",
				icon: "https://favicon.im/awwwards.com",
			},
			{
				label: "前端组件库 | shadcn/ui",
				href: "https://ui.shadcn.com/",
				note: "基于 Radix UI 和 Tailwind CSS 的优雅 React 组件集合。",
				icon: "https://favicon.im/shadcn.com",
			},
			{
				label: "前端组件库 | HeroUI",
				href: "https://heroui.com/",
				note: "高性能 React UI 组件库，基于 Tailwind CSS 和 Tailwind Variants。",
				icon: "https://favicon.im/heroui.com",
			},
			{
				label: "前端组件库 | Uiverse",
				href: "https://uiverse.io/",
				note: "社区驱动的开源 UI 元素库，提供按钮、输入框、卡片等精美组件。",
				icon: "https://favicon.im/uiverse.io",
			},
			{
				label: "前端在线演示 | CodePen",
				href: "https://codepen.io/",
				note: "前端在线演示平台，可实时编写和分享 HTML/CSS/JS 代码片段。",
				icon: "https://favicon.im/codepen.io",
			},
			{
				label: "前端组件库 | React Bits",
				href: "https://www.reactbits.dev/",
				note: "React 组件与 Hook 精选集合，实用且易于集成到项目中。",
				icon: "https://favicon.im/reactbits.dev",
			},
			{
				label: "前端 UI 组件库 | Magic UI",
				href: "https://magicui.design/",
				note: "精美动画组件库，提供可直接复制使用的 UI 动效组件。",
				icon: "https://favicon.im/magicui.design",
			},
			{
				label: "前端组件库 | Aceternity UI",
				href: "https://ui.aceternity.com/",
				note: "现代化 React 动画组件库，提供视觉效果出色的开源组件。",
				icon: "https://favicon.im/aceternity.com",
			},
			{
				label: "图标库 | Iconify",
				href: "https://iconify.design/",
				note: "统一图标框架，汇集超过 20 万个图标，支持按需加载。",
				icon: "https://favicon.im/iconify.design",
			},
			{
				label: "3D模型 | Sketchfab",
				href: "https://sketchfab.com/",
				note: "大型 3D 模型展示与分享平台，支持在线预览和免费下载。",
				icon: "https://favicon.im/sketchfab.com",
			},
		],
	},
	{
		key: "xuexi",
		name: "学习知识库",
		icon: "material-symbols:school-rounded",
		entries: [
			{
				label: "Java 全栈知识体系",
				href: "https://pdai.tech/",
				note: "涵盖 Java 核心、并发、JVM、框架、数据库与架构的全栈知识体系。",
				icon: "https://favicon.im/pdai.tech",
			},
			{
				label: "JavaGuide",
				href: "https://javaguide.cn/",
				note: "Java 学习与面试指南，覆盖 Java 基础、集合、并发、JVM 与 Spring 等核心知识。",
				icon: "https://favicon.im/javaguide.cn",
			},
			{
				label: "异常教程",
				href: "https://www.exception.site/",
				note: "提供 JetBrains 系列 IDE 的安装教程与激活资源分享。",
				icon: "https://favicon.im/exception.site",
			},
			{
				label: "力扣 LeetCode",
				href: "https://leetcode.cn/",
				note: "技术成长与算法练习平台，提供海量题库、面试题与编程竞赛。",
				icon: "https://favicon.im/leetcode.cn",
			},
			{
				label: "牛客网",
				href: "https://www.nowcoder.com/",
				note: "IT 求职备考与技术学习平台，提供笔试、面试题库与在线编程练习。",
				icon: "https://favicon.im/nowcoder.com",
			},
		],
	},
	{
		key: "dongman",
		name: "动漫&漫画",
		icon: "material-symbols:movie-rounded",
		entries: [
			{
				label: "AGE 动漫",
				href: "https://www.agedm.io/update",
				note: "免费动漫资源聚合站，提供高清动漫在线观看与更新推送。",
				icon: "https://favicon.im/agedm.io",
			},
			{
				label: "ManhwaTop",
				href: "https://manhwatop.com/",
				note: "韩漫与漫画阅读平台，收录热门连载与完结漫画资源。",
				icon: "https://favicon.im/manhwatop.com",
			},
		],
	},
	{
		key: "api",
		name: "API 接口",
		icon: "material-symbols:api",
		entries: [
			{
				label: "小小API",
				href: "https://xxapi.cn/",
				note: "免费 API 数据接口调用平台，提供多种聚合数据接口服务。",
				icon: "https://favicon.im/xxapi.cn",
			},
			{
				label: "高德地图API",
				href: "https://lbs.amap.com/",
				note: "高德地图开放平台，提供地图、定位、导航等地理信息服务。",
				icon: "https://favicon.im/amap.com",
			},
			{
				label: "聚合数据",
				href: "https://www.juhe.cn/",
				note: "国内数据服务平台，提供短信、物流、新闻等多种 API 接口。",
				icon: "https://favicon.im/juhe.cn",
			},
			{
				label: "有道翻译API",
				href: "https://ai.youdao.com/",
				note: "网易有道提供的翻译 API 服务，支持多语言文本互译。",
				icon: "https://favicon.im/youdao.com",
			},
			{
				label: "Tavily",
				href: "https://app.tavily.com/home",
				note: "AI 优化的搜索引擎 API，为大模型提供实时网页检索能力。",
				icon: "https://favicon.im/tavily.com",
			},
		],
	},
];

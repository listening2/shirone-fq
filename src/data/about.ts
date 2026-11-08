/**
 * 关于页数据源（技术栈分组、魔改时间线、社交链接）
 * 用于 /about/ 页面的 About 组件展示
 */

export interface AboutTechItem {
	name: string;
	desc: string;
	icon: string;
	url: string;
	color: string;
	darkColor?: string;
}

export interface AboutTechGroup {
	id: string;
	label: string;
	icon: string;
	items: AboutTechItem[];
}

export interface AboutMilestone {
	date: string;
	title: string;
	desc: string;
	tag?: string;
}

export type AboutSocialBrand =
	| "github"
	| "bilibili"
	| "qq"
	| "email"
	| "rss"
	| "twitter";

export interface AboutSocialLink {
	platform: string;
	handle: string;
	note?: string;
	href: string;
	icon: string;
	brand: AboutSocialBrand;
}

export const aboutTechGroups: AboutTechGroup[] = [
	{
		id: "framework",
		label: "核心框架",
		icon: "material-symbols:code-blocks-rounded",
		items: [
			{
				name: "Astro 7",
				desc: "站点骨架，内容驱动的静态框架",
				icon: "simple-icons:astro",
				url: "https://astro.build",
				color: "#ff5d01",
			},
			{
				name: "Svelte 5",
				desc: "编辑器与交互组件的界面层",
				icon: "simple-icons:svelte",
				url: "https://svelte.dev",
				color: "#ff3e00",
			},
			{
				name: "TypeScript",
				desc: "全站类型安全",
				icon: "simple-icons:typescript",
				url: "https://www.typescriptlang.org",
				color: "#3178c6",
			},
			{
				name: "Tailwind CSS 4",
				desc: "原子化样式引擎",
				icon: "simple-icons:tailwindcss",
				url: "https://tailwindcss.com",
				color: "#38bdf8",
			},
		],
	},
	{
		id: "content",
		label: "内容与渲染",
		icon: "material-symbols:terminal-rounded",
		items: [
			{
				name: "MDX",
				desc: "关于页的组件化内容",
				icon: "simple-icons:mdx",
				url: "https://mdxjs.com",
				color: "#f9ac00",
			},
			{
				name: "Expressive Code",
				desc: "代码块美化",
				icon: "material-symbols:data-object-rounded",
				url: "https://expressive-code.com",
				color: "#8b5cf6",
			},
			{
				name: "KaTeX",
				desc: "数学公式渲染",
				icon: "material-symbols:functions-rounded",
				url: "https://katex.org",
				color: "#4f6bed",
			},
			{
				name: "Mermaid",
				desc: "流程图与图表",
				icon: "simple-icons:mermaid",
				url: "https://mermaid.js.org",
				color: "#ff3670",
			},
		],
	},
	{
		id: "experience",
		label: "体验与动效",
		icon: "material-symbols:auto-awesome-rounded",
		items: [
			{
				name: "Swup",
				desc: "页面无缝过渡，丝滑不闪屏",
				icon: "material-symbols:transition-fade-rounded",
				url: "https://swup.js.org",
				color: "#0ea5e9",
			},
			{
				name: "Pagefind",
				desc: "静态全文搜索",
				icon: "material-symbols:search-rounded",
				url: "https://pagefind.app",
				color: "#2563eb",
			},
		],
	},
	{
		id: "deploy",
		label: "部署与数据",
		icon: "material-symbols:rocket-launch-rounded",
		items: [
			{
				name: "Vercel",
				desc: "站点托管与全球加速",
				icon: "simple-icons:vercel",
				url: "https://vercel.com",
				color: "#111111",
				darkColor: "#ffffff",
			},
			{
				name: "Cloudflare",
				desc: "DNS 与静态资源分发",
				icon: "simple-icons:cloudflare",
				url: "https://www.cloudflare.com",
				color: "#f38020",
			},
			{
				name: "Umami",
				desc: "隐私友好的访问统计",
				icon: "simple-icons:umami",
				url: "https://umami.is",
				color: "#111111",
				darkColor: "#ffffff",
			},
		],
	},
	{
		id: "tooling",
		label: "工程化",
		icon: "material-symbols:commit-rounded",
		items: [
			{
				name: "pnpm",
				desc: "包管理",
				icon: "simple-icons:pnpm",
				url: "https://pnpm.io",
				color: "#f9ad00",
			},
			{
				name: "Biome",
				desc: "Lint 与格式化",
				icon: "simple-icons:biome",
				url: "https://biomejs.dev",
				color: "#6f7bf7",
			},
			{
				name: "Playwright",
				desc: "端到端测试",
				icon: "simple-icons:playwright",
				url: "https://playwright.dev",
				color: "#2ead33",
			},
		],
	},
];

export const aboutMilestones: AboutMilestone[] = [
	{
		date: "2025.10",
		title: "fork 一份博客，开始魔改",
		tag: "起点",
		desc: "把开源模板 fork 回家，拉着本喵开始了大改造喵～",
	},
	{
		date: "2026.07",
		title: "友链自动检测上线",
		tag: "功能",
		desc: "给友链页接上了失效检测，掉线的小站自动进「暂留区」喵～",
	},
	{
		date: "2026.08",
		title: "时间线 & 图形化视图上线",
		desc: "更新日志变成时间线+图形化双视图，魔改的手就没停过喵～",
	},
	{
		date: "2026.09",
		title: "打赏名单 & 关于页重构",
		tag: "体验",
		desc: "打赏页加上捐助者名单，关于页复刻了旧博客的人物卡片体验喵～",
	},
];

export const aboutSocialLinks: AboutSocialLink[] = [
	{
		platform: "GitHub",
		handle: "listening",
		note: "代码与项目",
		href: "https://github.com/listening2",
		icon: "simple-icons:github",
		brand: "github",
	},
	{
		platform: "GitHub",
		handle: "fqzlr",
		note: "代码与项目",
		href: "https://github.com/fqzlr",
		icon: "simple-icons:github",
		brand: "github",
	},
	{
		platform: "B站",
		handle: "番茄煮理人",
		note: "关注一下，谢谢喵～",
		href: "https://space.bilibili.com/2017273493",
		icon: "simple-icons:bilibili",
		brand: "bilibili",
	},

	{
		platform: "Email",
		handle: "2971017192@qq.com",
		note: "商务合作 / 交流都行",
		href: "mailto:2971017192@qq.com",
		icon: "material-symbols:mail-outline-rounded",
		brand: "email",
	},
];

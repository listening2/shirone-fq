/**
 * 主题包类型定义。
 *
 * 契约（详见 .trae/documents/双站点主题实施方案.md）：
 * - 一个主题 = 一个文件夹 + `theme.ts` 清单 + 可选 `theme.css`；
 * - 主题只能表达视觉（令牌、显隐、列数、卡片表面），不得改动壳结构
 *   （导航 / 侧栏 / FAB / footer 仍由 MainGridLayout 唯一提供）；
 * - `theme.css` 的每条顶层选择器都必须带 `html[data-site-theme="<id>"]` 前缀，
 *   由 `scripts/check-themes.mjs` 强制校验，防止主题之间互相污染。
 */
export type SiteThemeDefinition = {
	/** 主题 id，必须与所在文件夹名一致 */
	id: string;
	/** 显示名（专有名词，不参与 i18n，避免每加主题改十个语言文件） */
	name: string;
	/** 主题切换按钮上的图标（Iconify 名，须来自已安装的离线图标集） */
	icon?: string;
	/**
	 * 选中该主题时的壁纸策略：
	 * - `inherit`（默认）：沿用访客保存的壁纸模式；
	 * - `none`：强制纯色背景（不写回访客偏好，切回默认主题时自动恢复）。
	 */
	wallpaper?: "inherit" | "none";
};

/**
 * 主题首页变体可消费的构建期数据。
 *
 * 数据由路由层（`src/pages/[...page].astro`）组装后作为 props 传入，
 * 主题页面只负责展示，不直接查询内容集合，避免主题里长出第二套数据层。
 */
export type ThemeHomeData = {
	/** 文章总数 */
	posts: number;
	/** 分类总数 */
	categories: number;
	/** 标签总数 */
	tags: number;
	/** 全站总字数（remark 字数汇总） */
	words: number;
	/** 最新文章（站点无文章时缺省） */
	latest?: {
		title: string;
		url: string;
		/** 已按站点时区格式化的日历日期（YYYY-MM-DD） */
		date: string;
	};
	/** 门户照片墙候选（已解析为可用 URL） */
	gallery: ThemeHomeGalleryItem[];
	/** 首页最近文章（含封面，最多 6 篇） */
	recent: ThemeHomePostItem[];
	/** 置顶文章（最多 3 篇） */
	pinned: ThemeHomePostItem[];
	/** 篇数最多的分类（最多 4 个） */
	topCategories: ThemeHomeTermItem[];
	/** 篇数最多的标签（最多 6 个） */
	topTags: ThemeHomeTermItem[];
	/** 首页「我的动态」时间线（最多 6 条，动态页关闭时为空） */
	moments?: ThemeHomeMomentItem[];
	/** 全站文章发布日期（YYYY-MM-DD），供首页热力图与运行时长使用 */
	postDates?: string[];
	/** 首页相册卡片堆叠（相册页关闭或无可见相册时缺省） */
	album?: ThemeHomeAlbumItem;
};

export type ThemeHomeAlbumItem = {
	/** 相册 id，用于拼接详情页地址 */
	id: string;
	/** 展示标题（配置可覆盖相册原标题） */
	title: string;
	description?: string;
	/** 相册日期（YYYY-MM-DD） */
	date: string;
	/** 相册照片总数 */
	photoCount: number;
	/** 堆叠卡片用的照片（最多 7 张，已解析为可用 URL） */
	photos: ThemeHomeGalleryItem[];
};

export type ThemeHomeMomentItem = {
	id: string;
	/** 纯文本摘要 */
	excerpt: string;
	/** 已按站点时区格式化的日历日期（YYYY-MM-DD） */
	date: string;
	/** ISO 时间戳，供机器可读的 datetime 使用 */
	iso: string;
	pinned?: boolean;
	hasImage?: boolean;
};

export type ThemeHomeGalleryItem = {
	src: string;
	width?: number;
	height?: number;
};

export type ThemeHomePostItem = {
	title: string;
	url: string;
	/** 已按站点时区格式化的日历日期（YYYY-MM-DD） */
	date: string;
	description?: string;
	category?: string;
	pinned?: boolean;
	/** 封面（文章未配置或解析失败时缺省） */
	cover?: ThemeHomeGalleryItem;
};

export type ThemeHomeTermItem = {
	name: string;
	count: number;
	url: string;
};

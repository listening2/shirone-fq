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

/**
 * 站点主题配置类型。
 * 内容仓覆盖文件：`config/site-theme.yaml`（登记见 scripts/content/config-domains.mjs）。
 */
export type SiteThemeConfig = {
	/**
	 * 是否启用站点主题切换。
	 * 关闭（默认）时：零 `data-site-theme` 属性、零主题 CSS 字节、面板不出现分区，
	 * 外观与未加此功能完全一致。
	 */
	enable?: boolean;
	/** 访客未选择时的默认主题 id，必须是 `src/themes/` 下已登记的主题；非法值回退第一个 */
	defaultTheme?: string;
};

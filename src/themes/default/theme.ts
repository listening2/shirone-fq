import type { SiteThemeDefinition } from "../types";

/**
 * 默认主题：沿用站点现有外观，不携带任何样式。
 * 选中它时零额外 CSS 字节，也是 `site-theme` 功能关闭时的唯一外观。
 */
export default {
	id: "default",
	name: "Shirone",
	icon: "material-symbols:palette",
} satisfies SiteThemeDefinition;

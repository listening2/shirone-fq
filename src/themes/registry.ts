import type { SiteThemeDefinition } from "./types";

/**
 * 主题登记表。
 *
 * `src/themes/<id>/theme.ts` 会被自动收集（`_template` 与以下划线开头的目录除外），
 * 因此新增主题只需复制 `_template` 文件夹并改 `id` / `name`，不必改本文件。
 *
 * 本模块会被前端组件（显示设置面板）引用，故只能放元数据，不得引入 CSS
 * 或页面组件——样式聚合在 `styles.ts`，页面变体在 P2 落地。
 */
const themeModules = import.meta.glob<{ default: SiteThemeDefinition }>(
	"./[!_]*/theme.ts",
	{ eager: true },
);

export const THEMES: readonly SiteThemeDefinition[] = Object.values(
	themeModules,
)
	.map((module) => module.default)
	.sort((a, b) => {
		if (a.id === "default") return -1;
		if (b.id === "default") return 1;
		return a.name.localeCompare(b.name);
	});

/** 键名与值域校验：仅接受已登记的主题 id */
export function isSiteThemeId(value: unknown): value is string {
	return (
		typeof value === "string" && THEMES.some((theme) => theme.id === value)
	);
}

export function getTheme(id: string): SiteThemeDefinition | undefined {
	return THEMES.find((theme) => theme.id === id);
}

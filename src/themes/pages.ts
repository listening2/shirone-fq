import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { THEMES } from "./registry";
import type { ThemeHomeData } from "./types";

/**
 * 主题页级变体（仅构建期使用，只能被路由文件引用）。
 *
 * 约定：变体文件固定为 `src/themes/<id>/pages/Home.astro`，以 `_` 开头的目录
 * 不参与自动发现。这样新增首页变体只需放置文件，`theme.ts` 保持纯元数据，
 * 不会把 `.astro` 组件拖进「显示设置」的浏览器 bundle。
 *
 * 变体白名单只有首页：其它路由仍走 Shirone 现有模板，避免绕开
 * `#swup-container` 的持久外壳契约。
 */
const HOME_VARIANT_PATH = /^\.\/([^/]+)\/pages\/Home\.astro$/;

const homeVariantModules = import.meta.glob<{
	default: AstroComponentFactory;
}>("./[!_]*/pages/Home.astro", { eager: true });

export type ThemeHomeVariant = {
	id: string;
	Component: AstroComponentFactory;
};

/** 已提供首页变体的主题（按目录自动发现） */
export function getHomeVariants(): ThemeHomeVariant[] {
	const variants: ThemeHomeVariant[] = [];
	for (const [path, module] of Object.entries(homeVariantModules)) {
		const match = HOME_VARIANT_PATH.exec(path);
		if (!match) continue;
		variants.push({ id: match[1], Component: module.default });
	}
	return variants;
}

/**
 * 首页变体显隐规则（仅在站点启用主题功能时输出到首页 `<head>`）。
 *
 * - 未命中任何变体的主题回退到 `default` 包装层（保留 Shirone 原生首页）；
 * - `display: none` 同时把隐藏份移出无障碍树，无需额外 `aria-hidden`；
 * - 规则放在首帧前的内联样式里，运行时切换主题不会闪跳。
 */
export function getHomeVariantCss(): string {
	const variantIds = new Set(getHomeVariants().map((variant) => variant.id));
	const rules = THEMES.map((theme) => {
		const target = variantIds.has(theme.id) ? theme.id : "default";
		return `html[data-site-theme="${theme.id}"] [data-theme-page="${target}"]{display:block}`;
	});
	return ["[data-theme-page]{display:none}", ...rules].join("\n");
}

export type { ThemeHomeData };

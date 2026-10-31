/**
 * 主题样式聚合（仅构建期使用）。
 *
 * Layout 在 `<head>` 里按「站点启用」条件内联这些 CSS：主题样式必须落位在首帧之前，
 * 否则切换回来的访客会先看到默认外观再跳变。未登记的目录（`_template`）不参与。
 *
 * 汇总为单个 `<style>` 而不是每主题一个：换肤零请求、零闪烁，
 * 代价是每页多出 N×CSS 字节，因此单个主题样式应控制在 3KB 量级。
 */
const themeCssModules = import.meta.glob<string>("./[!_]*/theme.css", {
	eager: true,
	query: "?raw",
	import: "default",
});

const THEME_CSS_PATH = /^\.\/([^/]+)\/theme\.css$/;

export function getThemeCss(): { id: string; css: string }[] {
	const entries: { id: string; css: string }[] = [];
	for (const [path, css] of Object.entries(themeCssModules)) {
		const match = THEME_CSS_PATH.exec(path);
		if (!match) continue;
		const trimmed = css.trim();
		if (!trimmed) continue;
		entries.push({ id: match[1], css: trimmed });
	}
	return entries;
}

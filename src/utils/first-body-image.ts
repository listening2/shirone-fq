/**
 * 从文章原始正文（Markdown/MDX 源码）提取第一张图片地址，
 * 作为未设置 frontmatter `image` 时列表卡片的兜底封面（Firefly 风格）。
 *
 * 支持两种写法，取正文中出现最早的一张：
 * - Markdown 图片：`![alt](src)`（兼容 `![alt](src "title")`、`![alt](<src>)` 与
 *   自定义尺寸后缀 `![alt](src){width=...}`）
 * - HTML 图片：`<img src="...">`（含 MDX 内联写法）
 *
 * `data:`、锚点等非资源地址会被跳过；返回 undefined 表示正文没有可用图片。
 * 仅在构建期对 entry.body 做一次正则扫描，无运行时开销。
 */

const MARKDOWN_IMAGE_PATTERN =
	/!\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+["'][^)]*["'])?\s*\)/g;
const HTML_IMAGE_PATTERN = /<img\b[^>]*?\bsrc=["']([^"']+)["']/gi;

export function extractFirstImageFromBody(
	body: string | undefined,
): string | undefined {
	if (!body) {
		return undefined;
	}

	let best: { index: number; src: string } | undefined;

	for (const match of body.matchAll(MARKDOWN_IMAGE_PATTERN)) {
		const src = normalizeCandidate(match[1]);
		if (src && (!best || match.index < best.index)) {
			best = { index: match.index, src };
		}
	}

	for (const match of body.matchAll(HTML_IMAGE_PATTERN)) {
		const src = normalizeCandidate(match[1]?.replace(/&amp;/g, "&"));
		if (src && (!best || match.index < best.index)) {
			best = { index: match.index, src };
		}
	}

	return best?.src;
}

function normalizeCandidate(src: string | undefined): string | undefined {
	const trimmed = src?.trim();
	if (!trimmed || trimmed.startsWith("data:") || trimmed.startsWith("#")) {
		return undefined;
	}
	return trimmed;
}

// 校验主题包（src/themes）的登记与样式作用域（主题包化契约）。
// 用法：node scripts/check-themes.mjs
// 通过 = 每个主题 id 与文件夹名一致、id 不重复、_template 完整、
//        每条顶层选择器都带 html[data-site-theme="<id>"] 前缀。
// 失败 = 打印问题清单并 exit 1。

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const themesDir = join(root, "src", "themes");

const errors = [];
const fail = (msg) => errors.push(msg);

/** 去掉注释，避免注释里的示例选择器被误判（也不影响花括号扫描）。 */
function stripComments(css) {
	return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** 按顶层逗号切分选择器列表（忽略括号 / 方括号内的逗号）。 */
function splitSelectors(prelude) {
	const parts = [];
	let depth = 0;
	let current = "";
	for (const ch of prelude) {
		if (ch === "(" || ch === "[") depth += 1;
		else if (ch === ")" || ch === "]") depth -= 1;
		if (ch === "," && depth === 0) {
			parts.push(current.trim());
			current = "";
			continue;
		}
		current += ch;
	}
	if (current.trim()) parts.push(current.trim());
	return parts;
}

/**
 * 收集所有规则选择器。at-rule 块（@media / @supports / @layer）递归进入，
 * 语句型 at-rule（@import / @charset / @namespace）没有块，自然跳过。
 */
function collectRules(css, onRule) {
	const source = stripComments(css);
	let index = 0;
	let preludeStart = 0;
	while (index < source.length) {
		const ch = source[index];
		if (ch === ";") {
			preludeStart = index + 1;
		} else if (ch === "{") {
			const prelude = source.slice(preludeStart, index).trim();
			let depth = 1;
			let end = index + 1;
			while (end < source.length && depth > 0) {
				if (source[end] === "{") depth += 1;
				else if (source[end] === "}") depth -= 1;
				end += 1;
			}
			const body = source.slice(index + 1, end - 1);
			if (prelude.startsWith("@")) {
				collectRules(body, onRule);
			} else if (prelude) {
				onRule(prelude);
			}
			index = end;
			preludeStart = end;
			continue;
		}
		index += 1;
	}
}

const THEME_PREFIX = /^html(?::root)?\[data-site-theme="([^"]+)"\]/;

if (!existsSync(themesDir)) {
	// 主题功能尚未安装时跳过，保持零额外负担。
	console.log("○ 未找到 src/themes，跳过主题校验");
	process.exit(0);
}

const templateDir = join(themesDir, "_template");
if (!existsSync(templateDir)) {
	fail("缺少主题模板 src/themes/_template");
} else {
	for (const file of ["theme.ts", "theme.css"]) {
		if (!existsSync(join(templateDir, file))) {
			fail(`主题模板缺少 ${file}：src/themes/_template/${file}`);
		}
	}
}

const themeIds = new Set();
const folders = readdirSync(themesDir, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
	.map((entry) => entry.name);

for (const folder of folders) {
	const dir = join(themesDir, folder);
	const manifestPath = join(dir, "theme.ts");
	if (!existsSync(manifestPath)) {
		fail(`主题缺少 theme.ts：src/themes/${folder}/theme.ts`);
		continue;
	}

	const source = readFileSync(manifestPath, "utf8");
	const id = source.match(/\bid\s*:\s*["'`]([^"'`]+)["'`]/)?.[1];
	if (!id) {
		fail(`theme.ts 未声明 id：src/themes/${folder}/theme.ts`);
		continue;
	}
	if (id !== folder) {
		fail(`主题 id 与文件夹名不一致：${id} ≠ ${folder}`);
	}
	if (themeIds.has(id)) {
		fail(`主题 id 重复：${id}`);
	}
	themeIds.add(id);

	const cssPath = join(dir, "theme.css");
	if (!existsSync(cssPath)) continue;
	const css = readFileSync(cssPath, "utf8");
	collectRules(css, (prelude) => {
		for (const selector of splitSelectors(prelude)) {
			const match = THEME_PREFIX.exec(selector);
			if (!match) {
				fail(
					`主题样式缺少作用域前缀：src/themes/${folder}/theme.css → "${selector}"（每条选择器都必须以 html[data-site-theme="${folder}"] 开头）`,
				);
			} else if (match[1] !== folder) {
				fail(
					`主题样式前缀 id 不匹配：src/themes/${folder}/theme.css 使用了 "${match[1]}"`,
				);
			}
		}
	});
}

/** 递归列出目录下所有文件（绝对路径）。 */
function walkFiles(dir, out = []) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) walkFiles(full, out);
		else out.push(full);
	}
	return out;
}

// 主题之间不得互相 import：换肤不能依赖另一个主题的实现，否则复制文件夹即失效。
const THEME_IMPORT_RE =
	/(?:from\s+|import\s*\(\s*|@import\s+|url\s*\(\s*)["'`]([^"'`]+)["'`]/g;
const ALIAS_THEME_RE = /^@\/themes\/([^/]+)/;

for (const folder of folders) {
	const ownDir = join(themesDir, folder);
	for (const file of walkFiles(ownDir)) {
		if (!/\.(ts|astro|svelte|js|mjs|css)$/.test(file)) continue;
		const content = readFileSync(file, "utf8");
		for (const match of content.matchAll(THEME_IMPORT_RE)) {
			const spec = match[1];
			const aliasId = ALIAS_THEME_RE.exec(spec)?.[1];
			if (aliasId && aliasId !== folder) {
				fail(
					`主题不得跨主题 import：src/themes/${folder}/${relative(ownDir, file).replaceAll("\\", "/")} → ${spec}`,
				);
				continue;
			}
			if (!spec.startsWith(".")) continue;
			const resolved = resolve(dirname(file), spec);
			for (const other of folders) {
				if (other === folder) continue;
				if (resolved.startsWith(`${join(themesDir, other)}/`)) {
					fail(
						`主题不得跨主题 import：src/themes/${folder}/${relative(ownDir, file).replaceAll("\\", "/")} → ${other}`,
					);
				}
			}
		}
	}
}

if (errors.length) {
	console.error(`\n发现 ${errors.length} 处主题不一致：`);
	for (const error of errors) console.error(`✗ ${error}`);
	process.exit(1);
}

console.log(
	`✓ 主题校验通过（${themeIds.size} 个主题：${[...themeIds].join(", ")}）`,
);

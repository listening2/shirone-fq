import type { SiteThemeDefinition } from "../types";

/**
 * 新主题模板：复制整个 `_template` 文件夹为 `src/themes/<新 id>/`，
 * 把下面的 id / name 改成新主题，再按需修改 theme.css。
 *
 * 登记是自动的（registry 收集 `src/themes/<id>/theme.ts`），无需改任何代码；
 * 改完跑 `pnpm.cmd check:manifest` 会校验 id 与文件夹名是否一致。
 * 以 `_` 开头的目录不参与登记，因此本模板不会被当成主题。
 */
export default {
	id: "template",
	name: "Template",
} satisfies SiteThemeDefinition;

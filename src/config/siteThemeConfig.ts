import type { SiteThemeConfig } from "@/types/siteThemeConfig";
import { withUserConfig } from "../utils/config-overlay.ts";

/**
 * 站点主题：主题包位于 `src/themes/`，一文件夹一主题。
 * 内容仓 `config/site-theme.yaml` 只需写要覆盖的键。
 */
export const siteThemeConfig: SiteThemeConfig = withUserConfig("siteTheme", {
	enable: false,
	defaultTheme: "default",
});

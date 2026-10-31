import { siteThemeConfig } from "@/config/siteThemeConfig";
import { getTheme, isSiteThemeId, THEMES } from "@/themes/registry";
import {
	applyWallpaperModeToDocument,
	getStoredWallpaperMode,
} from "./setting-utils";

/** 访客主题偏好键（与壁纸、布局等偏好并列） */
export const SITE_THEME_KEY = "site-theme";
export const SITE_THEME_CHANGE_EVENT = "site-theme:change";

/** 站点是否启用主题切换；关闭时忽略访客残留偏好 */
export function isSiteThemeEnabled(): boolean {
	return siteThemeConfig.enable === true;
}

/** 站点默认主题（配置非法时回退登记表第一项，保证永远可用） */
export function defaultSiteTheme(): string {
	const configured = siteThemeConfig.defaultTheme;
	if (isSiteThemeId(configured)) return configured;
	return THEMES[0]?.id ?? "default";
}

export function getStoredSiteTheme(): string {
	if (!isSiteThemeEnabled()) return defaultSiteTheme();
	const stored =
		typeof localStorage === "undefined"
			? null
			: localStorage.getItem(SITE_THEME_KEY);
	return isSiteThemeId(stored) ? stored : defaultSiteTheme();
}

export function storeSiteTheme(id: string): void {
	localStorage.setItem(SITE_THEME_KEY, id);
}

/** 该主题是否要求纯色背景（不写回访客的壁纸偏好） */
export function themeHidesWallpaper(id: string): boolean {
	return getTheme(id)?.wallpaper === "none";
}

/**
 * 运行时应用主题。
 *
 * 壁纸通过既有的 `applyWallpaperModeToDocument` 切换：它自带几何过渡窗口并派发
 * 壁纸事件，BannerStage / TopAppBar 会自行同步，主题模块无需感知横幅实现。
 * 主题要求纯色时只改运行时属性，访客保存的壁纸模式保持原值，切回即恢复。
 */
export function applySiteTheme(id: string): void {
	const themeId = isSiteThemeId(id) ? id : defaultSiteTheme();
	document.documentElement.dataset.siteTheme = themeId;
	applyWallpaperModeToDocument(
		themeHidesWallpaper(themeId) ? "none" : getStoredWallpaperMode(),
	);
	window.dispatchEvent(
		new CustomEvent(SITE_THEME_CHANGE_EVENT, {
			detail: { theme: themeId },
		}),
	);
}

import type { SiteThemeDefinition } from "../types";

/**
 * Mmz 风格皮肤：零饱和度中性色表面 + 无阴影 + 细描边；照片与插画保留原色。
 *
 * 只做视觉覆盖，不改任何结构；壁纸关闭（访客原有壁纸偏好不受影响，
 * 切回默认主题会自动恢复）。样式见同目录 `theme.css`。
 */
export default {
	id: "mmz",
	name: "Mmz",
	icon: "material-symbols:contrast",
	wallpaper: "none",
} satisfies SiteThemeDefinition;

/**
 * 开源项目数据源
 * 用于 /projects/ 页面展示
 */

export type ProjectPhase = "shipped" | "building" | "exploring";

export interface ProjectItem {
	enable?: boolean;
	key: string;
	title: string;
	summary: string;
	category: string;
	phase: ProjectPhase;
	technologies: string[];
	icon?: string;
	cover?: string;
	coverAlt?: string;
	featured?: boolean;
	website?: string;
	repository?: string;
	year?: string;
}

export const projectsData: ProjectItem[] = [
	{
		key: "shirone",
		title: "Shirone",
		summary:
			"An Astro blog theme shaped around an M3E component system, expressive content, and resilient client navigation.",
		category: "theme",
		phase: "building",
		technologies: ["Astro", "Svelte", "TypeScript", "Tailwind CSS"],
		icon: "material-symbols:deployed-code-outline-rounded",
		cover: "/assets/projects/shirone.webp",
		coverAlt: "Shirone theme homepage preview",
		featured: true,
		repository: "https://github.com/LyraVoid/Shirone",
		year: "2026",
	},
	{
		key: "folkpatch",
		title: "FolkPatch",
		summary: "A kernel-level root solution for Android, built on APatch.",
		category: "android",
		phase: "building",
		technologies: ["Kotlin", "APatch", "Android"],
		icon: "material-symbols:terminal-rounded",
		repository: "https://github.com/LyraVoid/FolkPatch",
	},
	{
		key: "kernelpatch",
		title: "KernelPatch",
		summary:
			"A kernel patch framework that powers APatch-style root on Android by loading code into the running kernel.",
		category: "android",
		phase: "shipped",
		technologies: ["C", "Linux Kernel", "Android"],
		icon: "material-symbols:extension-outline-rounded",
		repository: "https://github.com/lyravoid/KernelPatch",
	},
];

export function getProjectsList(): ProjectItem[] {
	return projectsData;
}

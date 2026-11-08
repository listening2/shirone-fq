/**
 * 友情链接数据源（由线上 /friends/ 页面同步），用于 /friends/ 页面展示.
 * owner 标记站长卡片，featured 标记推荐卡片，linkpage 用于 /friends.json 输出.
 */

export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
	linkpage?: string;
	owner?: boolean;
	featured?: boolean;
}

export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "Listening",
		imgurl: "https://listeningimg.dpdns.org/file/1793458535542_avatar.webp",
		desc: "很想你.",
		siteurl: "https://listening.dpdns.org/",
		tags: ["Blog"],
		linkpage: "https://blog.fqzlr.top/friends/",
		owner: true,
	},
	{
		id: 2,
		title: "番茄主理人",
		imgurl: "https://q1.qlogo.cn/g?b=qq&nk=20447289&s=640",
		desc: "躬身入局，心为主理，行有尺度，自持本心.",
		siteurl: "https://blog.fqzlr.top/",
		tags: ["大佬"],
		linkpage: "https://blog.fqzlr.top/friends/",
		featured: true,
	},
];

export function getFriendsList(): FriendItem[] {
	return friendsData;
}

export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

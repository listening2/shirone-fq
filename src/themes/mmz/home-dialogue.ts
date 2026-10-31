/**
 * 左下角角色的想法气泡：角色入场后自动冒第一句，点角色或气泡换下一句（末句后从头循环）。
 * 气泡不自动收起：收起只有「滚离这段剧情」和「点开下一句」两种途径。
 * 角色本体只是一张可按压的图：按下压扁，松手连弹几下回位。
 * 右下角返回顶部按钮也由这里接管，避免页面脚本再挂一份滚动监听。
 */

/** 松手时的连弹回位，transform 与按住的 scale 叠乘，互不覆盖 */
const BOUNCE_KEYFRAMES: Keyframe[] = [
	// 起手就是按住的那一压，接得上 CSS scale，松手瞬间不会弹回原形
	{ offset: 0, transform: "scale(1.07, 0.9)" },
	{ offset: 0.18, transform: "scale(1.16, 0.8)" },
	{ offset: 0.42, transform: "scale(0.92, 1.08)" },
	{ offset: 0.62, transform: "scale(1.06, 0.94)" },
	{ offset: 0.82, transform: "scale(0.98, 1.02)" },
	{ offset: 1, transform: "scale(1, 1)" },
];
const BOUNCE_DURATION = 560;
const BOUNCE_EASING = "cubic-bezier(0.36, 0.9, 0.32, 1)";
const GREETING_DELAY = 420;

export type HomeDialogueController = {
	setSceneVisible: (visible: boolean) => void;
	setGreetingVisible: (visible: boolean) => void;
	destroy: () => void;
};

function parseLines(root: HTMLElement): string[] {
	const node = root.querySelector<HTMLScriptElement>("[data-dialogue-lines]");
	try {
		const raw: unknown = JSON.parse(node?.textContent ?? "[]");
		if (!Array.isArray(raw)) return [];
		return raw.filter(
			(line): line is string => typeof line === "string" && line.length > 0,
		);
	} catch {
		return [];
	}
}

export function mountHomeDialogue(
	root: HTMLElement | null,
): HomeDialogueController {
	const anchor = root?.querySelector<HTMLElement>("[data-dialogue-anchor]");
	const bubble = root?.querySelector<HTMLElement>("[data-dialogue-bubble]");
	const sticker = root?.querySelector<HTMLElement>("[data-mmz-sticker]");
	const backtop = root?.querySelector<HTMLButtonElement>("[data-mmz-backtop]");
	const lines = root ? parseLines(root) : [];
	if (!root || !anchor || !bubble || lines.length === 0) {
		return {
			setSceneVisible: () => undefined,
			setGreetingVisible: () => undefined,
			destroy: () => undefined,
		};
	}

	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	const abortController = new AbortController();
	const signal = abortController.signal;
	const soundSrc = root.dataset.dialogueSound ?? "";
	let voice: HTMLAudioElement | null = null;
	let sceneVisible = false;
	let greetingVisible = false;
	let nextIndex = 0;
	let isPressed = false;
	let greetingTimer = 0;

	const close = () => {
		bubble.dataset.open = "false";
	};

	/** 按住的形变交给 CSS scale；松手时 scale 立即交还，连弹由 WAAPI 接手 */
	const setPressed = (pressed: boolean) => {
		if (!sticker || isPressed === pressed) return;
		isPressed = pressed;
		if (pressed) {
			sticker.dataset.pressed = "true";
			return;
		}
		delete sticker.dataset.pressed;
		if (!reducedMotion.matches) {
			sticker.animate(BOUNCE_KEYFRAMES, {
				duration: BOUNCE_DURATION,
				easing: BOUNCE_EASING,
			});
		}
	};

	const showNext = () => {
		const line = lines[nextIndex];
		nextIndex = (nextIndex + 1) % lines.length;
		bubble.textContent = line;
		bubble.dataset.open = "true";
		// 每句都从角色头顶重新「冒」一次；transition 做不到从已打开的状态重播，交给 WAAPI
		if (!reducedMotion.matches) {
			bubble.animate(
				[
					{ opacity: 0, scale: 0.55 },
					{ opacity: 1, scale: 1 },
				],
				{ duration: 420, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
			);
		}
	};

	anchor.addEventListener(
		"pointerdown",
		(event) => {
			// 右键和副键不算按压，否则右键菜单也会让角色塌一下
			if (!event.isPrimary || event.button !== 0) return;
			if (!sceneVisible) return;
			setPressed(true);
		},
		{ signal },
	);
	// 松手常常发生在角色之外（按住后拖开、滚走），由 window 收口，避免卡在压扁状态
	window.addEventListener("pointerup", () => setPressed(false), {
		passive: true,
		signal,
	});
	window.addEventListener("pointercancel", () => setPressed(false), {
		passive: true,
		signal,
	});

	/* 点击音效与对话框同拍：音频只在第一次点击时创建，没点击过就不发请求；
	   播放失败（自动播放策略、音频缺失）静默忽略，不影响换台词 */
	const playVoice = () => {
		if (!soundSrc) return;
		if (!voice) {
			voice = new Audio(soundSrc);
			voice.preload = "auto";
			voice.volume = 0.55;
		}
		voice.currentTime = 0;
		void voice.play().catch(() => undefined);
	};

	anchor.addEventListener(
		"click",
		() => {
			if (!sceneVisible) return;
			playVoice();
			showNext();
		},
		{ signal },
	);

	const onBacktop = () => {
		window.scrollTo({
			top: 0,
			behavior: reducedMotion.matches ? "auto" : "smooth",
		});
	};
	backtop?.addEventListener("click", onBacktop, { signal });
	const syncBacktop = () => {
		if (!backtop) return;
		const visible = window.scrollY > window.innerHeight * 0.8;
		backtop.dataset.visible = String(visible);
	};
	if (backtop) {
		syncBacktop();
		window.addEventListener("scroll", syncBacktop, { passive: true, signal });
		window.addEventListener("resize", syncBacktop, { signal });
	}

	const clearGreeting = () => {
		window.clearTimeout(greetingTimer);
		greetingTimer = 0;
	};

	return {
		setSceneVisible(visible) {
			if (sceneVisible === visible) return;
			sceneVisible = visible;
			root.dataset.sceneVisible = String(visible);
			if (!visible) {
				clearGreeting();
				setPressed(false);
				close();
			}
		},
		setGreetingVisible(visible) {
			if (greetingVisible === visible) return;
			greetingVisible = visible;
			clearGreeting();
			if (!visible) {
				close();
				return;
			}
			nextIndex = 0;
			// 角色刚离开底边就打招呼，和升起动作叠在一起才不像两段独立动画
			if (sceneVisible) {
				greetingTimer = window.setTimeout(() => {
					if (!signal.aborted && sceneVisible) showNext();
				}, GREETING_DELAY);
			}
		},
		destroy() {
			abortController.abort();
			clearGreeting();
			close();
			bubble.textContent = "";
			root.dataset.sceneVisible = "false";
			delete backtop?.dataset.visible;
			greetingVisible = false;
			nextIndex = 0;
			isPressed = false;
			voice?.pause();
			voice = null;
			if (sticker) delete sticker.dataset.pressed;
			if (backtop) delete backtop.dataset.visible;
		},
	};
}

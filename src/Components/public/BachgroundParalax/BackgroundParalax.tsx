import React, {useCallback, useEffect, useMemo, useRef} from "react";
import {BaseLayer, OverlayLayer, OverlayWrap, Root} from "./styled";

export type TLayeredParallaxBackgroundProps = {
    baseImageSrc?: string;
    overlayImageSrc?: string;
    maxOffset?: number;
    ease?: number;
    baseSize?: React.CSSProperties["backgroundSize"];
    basePosition?: React.CSSProperties["backgroundPosition"];
    baseWidth?: React.CSSProperties["width"];
    baseHeight?: React.CSSProperties["height"];
    overlaySize?: React.CSSProperties["backgroundSize"];
    overlayPosition?: React.CSSProperties["backgroundPosition"];
    overlayOpacity?: number;
    overlayWidth?: React.CSSProperties["width"];
    overlayHeight?: React.CSSProperties["height"];
    onRequestGyroPermission?: (request: () => Promise<boolean>) => void;
    motionMode?: "auto" | "pointer" | "gyro";
    backgroundColor?: React.CSSProperties["backgroundColor"];
    invertOverlay?: boolean
};

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}

export function LayeredParallaxBackground({
      baseImageSrc,
      overlayImageSrc,
      maxOffset = 18,
      ease = 0.08,
      baseHeight,
      baseWidth,
      baseSize = "cover",
      basePosition = "center",
      overlaySize = "contain",
      overlayPosition = "center",
      overlayOpacity = 1,
      overlayWidth = "min(900px, 80vw)",
      overlayHeight = "min(900px, 80vw)",
      onRequestGyroPermission,
      motionMode = "auto",
      backgroundColor = "black",
      invertOverlay = false
}: TLayeredParallaxBackgroundProps) {
    const layerRef = useRef<HTMLDivElement | null>(null);

    const target = useRef({ x: 0, y: 0 });
    const current = useRef({ x: 0, y: 0 });
    const rafId = useRef<number | null>(null);

    const canUseGyro = useMemo(() => {
        if (typeof window === "undefined") return false;
        return "DeviceOrientationEvent" in window;
    }, []);

    const isProbablyMobile = useMemo(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia?.("(pointer: coarse)").matches ?? false;
    }, []);

    const tick = useCallback(() => {
        if (rafId.current != null) return;

        const loop = () => {
            rafId.current = window.requestAnimationFrame(() => {
                const dx = target.current.x - current.current.x;
                const dy = target.current.y - current.current.y;

                current.current.x += dx * ease;
                current.current.y += dy * ease;

                const el = layerRef.current;
                if (el) {
                    el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
                }

                if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
                    if (rafId.current != null) window.cancelAnimationFrame(rafId.current);
                    rafId.current = null;
                    return;
                }

                loop();
            });
        };

        loop();
    }, [ease]);

    const setTargetFromNormalized = useCallback(
        (nx: number, ny: number) => {
            // nx, ny ожидаются в диапазоне -1..1
            target.current.x = clamp(nx, -1, 1) * maxOffset;
            target.current.y = clamp(ny, -1, 1) * maxOffset;
            tick();
        },
        [maxOffset, tick]
    );

    const requestGyroPermission = useCallback(async () => {
        try {
            const anyDOE = DeviceOrientationEvent as any;
            if (typeof anyDOE?.requestPermission === "function") {
                const res = await anyDOE.requestPermission();
                return res === "granted";
            }
            return true;
        } catch {
            return false;
        }
    }, []);

    useEffect(() => {
        if (!overlayImageSrc) return;

        const resolvedMode: "pointer" | "gyro" = (() => {
            if (motionMode === "pointer") return "pointer";
            if (motionMode === "gyro") return "gyro";
            return isProbablyMobile && canUseGyro ? "gyro" : "pointer";
        })();

        const onPointerMove = (e: PointerEvent) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
            const ny = (e.clientY / window.innerHeight) * 2 - 1; // -1..1
            setTargetFromNormalized(nx, ny);
        };

        const MAX_TILT_BETA = 25;  // чем меньше — тем чувствительнее
        const MAX_TILT_GAMMA = 25;

        const onDeviceOrientation = (e: DeviceOrientationEvent) => {
            const beta = e.beta ?? 0;   // front/back
            const gamma = e.gamma ?? 0; // left/right

            const nx = clamp(gamma / MAX_TILT_GAMMA, -1, 1);
            const ny = clamp(beta / MAX_TILT_BETA, -1, 1);

            setTargetFromNormalized(nx, -ny);
        };

        let cleanup = () => {};

        if (resolvedMode === "pointer") {
            window.addEventListener("pointermove", onPointerMove, { passive: true });
            cleanup = () => {
                window.removeEventListener("pointermove", onPointerMove);
            };
        } else {
            // Гироскоп. На iOS нужно разрешение через user gesture.
            // Мы отдаём наружу функцию запроса (чтобы вы повесили её на кнопку).
            onRequestGyroPermission?.(requestGyroPermission);

            // Пытаемся подписаться сразу (Android/часть браузеров это позволит).
            window.addEventListener("deviceorientation", onDeviceOrientation, true);

            cleanup = () => {
                window.removeEventListener("deviceorientation", onDeviceOrientation, true);
            };
        }

        return () => {
            cleanup();
            if (rafId.current != null) window.cancelAnimationFrame(rafId.current);
            rafId.current = null;
        };
    }, [
        overlayImageSrc,
        canUseGyro,
        isProbablyMobile,
        motionMode,
        onRequestGyroPermission,
        requestGyroPermission,
        setTargetFromNormalized,
    ]);

    const baseStyle: React.CSSProperties = baseImageSrc
        ? {
            backgroundImage: `url(${baseImageSrc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: baseSize,
            backgroundPosition: basePosition,
            width: baseWidth ? baseWidth : undefined,
            height: baseHeight ? baseHeight : undefined,
            zIndex: invertOverlay ? 1 : undefined
        }
        : { backgroundColor: "#fff" };

    const overlayStyle: React.CSSProperties | undefined = overlayImageSrc
        ? {
            width: overlayWidth,
            height: overlayHeight,
            opacity: overlayOpacity,
            backgroundImage: `url(${overlayImageSrc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: overlaySize,
            backgroundPosition: overlayPosition,
        }
        : undefined;

    return (
        <Root className={"back-parallax"} aria-hidden="true">
            <BaseLayer style={baseStyle} />
            {overlayImageSrc ? (
                <OverlayWrap backgroundColor={backgroundColor}>
                    <OverlayLayer className={"overlay"} ref={layerRef} style={overlayStyle} />
                </OverlayWrap>
            ) : null}
        </Root>
    );
}

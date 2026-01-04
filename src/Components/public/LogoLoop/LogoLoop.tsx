import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './LogoLoop.css';

export type LogoItem =
    | {
    node: React.ReactNode;
    href?: string;
    title?: string;
    ariaLabel?: string;
}
    | {
    src: string;
    alt?: string;
    href?: string;
    title?: string;
    srcSet?: string;
    sizes?: string;
    width?: number;
    height?: number;
};

export interface LogoLoopProps {
    logos: LogoItem[];
    speed?: number;
    direction?: 'left' | 'right' | 'up' | 'down';
    width?: number | string;
    logoHeight?: number;
    gap?: number;
    pauseOnHover?: boolean;
    hoverSpeed?: number;
    fadeOut?: boolean;
    fadeOutColor?: string;
    scaleOnHover?: boolean;
    renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
    ariaLabel?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (item: LogoItem) => void;
}

const ANIMATION_CONFIG = {
    SMOOTH_TAU: 0.25,
    MIN_COPIES: 2,
    COPY_HEADROOM: 2
} as const;

const toCssLength = (value?: number | string): string | undefined =>
    typeof value === 'number' ? `${value}px` : value ?? undefined;


const useResizeObserver = (
    callback: () => void,
    elements: Array<React.RefObject<Element | null>>,
    dependencies: React.DependencyList
) => {
    useEffect(() => {
        let raf: number | null = null;

        const schedule = () => {
            if (raf !== null) return;
            raf = requestAnimationFrame(() => {
                raf = null;
                callback();
            });
        };

        if (!window.ResizeObserver) {
            const handleResize = () => schedule();
            window.addEventListener('resize', handleResize, { passive: true });
            schedule();
            return () => {
                window.removeEventListener('resize', handleResize);
                if (raf !== null) cancelAnimationFrame(raf);
            };
        }

        const observers = elements.map(ref => {
            const el = ref.current;
            if (!el) return null;
            const ro = new ResizeObserver(() => schedule());
            ro.observe(el);
            return ro;
        });

        schedule();

        return () => {
            observers.forEach(o => o?.disconnect());
            if (raf !== null) cancelAnimationFrame(raf);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
};

const useImageLoader = (
    seqRef: React.RefObject<HTMLUListElement | null>,
    onLoad: () => void,
    dependencies: React.DependencyList
) => {
    useEffect(() => {
        const seqEl = seqRef.current;
        const images = seqEl?.querySelectorAll('img') ?? [];

        if (images.length === 0) {
            onLoad();
            return;
        }

        let remaining = images.length;
        const done = () => {
            remaining -= 1;
            if (remaining <= 0) onLoad();
        };

        images.forEach(img => {
            const htmlImg = img as HTMLImageElement;
            if (htmlImg.complete) {
                done();
            } else {
                htmlImg.addEventListener('load', done, { once: true });
                htmlImg.addEventListener('error', done, { once: true });
            }
        });

        return () => {
            images.forEach(img => {
                img.removeEventListener('load', done);
                img.removeEventListener('error', done);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
};

const useAnimationLoop = (
    trackRef: React.RefObject<HTMLDivElement | null>,
    params: {
        targetVelocity: number;
        seqWidth: number;
        seqHeight: number;
        isHovered: boolean;
        hoverSpeed?: number;
        isVertical: boolean;
    }
) => {
    const rafRef = useRef<number | null>(null);
    const lastTsRef = useRef<number | null>(null);
    const offsetRef = useRef(0);
    const velRef = useRef(0);

    const paramsRef = useRef(params);
    useEffect(() => {
        paramsRef.current = params;
    }, [params]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const animate = (ts: number) => {
            if (lastTsRef.current === null) lastTsRef.current = ts;

            const dt = Math.max(0, ts - lastTsRef.current) / 1000;
            lastTsRef.current = ts;

            const p = paramsRef.current;
            const seqSize = p.isVertical ? p.seqHeight : p.seqWidth;

            const target = p.isHovered && p.hoverSpeed !== undefined ? p.hoverSpeed : p.targetVelocity;
            const easing = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
            velRef.current += (target - velRef.current) * easing;

            if (seqSize > 0) {
                let nextOffset = offsetRef.current + velRef.current * dt;
                nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
                offsetRef.current = nextOffset;

                track.style.transform = p.isVertical
                    ? `translate3d(0, ${-offsetRef.current}px, 0)`
                    : `translate3d(${-offsetRef.current}px, 0, 0)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            lastTsRef.current = null;
        };
    }, [trackRef]);
};

export const LogoLoop = React.memo<LogoLoopProps>(
    ({
         logos,
         speed = 120,
         direction = 'left',
         width = '100%',
         logoHeight = 28,
         gap = 32,
         pauseOnHover,
         hoverSpeed,
         fadeOut = false,
         fadeOutColor,
         scaleOnHover = false,
         renderItem,
         ariaLabel = 'logos',
         className,
         style,
         onClick,
     }) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const trackRef = useRef<HTMLDivElement>(null);
        const seqRef = useRef<HTMLUListElement>(null);

        const [seqWidth, setSeqWidth] = useState(0);
        const [seqHeight, setSeqHeight] = useState(0);
        const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
        const [isHovered, setIsHovered] = useState(false);

        const isVertical = direction === 'up' || direction === 'down';

        const effectiveHoverSpeed = useMemo(() => {
            if (hoverSpeed !== undefined) return hoverSpeed;
            if (pauseOnHover === true) return 0;
            return undefined;
        }, [hoverSpeed, pauseOnHover]);

        const targetVelocity = useMemo(() => {
            const magnitude = Math.abs(speed);
            const dirMult = isVertical ? (direction === 'up' ? 1 : -1) : direction === 'left' ? 1 : -1;
            const sign = speed < 0 ? -1 : 1;
            return magnitude * dirMult * sign;
        }, [speed, direction, isVertical]);

        const updateDimensions = useCallback(() => {
            const containerEl = containerRef.current;
            const seqEl = seqRef.current;
            if (!containerEl || !seqEl) return;

            const rect = seqEl.getBoundingClientRect();
            const sequenceWidth = rect.width || 0;
            const sequenceHeight = rect.height || 0;

            if (isVertical) {
                if (sequenceHeight <= 0) return;

                const nextSeqH = Math.ceil(sequenceHeight);
                setSeqHeight(prev => (prev === nextSeqH ? prev : nextSeqH));

                const viewport = containerEl.clientHeight || nextSeqH;
                const nextCopies = Math.max(
                    ANIMATION_CONFIG.MIN_COPIES,
                    Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM
                );
                setCopyCount((prev:any) => (prev === nextCopies ? prev : nextCopies));
            } else {
                if (sequenceWidth <= 0) return;

                const nextSeqW = Math.ceil(sequenceWidth);
                setSeqWidth(prev => (prev === nextSeqW ? prev : nextSeqW));

                const viewport = containerEl.clientWidth || nextSeqW;
                const nextCopies = Math.max(
                    ANIMATION_CONFIG.MIN_COPIES,
                    Math.ceil(viewport / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM
                );
                setCopyCount((prev: any) => (prev === nextCopies ? prev : nextCopies));
            }
        }, [isVertical]);

        useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);

        useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);

        useAnimationLoop(trackRef, {
            targetVelocity,
            seqWidth,
            seqHeight,
            isHovered,
            hoverSpeed: effectiveHoverSpeed,
            isVertical
        });

        const cssVariables = useMemo(
            () =>
                ({
                    '--logoloop-gap': `${gap}px`,
                    '--logoloop-logoHeight': `${logoHeight}px`,
                    ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
                }) as React.CSSProperties,
            [gap, logoHeight, fadeOutColor]
        );

        const rootClassName = useMemo(
            () =>
                [
                    'logoloop',
                    isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
                    fadeOut && 'logoloop--fade',
                    scaleOnHover && 'logoloop--scale-hover',
                    className
                ]
                    .filter(Boolean)
                    .join(' '),
            [isVertical, fadeOut, scaleOnHover, className]
        );

        const handleMouseEnter = useCallback(() => {
            if (effectiveHoverSpeed !== undefined) setIsHovered(true);
        }, [effectiveHoverSpeed]);

        const handleMouseLeave = useCallback(() => {
            if (effectiveHoverSpeed !== undefined) setIsHovered(false);
        }, [effectiveHoverSpeed]);

        const renderLogoItem = useCallback(
            (item: LogoItem, key: React.Key) => {
                if (renderItem) {
                    return (
                        <li className="logoloop__item" key={key} role="listitem">
                            {renderItem(item, key)}
                        </li>
                    );
                }

                const isNodeItem = 'node' in item;

                const content = isNodeItem ? (
                    <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
            {item.node}
          </span>
                ) : (
                    <img
                        src={item.src}
                        srcSet={item.srcSet}
                        sizes={item.sizes}
                        width={item.width}
                        height={item.height}
                        alt={item.alt ?? ''}
                        title={item.title}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                    />
                );

                const itemAriaLabel = isNodeItem ? item.ariaLabel ?? item.title : item.alt ?? item.title;

                const wrapped = item.href ? (
                    <a
                        className="logoloop__link"
                        onClick={() => onClick && onClick(item)}
                        aria-label={itemAriaLabel || 'logo link'}

                        rel="noreferrer noopener"
                    >
                        {content}
                    </a>
                ) : (
                    content
                );

                return (
                    <li className="logoloop__item" key={key} role="listitem">
                        {wrapped}
                    </li>
                );
            },
            [renderItem, onClick]
        );

        const logoLists = useMemo(() => {
            const count = Math.max(ANIMATION_CONFIG.MIN_COPIES, copyCount);

            return Array.from({ length: count }, (_, copyIndex) => (
                <ul
                    className="logoloop__list"
                    key={`copy-${copyIndex}`}
                    role="list"
                    aria-hidden={copyIndex > 0}
                    ref={copyIndex === 0 ? seqRef : undefined}
                >
                    {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
                </ul>
            ));
        }, [copyCount, logos, renderLogoItem]);

        const containerStyle = useMemo(
            (): React.CSSProperties => ({
                width: isVertical ? (toCssLength(width) === '100%' ? undefined : toCssLength(width)) : toCssLength(width) ?? '100%',
                ...cssVariables,
                ...style
            }),
            [width, cssVariables, style, isVertical]
        );

        return (
            <div ref={containerRef} className={rootClassName} style={containerStyle} role="region" aria-label={ariaLabel}>
                <div className="logoloop__track" ref={trackRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {logoLists}
                </div>
            </div>
        );
    }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;

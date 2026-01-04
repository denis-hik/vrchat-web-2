import React, {CSSProperties, useEffect, useRef} from 'react';
import './SpotlightCard.css';

interface Position {
    x: number;
    y: number;
}

export interface SpotlightCardProps extends React.PropsWithChildren {
    className?: string;
    spotlightColor?: CSSProperties["color"];
    backgroundColor?: CSSProperties["color"];
    borderColor?: CSSProperties["color"];
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
     children,
     className = '',
     backgroundColor = "#111",
     spotlightColor = 'rgba(255, 255, 255, 0.25)',
     borderColor = "#222"
}) => {
    const divRef = useRef<HTMLDivElement>(null);

    const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        divRef.current.style.setProperty('--mouse-x', `${x}px`);
        divRef.current.style.setProperty('--mouse-y', `${y}px`);
        divRef.current.style.setProperty('--spotlight-color', spotlightColor);
    };

    useEffect(() => {
        if (!!divRef.current) {
            divRef.current.style.setProperty('--origin-color', backgroundColor);
            divRef.current.style.setProperty('--border-color', borderColor);
        }
    }, [divRef?.current]);

    return (
        <div ref={divRef} onMouseMove={handleMouseMove} className={`card-spotlight ${className}`}>
            {children}
        </div>
    );
};

export default SpotlightCard;

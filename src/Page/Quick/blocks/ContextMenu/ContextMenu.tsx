import React, {ReactNode, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {ContextMenuStyled} from "./styled";

export type ContextMenuOption = {
    label: string;
    icon: ReactNode;
    onClick: () => void;
};

type ContextMenuProps = {
    show: boolean;
    x: number;
    y: number;
    options: ContextMenuOption[];
};

export const ContextMenu = ({show, x, y, options}: ContextMenuProps) => {
    const [shouldRender, setShouldRender] = useState(show);

    useEffect(() => {
        if (show) {
            setShouldRender(true);
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setShouldRender(false);
        }, 180);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [show]);

    if (!shouldRender) {
        return null;
    }

    return createPortal(
        <ContextMenuStyled
            className={show ? "context-menu-enter" : "context-menu-exit"}
            style={{left: x, top: y}}
            onContextMenu={(event) => event.preventDefault()}
        >
            {options.map((option) => (
                <button
                    key={option.label}
                    type={"button"}
                    onClick={option.onClick}
                >
                    <span className={"context-menu-icon"}>{option.icon}</span>
                    <span>{option.label}</span>
                </button>
            ))}
        </ContextMenuStyled>,
        document.body
    );
};

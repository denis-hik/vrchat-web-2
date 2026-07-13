import React, {PropsWithChildren} from "react";
import {ActionLinkStyled, ActionLinkVariant} from "./styled";

type ActionLinkProps = PropsWithChildren<{
    href: string;
    variant?: ActionLinkVariant;
    className?: string;
    onContextMenu?: (event: React.MouseEvent, href: string) => void;
}>;

export const ActionLink = ({href, variant = "primary", className, children, onContextMenu}: ActionLinkProps) => {
    const handleClick = () => {
        window.open(href, "_blank", "noopener,noreferrer");
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        if (event.button !== 2) {
            return;
        }

        onContextMenu?.(event, href);
    };

    return (
        <ActionLinkStyled
            type={"button"}
            variant={variant}
            className={className}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
            onMouseDown={handleMouseDown}
        >
            {children}
        </ActionLinkStyled>
    );
};

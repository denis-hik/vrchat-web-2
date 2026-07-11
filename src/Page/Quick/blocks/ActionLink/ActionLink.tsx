import React, {PropsWithChildren} from "react";
import {ActionLinkStyled, ActionLinkVariant} from "./styled";

type ActionLinkProps = PropsWithChildren<{
    href: string;
    variant?: ActionLinkVariant;
    className?: string;
}>;

export const ActionLink = ({href, variant = "primary", className, children}: ActionLinkProps) => {
    return (
        <ActionLinkStyled
            href={href}
            target={"_blank"}
            rel={"noreferrer"}
            variant={variant}
            className={className}
        >
            {children}
        </ActionLinkStyled>
    );
};

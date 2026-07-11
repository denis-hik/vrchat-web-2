import styled, {css} from "styled-components";
import JinxXyTtf from "../../../../media/JinxXy.ttf";

export type ActionLinkVariant = "primary" | "secondary" | "vrchat" | "jinxxy";

const darkInner = css`
    background: rgba(16, 17, 23, 0.9);
`;

export const ActionLinkStyled = styled.a<{variant: ActionLinkVariant}>`
    position: relative;
    overflow: hidden;
    isolation: isolate;
    min-height: 38px;
    padding: 0 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    border: 1px solid transparent;
    color: #111219;
    background: #ffffff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 800;
    transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;

    ${({variant}) => (variant === "secondary" || variant === "jinxxy") && css`
        color: #ffffff;
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.18);
    `}

    ${({variant}) => variant === "jinxxy" && css`
        font-family: "JinxXy", "monaSans Fallback", sans-serif;
        font-feature-settings: "ss01", "ss03", "ss05", "ss08";
        font-size: 18px;
        font-variation-settings: normal;
        font-weight: normal;
        transition-duration: 0.2s;
        transition-property: color, background, border-color, text-shadow;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        -webkit-font-smoothing: antialiased;
        text-shadow: none;
    `}

    &:before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -2;
        opacity: 0;
        background: linear-gradient(115deg, #6d28ff, #d946ef, #8b5cf6, #22d3ee, #6d28ff);
        background-size: 260% 260%;
        transition: opacity 0.2s ease;
    }

    &:after {
        content: "";
        position: absolute;
        inset: 2px;
        z-index: -1;
        border-radius: inherit;
        background: #ffffff;
        transition: background 0.2s ease, opacity 0.2s ease;

        ${({variant}) => (variant === "secondary" || variant === "jinxxy") && darkInner}
    }

    &:hover {
        color: #ffffff;
        transform: translateY(-1px);
    }

    &:hover:before {
        opacity: 1;
        animation: quickGradientStroke 2.8s linear infinite;
    }

    &:hover:after {
        background: rgba(16, 17, 23, 0.88);
    }

    ${({variant}) => variant === "vrchat" && css`
        &:hover:after {
            opacity: 0;
        }
    `}

    ${({variant}) => variant === "jinxxy" && css`
        &:hover {
            text-shadow: rgb(7, 188, 204) 2px 2px 0px, rgb(230, 1, 192) 3px 3px 0px, rgb(233, 1, 154) 4px 4px 0px, rgb(244, 4, 104) 5px 5px 0px, rgb(244, 4, 104) 6px 6px 10px;
        }
    `}

    @keyframes quickGradientStroke {
        0% {
            background-position: 0% 50%;
        }
        100% {
            background-position: 260% 50%;
        }
    }

    @font-face {
        font-family: "JinxXy";
        src: url(${JinxXyTtf}) format("truetype");
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
`;

import styled from "styled-components";
import JinxXyTtf from "../../../../media/JinxXy.ttf";

export const ProfileCardStyled = styled.article`
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(16, 17, 23, 0.58);
    box-shadow: 0 20px 70px rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(18px);
    border-radius: 18px;
    overflow: hidden;

    .avatar-wrap {
        position: relative;
        min-height: 360px;
        background: rgba(255, 255, 255, 0.06);
    }

    .avatar-wrap img {
        width: 100%;
        height: 100%;
        min-height: 360px;
        display: block;
        object-fit: cover;
    }

    .avatar-wrap:after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 42%, rgba(10, 10, 13, 0.88) 100%);
    }

    .profile-body {
        position: relative;
        margin-top: -118px;
        padding: 0 22px 24px;
    }

    .status {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 28px;
        padding: 0 11px;
        border-radius: 999px;
        color: rgba(255, 255, 255, 0.9);
        background: rgba(255, 255, 255, 0.14);
        border: 1px solid rgba(255, 255, 255, 0.18);
        font-size: 13px;
        font-weight: 700;
    }

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #38f29b;
        box-shadow: 0 0 16px rgba(56, 242, 155, 0.88);
    }

    h1 {
        margin: 18px 0 8px;
        font-size: clamp(38px, 7vw, 72px);
        line-height: 0.92;
        letter-spacing: 0;
    }

    .lead {
        margin: 0;
        max-width: 620px;
        color: rgba(255, 255, 255, 0.76);
        font-size: 17px;
        line-height: 1.55;
    }

    .quick-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 22px;
    }

    .action-link {
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
    }

    .action-link.secondary {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .action-link:before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -2;
        opacity: 0;
        background: linear-gradient(115deg, #6d28ff, #d946ef, #8b5cf6, #22d3ee, #6d28ff);
        background-size: 260% 260%;
        transition: opacity 0.2s ease;
    }

    .action-link:after {
        content: "";
        position: absolute;
        inset: 2px;
        z-index: -1;
        border-radius: inherit;
        background: #ffffff;
        transition: background 0.2s ease;
    }

    .action-link.secondary:after,
    .action-link.jinxxy-link:after {
        background: rgba(16, 17, 23, 0.9);
    }

    .action-link:hover {
        color: #ffffff;
        transform: translateY(-1px);
    }

    .action-link:hover:before {
        opacity: 1;
        animation: quickGradientStroke 2.8s linear infinite;
    }

    .action-link:hover:after {
        background: rgba(16, 17, 23, 0.88);
    }

    .action-link.vrchat-link:hover:after {
        opacity: 0;
    }

    .action-link.jinxxy-link {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.18);
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
    }

    .action-link.jinxxy-link:hover {
        text-shadow: rgb(7, 188, 204) 2px 2px 0px, rgb(230, 1, 192) 3px 3px 0px, rgb(233, 1, 154) 4px 4px 0px, rgb(244, 4, 104) 5px 5px 0px, rgb(244, 4, 104) 6px 6px 10px;
    }

    @keyframes quickGradientStroke {
        0% {
            background-position: 0% 50%;
        }
        100% {
            background-position: 260% 50%;
        }
    }

    @media (max-width: 760px) {
        .avatar-wrap,
        .avatar-wrap img {
            min-height: 330px;
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

import styled from "styled-components";

export const ImageSlotLinkStyled = styled.a`
    position: relative;
    overflow: hidden;
    isolation: isolate;
    min-height: 148px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 14px;
    padding: 14px;
    display: flex;
    align-items: flex-end;
    color: rgba(255, 255, 255, 0.62);
    background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03)),
        rgba(16, 17, 23, 0.58);
    box-shadow: 0 20px 70px rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(18px);
    font-size: 13px;
    line-height: 1.35;
    text-decoration: none;
    transition: transform 0.2s ease, border-color 0.2s ease;

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
        inset: 0;
        background: linear-gradient(180deg, transparent 36%, rgba(0, 0, 0, 0.78) 100%);
        transition: inset 0.2s ease, background 0.2s ease;
    }

    img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.35s ease, filter 0.35s ease;
    }

    span {
        position: relative;
        z-index: 1;
        font-weight: 800;
        color: rgba(255, 255, 255, 0.9);
    }

    &[href] {
        cursor: pointer;
    }

    &[href]:hover {
        transform: translateY(-2px);
        border-color: transparent;
    }

    &[href]:hover:before {
        opacity: 1;
        animation: quickGradientStroke 2.8s linear infinite;
    }

    &[href]:hover:after {
        inset: 2px;
        border-radius: 12px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.04) 24%, rgba(0, 0, 0, 0.82) 100%);
    }

    &[href]:hover img {
        transform: scale(1.045);
        filter: saturate(1.12) contrast(1.05);
    }

    @keyframes quickGradientStroke {
        0% {
            background-position: 0% 50%;
        }
        100% {
            background-position: 260% 50%;
        }
    }

    @media (min-width: 1600px) and (min-aspect-ratio: 21/10) {
        min-height: 0;
        padding: 18px;
        font-size: 15px;
    }
`;

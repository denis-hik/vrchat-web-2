import styled from "styled-components";

export const SupportPageStyled = styled.main<{open: boolean}>`
    position: relative;
    box-sizing: border-box;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 88px 24px 32px;
    overflow: hidden;
    isolation: isolate;
    background:
        radial-gradient(circle at top, rgba(88, 126, 255, 0.16), transparent 42%),
        radial-gradient(circle at bottom, rgba(255, 255, 255, 0.08), transparent 36%),
        #05070d;

    .support-backdrop {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        backdrop-filter: ${({open}) => open ? "blur(28px) saturate(1.2)" : "blur(0px)"};
        background: ${({open}) => open ? "rgba(6, 10, 20, 0.34)" : "rgba(6, 10, 20, 0)"};
        transition: backdrop-filter 0.45s ease, background 0.45s ease;
    }

    .support-modal {
        position: relative;
        z-index: 1;
        width: min(100%, 560px);
        opacity: ${({open}) => open ? 1 : 0};
        transform: ${({open}) => open ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)"};
        transition: opacity 0.45s ease, transform 0.45s ease;
    }

    .glass-surface {
        width: 100% !important;
        height: auto !important;
        min-height: 360px;
        background: rgba(255, 255, 255, 0.08);
        box-shadow:
            0 28px 90px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.16);
    }

    .glass-surface__content {
        height: 100%;
        padding: 0;
        align-items: stretch;
        justify-content: stretch;
    }

    @media (max-width: 767px) {
        padding-left: 16px;
        padding-right: 16px;
    }
`;

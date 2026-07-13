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
    color: #ffffff;
    background: #0f1218;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

    *, :before, :after {
        box-sizing: border-box;
    }

    .support-backdrop {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        backdrop-filter: ${({open}) => open ? "blur(18px) saturate(1.08)" : "blur(0px)"};
        background: ${({open}) => open ? "rgba(8, 10, 15, 0.58)" : "rgba(8, 10, 15, 0)"};
        transition: backdrop-filter 0.45s ease, background 0.45s ease;
    }

    .support-modal {
        position: relative;
        z-index: 1;
        width: min(100%, 620px);
        opacity: ${({open}) => open ? 1 : 0};
        transform: ${({open}) => open ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)"};
        transition: opacity 0.45s ease, transform 0.45s ease;
    }

    .glass-surface {
        width: 100% !important;
        height: auto !important;
        min-height: 360px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 18px !important;
        background: rgba(16, 17, 23, 0.58);
        box-shadow:
            0 20px 70px rgba(0, 0, 0, 0.32),
            inset 0 1px 0 rgba(255, 255, 255, 0.16);
        backdrop-filter: blur(18px);
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

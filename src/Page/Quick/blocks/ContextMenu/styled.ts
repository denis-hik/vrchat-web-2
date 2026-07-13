import styled from "styled-components";

export const ContextMenuStyled = styled.div`
    position: fixed;
    z-index: 50;
    min-width: 178px;
    padding: 6px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(16, 17, 23, 0.94);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(18px);
    transform-origin: top left;
    will-change: opacity, transform, filter;

    &.context-menu-enter {
        animation: contextMenuIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    &.context-menu-exit {
        pointer-events: none;
        animation: contextMenuOut 0.16s cubic-bezier(0.7, 0, 0.84, 0) both;
    }

    button {
        width: 100%;
        min-height: 38px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        border: 0;
        border-radius: 8px;
        color: rgba(255, 255, 255, 0.9);
        background: transparent;
        font: inherit;
        font-size: 14px;
        font-weight: 700;
        text-align: left;
        cursor: pointer;
        transition: background 0.16s ease, color 0.16s ease;
    }

    button:hover {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.12);
    }

    .context-menu-icon {
        width: 18px;
        height: 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.74);
    }

    .context-menu-icon svg {
        width: 18px;
        height: 18px;
    }

    @keyframes contextMenuIn {
        from {
            opacity: 0;
            transform: translateY(-3px) scale(0.96);
            filter: blur(8px);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
        }
    }

    @keyframes contextMenuOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
        }
        to {
            opacity: 0;
            transform: translateY(-2px) scale(0.97);
            filter: blur(8px);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        &.context-menu-enter,
        &.context-menu-exit {
            animation: none;
        }
    }
`;

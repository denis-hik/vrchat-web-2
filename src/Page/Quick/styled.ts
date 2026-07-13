import styled from "styled-components";

export const QuickPageStyled = styled.main`
    min-height: 100vh;
    padding: 88px 18px 28px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    color: #ffffff;
    background: #0f1218;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

    *, :before, :after {
        box-sizing: border-box;
    }

    .quick-shell {
        position: relative;
        z-index: 1;
        width: min(980px, 100%);
        margin: 0 auto;
        display: grid;
        grid-template-columns: minmax(260px, 0.88fr) minmax(280px, 1.12fr);
        gap: 18px;
    }

    .right-column {
        display: grid;
        gap: 18px;
    }

    .quick-shell > *,
    .right-column > * {
        opacity: 0;
        transform: translateY(22px) scale(0.985);
        filter: blur(10px);
        animation: quickBlockEnter 0.72s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        will-change: opacity, transform, filter;
    }

    .quick-shell > *:nth-child(1) {
        animation-delay: 0.08s;
    }

    .right-column > *:nth-child(1) {
        animation-delay: 0.18s;
    }

    .right-column > *:nth-child(2) {
        animation-delay: 0.28s;
    }

    .right-column > *:nth-child(3) {
        animation-delay: 0.38s;
    }

    .right-column > *:nth-child(4) {
        animation-delay: 0.48s;
    }

    @keyframes quickBlockEnter {
        from {
            opacity: 0;
            transform: translateY(22px) scale(0.985);
            filter: blur(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
        }
    }

    html.quick-page-exit & {
        background: #080a0f;
    }

    html.quick-page-exit & .quick-shell > *,
    html.quick-page-exit & .right-column > * {
        animation: quickBlockExit 0.42s cubic-bezier(0.7, 0, 0.84, 0) forwards;
        filter: blur(0);
    }

    html.quick-page-exit & .right-column > *:nth-child(4) {
        animation-delay: 0s;
    }

    html.quick-page-exit & .right-column > *:nth-child(3) {
        animation-delay: 0.04s;
    }

    html.quick-page-exit & .right-column > *:nth-child(2) {
        animation-delay: 0.08s;
    }

    html.quick-page-exit & .right-column > *:nth-child(1),
    html.quick-page-exit & .quick-shell > *:nth-child(1) {
        animation-delay: 0.12s;
    }

    @keyframes quickBlockExit {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
        }
        to {
            opacity: 0;
            transform: translateY(-18px) scale(0.975);
            filter: blur(0);
        }
    }

    @media (max-width: 760px) {
        padding: 76px 12px 18px;

        .quick-shell {
            grid-template-columns: 1fr;
        }
    }

    @media (min-width: 1600px) and (min-aspect-ratio: 21/10) {
        min-height: 100vh;
        padding: 72px 40px 40px;

        .quick-shell {
            width: min(1840px, 100%);
            min-height: calc(100vh - 112px);
            grid-template-columns: minmax(420px, 0.82fr) minmax(0, 1.68fr);
            gap: 24px;
            align-items: stretch;
        }

        .right-column {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            grid-template-rows: auto minmax(0, 0.84fr) minmax(0, 1.16fr);
            gap: 24px;
            min-height: 0;
        }

        .right-column > *:nth-child(1) {
            grid-column: 1 / -1;
        }

        .right-column > *:nth-child(2) {
            grid-column: 1 / 3;
        }

        .right-column > *:nth-child(3) {
            grid-column: 3;
        }

        .right-column > *:nth-child(4) {
            grid-column: 1 / -1;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .quick-shell > *,
        .right-column > * {
            opacity: 1;
            transform: none;
            filter: none;
            animation: none;
        }
    }
`;

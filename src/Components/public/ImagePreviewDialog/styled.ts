import styled from "styled-components";

export const ImagePreviewDialogStyled = styled.div<{$visible: boolean}>`
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    min-height: 100vh;
    min-height: 100dvh;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(6, 7, 12, 0.48);
    backdrop-filter: blur(8px);
    opacity: ${({$visible}) => $visible ? 1 : 0};
    pointer-events: ${({$visible}) => $visible ? "auto" : "none"};
    transition: opacity 0.22s ease, backdrop-filter 0.22s ease;

    .dialog-panel {
        width: min(920px, 100%);
        max-height: min(760px, calc(100vh - 48px));
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        background: rgba(16, 17, 23, 0.84);
        box-shadow: 0 26px 90px rgba(0, 0, 0, 0.52);
        opacity: ${({$visible}) => $visible ? 1 : 0};
        transform: ${({$visible}) => $visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.98)"};
        transition: opacity 0.22s ease, height 0.22s ease, transform 0.22s ease;
    }

    .dialog-header {
        min-height: 62px;
        padding: 0 18px 0 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }

    h3 {
        margin: 0;
        min-width: 0;
        font-size: 22px;
        line-height: 1.15;
    }

    .header-actions {
        flex: 0 0 auto;
        display: inline-flex;
        align-items: center;
        gap: 10px;
    }

    .header-link,
    .icon-button,
    .carousel-button {
        border: 1px solid rgba(255, 255, 255, 0.18);
        color: #ffffff;
        background: rgba(255, 255, 255, 0.1);
        font-family: inherit;
        font-weight: 800;
        cursor: pointer;
        transition: background 0.2s ease, transform 0.2s ease;
    }

    .header-link {
        min-height: 38px;
        padding: 0 14px;
        border-radius: 999px;
        font-size: 14px;
    }

    .icon-button {
        width: 38px;
        height: 38px;
        border-radius: 50%;
    }

    .header-link:hover,
    .icon-button:hover,
    .carousel-button:hover {
        background: rgba(255, 255, 255, 0.18);
        transform: translateY(-1px);
    }

    .carousel {
        position: relative;
        min-height: 320px;
        max-height: calc(100vh - 176px);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.24);
        transition: height 0.32s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .image-loader {
        position: absolute;
        inset: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background:
            radial-gradient(circle at center, rgba(255, 255, 255, 0.08), transparent 34%),
            rgba(0, 0, 0, 0.18);
        opacity: 1;
        pointer-events: none;
    }

    .image-loader span {
        width: 42px;
        height: 42px;
        border: 3px solid rgba(255, 255, 255, 0.24);
        border-top-color: #ffffff;
        border-radius: 50%;
        animation: imagePreviewLoader 0.8s linear infinite;
    }

    .carousel img {
        width: 100%;
        height: 100%;
        max-height: 100%;
        display: block;
        object-fit: contain;
        transition: opacity 0.24s ease, transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .carousel img.is-loading {
        opacity: 0;
        transform: scale(0.985);
    }

    .carousel img.is-loaded {
        opacity: 1;
        transform: scale(1);
    }

    .carousel-button {
        position: absolute;
        top: 50%;
        z-index: 1;
        width: 44px;
        height: 44px;
        border-color: rgba(255, 255, 255, 0.28);
        border-radius: 50%;
        background: rgba(5, 6, 10, 0.72);
        box-shadow: 0 12px 34px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.14);
        backdrop-filter: blur(10px);
        text-shadow: 0 1px 8px rgba(0, 0, 0, 0.9);
        transform: translateY(-50%);
    }

    .carousel-button:hover {
        background: rgba(5, 6, 10, 0.88);
        transform: translateY(calc(-50% - 1px));
    }

    .prev {
        left: 16px;
    }

    .next {
        right: 16px;
    }

    .carousel-footer {
        min-height: 48px;
        padding: 0 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.72);
        font-size: 14px;
        font-weight: 800;
        border-top: 1px solid rgba(255, 255, 255, 0.12);
    }

    @keyframes imagePreviewLoader {
        to {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 760px) {
        min-height: 100dvh;
        padding: 12px;
        align-items: center;
        justify-content: center;

        .dialog-panel {
            width: min(100%, 420px);
            max-height: calc(100vh - 24px);
            max-height: calc(100dvh - 24px);
            margin: auto;
            border-radius: 14px;
        }

        .dialog-header {
            min-height: 56px;
            padding: 0 14px 0 16px;
        }

        h3 {
            font-size: 19px;
        }

        .header-link {
            min-height: 34px;
            padding: 0 12px;
            font-size: 13px;
        }

        .carousel,
        .carousel img {
            max-height: calc(100vh - 150px);
        }
    }
`;

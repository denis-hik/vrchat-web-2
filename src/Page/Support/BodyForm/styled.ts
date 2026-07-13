import styled from "styled-components";

export const BodyFormStyled = styled.section`
    position: relative;
    display: grid;
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
    padding: 32px 28px;
    min-height: 360px;
    border-radius: 18px;
    overflow: hidden;
    color: rgba(255, 255, 255, 0.94);
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(16, 17, 23, 0.58);
    box-shadow: 0 20px 70px rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(18px);

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),
            rgba(16, 17, 23, 0.18);
        z-index: -1;
    }

    .support-title {
        margin: 0;
        text-align: left;
        font: 700 clamp(32px, 5vw, 44px)/0.95 system-ui, sans-serif;
    }

    .key-step {
        display: grid;
        gap: 10px;
        max-height: 120px;
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.35s ease, transform 0.35s ease, max-height 0.35s ease, margin 0.35s ease;
    }

    &[data-checked="true"] .key-step {
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transform: translateY(-12px);
        margin-bottom: -8px;
        pointer-events: none;
    }

    .support-actions {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 12px;
        align-items: center;
    }

    .support-input-wrap {
        position: relative;
        border-radius: 14px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.08);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }

    .support-input-wrap input {
        width: 100%;
        height: 52px;
        padding: 0 18px;
        border: 0;
        outline: 0;
        color: rgba(255, 255, 255, 0.96);
        font: 500 15px/1 system-ui, sans-serif;
        background: rgba(16, 17, 23, 0.34);
    }

    .support-input-wrap input:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .support-input-wrap input::placeholder {
        color: rgba(255, 255, 255, 0.42);
    }

    button {
        height: 52px;
        padding: 0 22px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 14px;
        color: rgba(255, 255, 255, 0.96);
        font: 800 15px/1 system-ui, sans-serif;
        background: rgba(255, 255, 255, 0.14);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
        cursor: pointer;
        transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
    }

    button:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        transform: none;
    }

    button:hover {
        transform: translateY(-1px);
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.18);
    }

    button:active {
        transform: translateY(0);
        background: rgba(255, 255, 255, 0.12);
    }

    .support-product {
        display: grid;
        grid-template-columns: 92px minmax(0, 1fr);
        gap: 16px;
        align-items: center;
        min-height: 0;
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transform: translateY(18px);
        transition: opacity 0.4s ease, transform 0.4s ease, max-height 0.4s ease, padding 0.4s ease;
    }

    &[data-checked="true"] .support-product {
        max-height: 160px;
        opacity: 1;
        transform: translateY(0);
        padding-top: 4px;
    }

    .product-image {
        width: 92px;
        height: 92px;
        object-fit: cover;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.06);
        box-shadow: 0 18px 35px rgba(0, 0, 0, 0.18);
    }

    .product-image.placeholder {
        display: block;
    }

    .product-copy {
        display: grid;
        gap: 8px;
    }

    .product-copy h2 {
        margin: 0;
        font: 700 24px/1.05 system-ui, sans-serif;
    }

    .product-copy p {
        margin: 0;
        color: rgba(255, 255, 255, 0.62);
        font: 400 14px/1.5 system-ui, sans-serif;
    }

    .product-key {
        display: inline-flex;
        width: fit-content;
        padding: 6px 10px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.78);
        font: 500 12px/1.2 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    .support-body {
        display: grid;
        gap: 14px;
        min-height: 0;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.08);
        padding: 18px;
        opacity: 0;
        max-height: 0;
        overflow: hidden;
        transform: translateY(18px);
        transition: opacity 0.4s ease, transform 0.4s ease, max-height 0.4s ease, padding 0.4s ease;
    }

    &[data-checked="true"] .support-body {
        opacity: 1;
        max-height: 520px;
        transform: translateY(0);
    }

    &[data-sent="true"] .support-body {
        opacity: 0;
        max-height: 0;
        padding-top: 0;
        padding-bottom: 0;
        border-width: 0;
        margin-top: -6px;
        overflow: hidden;
        transform: translateY(12px);
        pointer-events: none;
    }

    .support-field {
        display: grid;
        gap: 8px;
    }

    .support-field span {
        color: rgba(255, 255, 255, 0.64);
        font: 500 13px/1.2 system-ui, sans-serif;
    }

    .support-field input,
    .support-field textarea {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 14px;
        outline: 0;
        color: rgba(255, 255, 255, 0.96);
        font: 500 15px/1.45 system-ui, sans-serif;
        background: rgba(16, 17, 23, 0.34);
    }

    .support-field input {
        height: 48px;
        padding: 0 16px;
    }

    .support-field textarea {
        min-height: 148px;
        max-height: 260px;
        resize: vertical;
        padding: 14px 16px;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.28) transparent;
    }

    .support-field textarea::-webkit-scrollbar {
        width: 10px;
    }

    .support-field textarea::-webkit-scrollbar-track {
        background: transparent;
    }

    .support-field textarea::-webkit-scrollbar-thumb {
        border: 3px solid transparent;
        border-radius: 999px;
        background-clip: padding-box;
        background-color: rgba(255, 255, 255, 0.22);
    }

    .support-field textarea::-webkit-scrollbar-thumb:hover {
        background-color: rgba(255, 255, 255, 0.34);
    }

    .support-field input::placeholder,
    .support-field textarea::placeholder {
        color: rgba(255, 255, 255, 0.38);
    }

    .support-submit-row {
        display: flex;
        justify-content: flex-end;
    }

    .support-message {
        display: flex;
        align-items: center;
        border-radius: 16px;
        min-height: 44px;
        padding: 12px 14px;
        font: 500 13px/1.45 system-ui, sans-serif;
        backdrop-filter: blur(18px);
    }

    .support-message.error {
        border: 1px solid rgba(255, 120, 120, 0.18);
        background: rgba(255, 87, 87, 0.08);
        color: rgba(255, 211, 211, 0.96);
    }

    .support-message.success {
        border: 1px solid rgba(126, 239, 154, 0.18);
        background: rgba(89, 210, 119, 0.08);
        color: rgba(217, 255, 225, 0.96);
    }

    @media (max-width: 767px) {
        min-height: 320px;
        padding: 24px 20px;

        .support-actions {
            grid-template-columns: 1fr;
        }

        button {
            width: 100%;
        }

        .support-product {
            grid-template-columns: 1fr;
        }

        .support-submit-row {
            justify-content: stretch;
        }
    }
`;

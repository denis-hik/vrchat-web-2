import styled from "styled-components";

export const LanguageSwitchStyled = styled.div`
    justify-self: end;
    display: inline-grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;
    min-height: 40px;
    padding: 4px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(16, 17, 23, 0.58);
    backdrop-filter: blur(18px);

    button {
        min-width: 54px;
        border: 0;
        border-radius: 999px;
        color: rgba(255, 255, 255, 0.66);
        background: transparent;
        font: 800 13px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        cursor: pointer;
        transition: color 0.2s ease, background 0.2s ease;
    }

    button.active {
        color: #111219;
        background: #ffffff;
    }

    @media (max-width: 760px) {
        display: none;
    }
`;

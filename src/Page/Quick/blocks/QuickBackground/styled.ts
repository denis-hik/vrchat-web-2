import styled from "styled-components";

export const QuickBackgroundStyled = styled.div`
    position: fixed;
    inset: -28px;
    z-index: 0;
    pointer-events: none;
    filter: blur(16px);
    transform: scale(1.04);
    opacity: 0.82;

    .back-parallax {
        position: absolute;
        inset: 0;
        z-index: 0;
    }

    &:after {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(7, 8, 12, 0.34);
    }
`;

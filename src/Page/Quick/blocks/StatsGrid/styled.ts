import styled from "styled-components";

export const StatsGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;

    .stat {
        min-height: 92px;
        padding: 14px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.08);
    }

    .stat strong,
    .stat span {
        display: block;
    }

    .stat strong {
        font-size: 24px;
        line-height: 1;
    }

    .stat span {
        margin-top: 8px;
        color: rgba(255, 255, 255, 0.64);
        font-size: 13px;
        line-height: 1.35;
    }

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

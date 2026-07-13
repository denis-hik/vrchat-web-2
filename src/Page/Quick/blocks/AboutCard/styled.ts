import styled from "styled-components";

export const AboutCardStyled = styled.article`
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(16, 17, 23, 0.58);
    box-shadow: 0 20px 70px rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(18px);
    border-radius: 16px;
    padding: 22px;

    h2 {
        margin: 0 0 14px;
        font-size: 22px;
        line-height: 1.15;
    }

    p {
        margin: 0;
        color: rgba(255, 255, 255, 0.72);
        line-height: 1.6;
    }

    .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 16px;
    }

    .tag {
        min-height: 38px;
        padding: 0 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        color: rgba(255, 255, 255, 0.84);
        background: rgba(255, 255, 255, 0.09);
        text-decoration: none;
        font-size: 14px;
        font-weight: 800;
    }

    @media (min-width: 1600px) and (min-aspect-ratio: 21/10) {
        height: 100%;
        padding: 28px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        h2 {
            font-size: 30px;
        }

        p {
            font-size: 18px;
        }
    }
`;

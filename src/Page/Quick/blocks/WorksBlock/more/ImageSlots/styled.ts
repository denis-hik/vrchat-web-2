import styled from "styled-components";

export const ImageSlotsStyled = styled.article`
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

    .image-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-top: 18px;
    }

    @media (max-width: 760px) {
        .image-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (min-width: 1600px) and (min-aspect-ratio: 21/10) {
        height: 100%;
        padding: 28px;
        display: flex;
        flex-direction: column;

        h2 {
            font-size: 30px;
        }

        p {
            font-size: 18px;
        }

        .image-grid {
            flex: 1 1 auto;
            min-height: 0;
        }
    }
`;

import styled from "styled-components";

export const ImageSlotsCardStyled = styled.article`
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

    .image-slot {
        position: relative;
        overflow: hidden;
        min-height: 148px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 14px;
        padding: 14px;
        display: flex;
        align-items: flex-end;
        color: rgba(255, 255, 255, 0.62);
        background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03)),
            rgba(16, 17, 23, 0.58);
        box-shadow: 0 20px 70px rgba(0, 0, 0, 0.32);
        backdrop-filter: blur(18px);
        font-size: 13px;
        line-height: 1.35;
    }

    .image-slot img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .image-slot:after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 36%, rgba(0, 0, 0, 0.78) 100%);
    }

    .image-slot span {
        position: relative;
        z-index: 1;
        font-weight: 800;
        color: rgba(255, 255, 255, 0.9);
    }

    @media (max-width: 760px) {
        .image-grid {
            grid-template-columns: 1fr;
        }
    }
`;

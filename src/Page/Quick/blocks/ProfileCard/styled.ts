import styled from "styled-components";

export const ProfileCardStyled = styled.article`
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(16, 17, 23, 0.58);
    box-shadow: 0 20px 70px rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(18px);
    border-radius: 18px;
    overflow: hidden;

    .avatar-wrap {
        position: relative;
        min-height: 360px;
        background: rgba(255, 255, 255, 0.06);
    }

    .avatar-wrap img {
        width: 100%;
        height: 100%;
        min-height: 360px;
        display: block;
        object-fit: cover;
    }

    .avatar-wrap:after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 42%, rgba(10, 10, 13, 0.88) 100%);
    }

    .profile-body {
        position: relative;
        margin-top: -118px;
        padding: 0 22px 24px;
    }

    .status-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
    }

    .status,
    .trust-rank {
        display: inline-flex;
        align-items: center;
        min-height: 28px;
        padding: 0 11px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        font-size: 13px;
        font-weight: 700;
    }

    .status {
        gap: 8px;
        color: rgba(255, 255, 255, 0.9);
        background: rgba(255, 255, 255, 0.14);
    }

    .trust-rank {
        gap: 8px;
        color: rgba(168, 85, 247, 0.82);
        background: rgba(255, 255, 255, 0.14);
        border-color: rgba(168, 85, 247, 0.82);
        box-shadow: 0 0 16px rgba(168, 85, 247, 0.24);
    }

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #38f29b;
        box-shadow: 0 0 16px rgba(56, 242, 155, 0.88);
    }

    .trust-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(168, 85, 247, 0.82);
        box-shadow: 0 0 16px rgba(168, 85, 247, 0.82);
    }

    h1 {
        margin: 18px 0 8px;
        font-size: clamp(38px, 7vw, 72px);
        line-height: 0.92;
        letter-spacing: 0;
    }

    .lead {
        margin: 0;
        max-width: 620px;
        color: rgba(255, 255, 255, 0.76);
        font-size: 17px;
        line-height: 1.55;
    }

    .quick-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 22px;
    }

    @media (max-width: 760px) {
        .avatar-wrap,
        .avatar-wrap img {
            min-height: 330px;
        }
    }
`;

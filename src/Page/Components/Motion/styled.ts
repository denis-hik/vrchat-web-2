import styled from "styled-components";

export const MotionStyled = styled.div`
    position: absolute;
    top: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    cursor: pointer;
    & > div {
        background: rgba(0, 0, 0, 0.3)
    }
    .glass-surface {
        transition: all 0.3s ease-in-out;
        width: 45px !important;
        height: 45px !important;
    }
`
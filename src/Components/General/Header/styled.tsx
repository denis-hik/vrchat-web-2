import styled from "styled-components";

export const HeaderStyled = styled.div`
    display: flex;
    position: fixed;
    justify-content: center;
    top: 10px;
    height: 45px;
    width: 100%;
    align-items: center;
    transition: all 0.3s ease-in-out;

    .glass-surface {
        min-width: 100px;
        transition: all 0.3s ease-in-out;
        width: 90% !important;
        height: 45px !important;
    }
    
    .back {
        display: flex;
        align-items: center;
        justify-content: center;
        
        transition: all 0.3s ease-in-out;
        width: 0;
        color: white;
        opacity: 0;
    }
    
    & > div {
        background: rgba(0, 0, 0, 0.3)
    }
    .logo, .logo1 {
        width: 50px;
        cursor: pointer;
        
        img {
            transition: opacity 0.3s ease-in-out;
            opacity: 1;
            width: 100%;
            object-fit: contain;
        }
    }

    .text {
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease-in-out;

        width: 100%;
        margin: 0;
        font: 600 22px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        letter-spacing: 0.4px;
        color: rgba(255, 255, 255, 0.92);
        text-shadow: 0 1px 10px rgba(0, 0, 0, 0.35);

    }
    
    &.hide.active {
        top: -100px;
    }
    &.active {
        .glass-surface {
            transition: all 0.3s ease-in-out;
            width: 10% !important;
            height: 45px !important;
        }

        .text {
            pointer-events: none;
            width: 0;
            opacity: 0;
        }
        .logo1 {
            width: 0;
            opacity: 0;
        }
    }
    
    &.active:hover {
        cursor: pointer;
        
        .logo {
            opacity: 0;
            width: 0;
        }
        
        .back {
            width: 100%;
            opacity: 1;
        }
    }
    
    @media (min-aspect-ratio: 21/9) {
        &.hide.active {
            top: 10px;
        }
    }
`
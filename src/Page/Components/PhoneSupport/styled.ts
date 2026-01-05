import styled from "styled-components";

export const PhoneSupportStyled = styled.div` 
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    width: 100vw;
    height: 100vh;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    
    align-items: center;
    justify-content: center;
    
    backdrop-filter: blur(0) saturate(0) brightness(1);
    
    img {
        opacity: 0;
        
        width: 50%;
        height: auto;
        
        filter: invert(1);
        
        object-fit: contain;
    }
    
    @media (max-width: 767px) {
        display: flex;
        opacity: 1;
        backdrop-filter: blur(12px) saturate(1.8) brightness(1.2);
        
        img {
            opacity: 0.6;
            pointer-events: none;
        }
    }
`
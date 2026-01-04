import styled from "styled-components";

export const WingsContentStyled = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    opacity: 0;
    transition: opacity 0.5s ease-in-out;

    *, :before, :after {
        box-sizing: border-box;
    }
    
    
    &.active {
        opacity: 1;
    }
`
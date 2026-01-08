import styled from "styled-components";

export const WingsContentStackStyled = styled.div`
    flex: 1 1 100px;
    
    padding: 16px 8px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    position: relative;

    gap: 20px;
    
    & > div {
        display: flex;
        min-height: 15vh;
        
        & > div {
            cursor: default;
            width: 100%;
        }
    }
`
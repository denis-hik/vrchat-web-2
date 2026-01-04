import styled from "styled-components";

export const CardStyled = styled.div`
    cursor: pointer;
    position: relative;
    min-height: 100px;
    height: 100%;
    flex: 1 1 100px;
    width: 95%;
    border-radius: 15px;

    *, :before, :after {
        box-sizing: border-box;
    }
    
    .card {
        height: 100%;
        min-height: 150px;
    }
    .back-parallax {
        position: initial !important;
    }
    
    .text {
        position: absolute;
        bottom: 10px;
        color: white;
        
        display: flex;
        align-items: flex-end;
        justify-content: left;
        
        height: 100%;
        width: 100%;

        
        font-family: Figtree, sans-serif;
        font-feature-settings: normal;
        font-kerning: auto;
        font-optical-sizing: auto;
        font-size: 40px;
        font-size-adjust: none;
        font-style: normal;
        font-weight: 700;
        
        margin: 0 0 10px 0;
        
        svg {
            opacity: 0;
            animation: fadeIn 1s ease-in-out 2s forwards;
        }
        
        p {
            margin: 0 10px 0 0;
        }
    }


    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`
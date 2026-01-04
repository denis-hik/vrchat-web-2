import styled from "styled-components";

import JinxXyTtf from "../../../../../media/JinxXy.ttf";

export const BottomItemContentStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    
    .item-link {
        display: flex;
        align-items: center;
        justify-content: center;

        max-width: 200px;
        
        img {
            width: 6rem;
            transition: all 0.3s ease-in-out;
            filter: invert(1);
            object-fit: contain;
            height: 20px;
            
            &:hover {
                filter: invert(0.7);
            }
        }
        
        .JinxXy {
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            
            font-family: "JinxXy", "monaSans Fallback", sans-serif;
            font-feature-settings: "ss01", "ss03", "ss05", "ss08";
            font-size: 20px;
            font-variation-settings: normal;
            height: 64.875px;
            line-height: 22.5px;
            tab-size: 4;
            transition-duration: 0.2s;
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            width: 50px;
            -webkit-font-smoothing: antialiased;
            text-shadow: none;
            
            &:hover {
                text-shadow: rgb(7, 188, 204) 2px 2px 0px, rgb(230, 1, 192) 3px 3px 0px, rgb(233, 1, 154) 4px 4px 0px, rgb(244, 4, 104) 5px 5px 0px, rgb(244, 4, 104) 6px 6px 10px;
            }
            
            @font-face {
                font-family: "JinxXy";
                src: url(${JinxXyTtf}) format("truetype");
                font-weight: normal;
                font-style: normal;
                font-display: swap;
            }
        }

    }
`
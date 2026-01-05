import styled from "styled-components";

export const WingsStyled = styled.div<{selected: boolean}>`
    
    --width-wing: 3vw;
    --width-wing-selected: 40vw;
    --height-wing: 90vh;
    --space-wing: 1vw;
    
    display: flex;
    
    .wings {
        max-width: 500px;
        cursor: pointer;
        position: absolute;
        top: calc((100vh - var(--height-wing)) / 2);
        background: rgba(0, 0, 0, 0.3);
        
        .glass-surface__content {
            pointer-events: none;
            
            .item {
                pointer-events: all;
            }
        }
        .label {
            opacity: 1;
            width: auto;
            transition: opacity 0.3s ease-in-out;
            
            pointer-events: none;
            
            display: flex;
            align-items: center;
            
            font-size: clamp(22px, 3vw, 36px);
            font-weight: 500;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.85);

            writing-mode: vertical-rl; /* или vertical-lr */
            text-orientation: upright;
        }
    }
    
    
    .wing-r {
        right: var(--space-wing);
    }
    .wing-l {
        left: var(--space-wing);
    }
    .wing-b {
        position: fixed;
        width: 100%;
        transition: all 0.3s ease-in-out;
        bottom: var(--space-wing);
        
        display: flex;
        justify-content: center;
        
        &.selected {
            bottom: -999px;
        }
        .glass-surface {
            width: var(--width-wing-selected) !important;
            height: var(--width-wing) !important;
            
            min-height: 50px;
        }
        
        & > div {
            background: rgba(0, 0, 0, 0.3)
        }
    }
    
    .glass-surface {
        width: var(--width-wing) !important;
        transition: all 0.3s ease-in-out;
        min-width: 50px !important;
        height: 90vh !important;
    }

    .glass-surface.selected {
        width: var(--width-wing-selected) !important;
        
        .label {
            opacity: 0;
            display: none !important;
        }
    }
`
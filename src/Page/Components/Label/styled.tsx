import styled from "styled-components";

export const LabelStartPageLabel = styled.div<{active?: string}>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    
    cursor: default;

    opacity: ${({ active }) => (active === "t" ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
    
    display: flex;
    justify-content: center;
    align-items: center;    
    
    color: white;

    font-size: clamp(22px, 3vw, 36px);
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(2px);

    text-shadow:
            0 3px 18px rgba(0, 0, 0, 0.75),
            0 1px 0 rgba(0, 0, 0, 0.6);
    
    @media (max-width: 767px) {
        p {
            flex-direction: column;
            align-items: center;
        }
    }
`
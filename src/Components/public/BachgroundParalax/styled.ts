import styled from "styled-components";
import React from "react";

export const Root = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
`;

export const BaseLayer = styled.div`
  position: absolute;
  inset: 0;
`;

export const OverlayWrap = styled.div<{backgroundcolor: React.CSSProperties["backgroundColor"]}>`
  position: absolute;
  inset: 0;
  background-color: ${(props) => props.backgroundcolor};
  display: grid;
  place-items: center;
`;

export const OverlayLayer = styled.div`
  will-change: transform;
  transform: translate3d(0, 0, 0);
  filter: drop-shadow(0 16px 40px rgba(0, 0, 0, 0.12));
`;
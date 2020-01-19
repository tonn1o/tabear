import styled from "styled-components";

export const PrimaryCard = styled.div`
  background: #FFFFFF;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .2);
  cursor: pointer;
`;

export const PrimaryCardAnimated = styled(PrimaryCard)`
  transition: .3s;
  
  &:hover {
    transform: scale(1.04);
  }
`;
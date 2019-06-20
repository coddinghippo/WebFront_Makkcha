import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  color: white;
  flex: inherit;
  background: #000033;
`;

const MakchaDetail = props => {
  const { pathList, addr } = props;
  return (
    <Container>
      <p>{addr}</p>
      <div>
        <span>막차까지 </span>
        <span>
          {pathList
            ? pathList[0].route.lastTimeList[0].lastTimeDay
            : "준비중입니다"}
        </span>
      </div>
    </Container>
  );
};

export default MakchaDetail;

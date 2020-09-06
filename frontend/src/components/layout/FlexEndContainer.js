import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Container = styled.div`
  width: 90%;
  height: 150vh;
  margin: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 2rem 0;
`;
const BackBtn = styled.div`
  margin: 2rem 0;
  position: absolute;
  align-self: flex-start;
  cursor: pointer;
`;

export default ({ title, children }) => {
  const history = useHistory();
  return (
    <Container>
      <BackBtn onClick={() => history.goBack()}>
        <IoIosArrowBack size={25} />
      </BackBtn>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

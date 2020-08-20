import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`;
const Logo = styled.img`
  width: 100px;
  height: 100px;
`;

const Gate = () => {
  return <Container>{/* <Logo src="/static/veradi_logo.png" /> */}</Container>;
};

export default Gate;

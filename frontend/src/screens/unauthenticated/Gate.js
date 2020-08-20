import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  height: 200px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  border: 1px solid rgba(214, 214, 214);
  margin-bottom: 10px;
  padding-left: 10px;
  font-size: 20px;
  &::placeholder {
    opacity: 0.5;
  }

  &:focus {
    outline: 1px solid rgba(196, 255, 225);
    border: 1px solid rgba(196, 255, 225);
    z-index: 10;
  }
`;

const SubmitButton = styled.button`
  width: 300px;
  height: 50px;
  background-color: rgb(82, 79, 161);
  color: white;
`;

const Gate = () => {
  const [userInput, setUserInput] = useState({
    userId: "",
    userPassword: "",
    userCode: "",
  });
  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserInput({
      userId: "",
      userPassword: "",
      userCode: "",
    });
  };
  return (
    <Container>
      <Logo alt="veradi_logo" src="/static/assets/veradi/logo.png" />
      <LoginForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="ID"
          name="userId"
          onChange={handleChange}
          value={userInput.userId}
        />
        <Input
          type="password"
          placeholder="Password"
          name="userPassword"
          onChange={handleChange}
          value={userInput.userPassword}
        />
        <Input
          placeholder="Code"
          name="userCode"
          onChange={handleChange}
          value={userInput.userCode}
        />
        <SubmitButton type="submit">로그인</SubmitButton>
      </LoginForm>
    </Container>
  );
};

export default Gate;

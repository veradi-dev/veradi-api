import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { login } from "../../redux/user/userThunks";

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

const Gate = ({ history, isAuthenticated, login }) => {
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    code: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(userInput);
    setUserInput({
      username: "",
      password: "",
      code: "",
    });
  };
  return (
    <Container>
      <Logo alt="veradi_logo" src="/static/assets/veradi/logo.png" />
      <LoginForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="ID"
          name="username"
          onChange={handleChange}
          value={userInput.username}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={userInput.password}
        />
        <Input
          placeholder="Code"
          name="code"
          onChange={handleChange}
          value={userInput.code}
        />
        <SubmitButton type="submit">로그인</SubmitButton>
      </LoginForm>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});
const mapDispatchToProps = { login };
export default connect(mapStateToProps, mapDispatchToProps)(Gate);

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import { login } from "../../redux/user/userThunks";
import LogoImage from "../../../assets/veradi/logo.png";
import CircularProgress from "@material-ui/core/CircularProgress";

const bulb = keyframes`
  0%{
    transform: scale(1)
  }
  
  50%{
    transform: scale(20)
  }

  100%{
    transform: scale(1)
  );
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  background-position: center center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Bulb = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: radial-gradient(circle, #857c51 10%, rgba(0, 0, 0, 0.2) 100%);
  animation: ${bulb} 4s linear 2s infinite;
  border: rgba(0, 0, 0, 0);
  border-radius: 100%;
  opacity: 0.4;
`;
const Logo = styled.img`
  height: 200px;
  z-index: 10;
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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const img = new Image();
    img.src = LogoImage;
    img.onload = () => {
      setInterval(() => setIsLoading(false), 1000);
    };
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
      {isLoading ? (
        <CircularProgress
          color="primary"
          size={40}
          thickness={5}
          style={{
            color: "#1a90ff",
            animationDuration: "550ms",
          }}
        />
      ) : (
        <>
          <LogoContainer>
            <Bulb />
            <Logo alt="veradi_logo" src={LogoImage} />
          </LogoContainer>
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
        </>
      )}
    </Container>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});
const mapDispatchToProps = { login };
export default connect(mapStateToProps, mapDispatchToProps)(Gate);

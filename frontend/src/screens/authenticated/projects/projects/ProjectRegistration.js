import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const FormContainer = styled.form`
  width: 80%;
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

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 2rem;
`;

const Column = styled.div`
  width: 100%;
  padding-bottom: 2rem;
  padding-left: 0.5rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ebebeb;
`;
const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
`;

const Input = styled.input`
  width: 20rem;
  height: 100%;
  margin-left: 1rem;
  border-radius: 20px 20px;
  font-size: 1.5rem;
  padding: 0 1rem;
  border-width: 1px;
  border-style: solid;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(195, 195, 195));
  font-size: large;
`;
const Select = styled.select`
  width: 20rem;
  height: 100%;
  margin-left: 1rem;
  padding-left: 1rem;
  border-radius: 20px 20px;
`;

const BackBtn = styled.div`
  margin: 2rem 0;
  position: absolute;
  align-self: flex-start;
  cursor: pointer;
`;

const QuestionRegister = ({ history }) => {
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  return (
    <FormContainer>
      <BackBtn onClick={() => history.goBack()}>
        <IoIosArrowBack size={25} />
      </BackBtn>
      <Title>문항 등록</Title>
      <Column>
        <Label>과목</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={subject === "" ? "#ebebeb" : "#11992e"}
          />
          <Select
            name="subject"
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="">---------------</option>
            <option value="COLO">국어</option>
            <option value="COMT">수학</option>
            <option value="COPH">물리1</option>
            <option value="COCH">화학1</option>
            <option value="COBS">생명과학1</option>
            <option value="COGS">지구과학1</option>
          </Select>
        </InputContainer>
      </Column>
      <Column>
        <Label>프로젝트명</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={name === "" ? "#ebebeb" : "#11992e"}
          />
          <Input
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </InputContainer>
      </Column>
      <Column>
        <Label>프로젝트명</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={name === "" ? "#ebebeb" : "#11992e"}
          />
          <Input
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </InputContainer>
      </Column>
      <Button variant="contained" color="primary" type="submit">
        제출
      </Button>
    </FormContainer>
  );
};

export default QuestionRegister;

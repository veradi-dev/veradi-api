import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";

const FormContainer = styled.form`
  width: 80%;
  height: 100vh;
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
`;
const Select = styled.select`
  width: 20rem;
  height: 100%;
  margin-left: 1rem;
  padding-left: 1rem;
  border-radius: 20px 20px;
`;
const QuestionRegister = () => {
  const [subject, setSubject] = useState("");
  const [unit, setUnit] = useState("");
  const [unitList, setUnitList] = useState([]);
  const [image, setImage] = useState("");
  const [evaluation, setEvaluation] = useState({
    size: "",
    difficulty: "",
    novelty: "",
    integrity: "",
  });
  const handleSubjectChange = (e) => {
    if (e.target.value === "") {
      setUnit("");
      setUnitList([]);
    } else {
      axios
        .get(`/api/v1/projects/${e.target.value}/unit-list/`)
        .then((res) => setUnitList(res.data));
    }
    setSubject(e.target.value);
  };
  const handleEvaluationChange = (e) => {
    setEvaluation({
      ...evaluation,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <FormContainer>
      <Title>문항 등록</Title>
      <Column>
        <Label>과목</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={subject === "" ? "#ebebeb" : "#11992e"}
          />
          <Select name="subject" onChange={handleSubjectChange}>
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
        <Label>단원</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={unit === "" ? "#ebebeb" : "#11992e"}
          />
          <Select name="unit" onChange={(e) => setUnit(e.target.value)}>
            <option value="">---------------</option>
            {unitList == []
              ? null
              : unitList.map((unit) => {
                  return (
                    <option key={`${unit.code}`} value={unit.code}>
                      {unit.name}
                    </option>
                  );
                })}
          </Select>
        </InputContainer>
      </Column>
      <Column>
        <Label>이미지</Label>
        <InputContainer>
          <AiOutlineCheckCircle size={25} color="#ebebeb" />
          <input
            type="file"
            style={{ marginLeft: "1rem" }}
            onChange={(e) => console.log(e)}
          />
        </InputContainer>
      </Column>
      <Column>
        <Label>크기</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={evaluation.size === "" ? "#ebebeb" : "#11992e"}
          />
          <Select name="size" onChange={handleEvaluationChange}>
            <option value="">---------------</option>
            <option value="small">소</option>
            <option value="medium">중</option>
            <option value="big">대</option>
          </Select>
        </InputContainer>
      </Column>
      <Column>
        <Label>난이도</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={evaluation.difficulty === "" ? "#ebebeb" : "#11992e"}
          />
          <Select name="difficulty" onChange={handleEvaluationChange}>
            <option value="">---------------</option>
            {[...Array(11).keys()].map((num) => (
              <option key={`difficulty${num}`} value={num}>
                {num}
              </option>
            ))}
          </Select>
        </InputContainer>
      </Column>
      <Column>
        <Label>참신성</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={evaluation.novelty === "" ? "#ebebeb" : "#11992e"}
          />
          <Select name="novelty" onChange={handleEvaluationChange}>
            <option value="">---------------</option>
            {[...Array(11).keys()].map((num) => (
              <option key={`novelty${num}`} value={num}>
                {num}
              </option>
            ))}
          </Select>
        </InputContainer>
      </Column>
      <Column>
        <Label>완성도</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={evaluation.integrity === "" ? "#ebebeb" : "#11992e"}
          />
          <Select name="integrity" onChange={handleEvaluationChange}>
            <option value="">---------------</option>
            {[...Array(11).keys()].map((num) => (
              <option key={`integrity${num}`} value={num}>
                {num}
              </option>
            ))}
          </Select>
        </InputContainer>
      </Column>
    </FormContainer>
  );
};

export default QuestionRegister;

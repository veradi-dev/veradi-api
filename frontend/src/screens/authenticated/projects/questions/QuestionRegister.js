import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import axios from "axios";

const FormContainer = styled.form`
  width: 80%;
  height: 120vh;
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
const Button = styled.button`
  width: 12rem;
  height: 3rem;
  font-size: 1.5rem;
  background-color: rgb(82, 79, 150, 0.9);
  border-radius: 1rem;
  color: white;
`;

const QuestionRegister = () => {
  const [subject, setSubject] = useState("");

  const [unit, setUnit] = useState("");

  const [unitList, setUnitList] = useState([]);

  const [images, setImages] = useState({
    files: [],
  });

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

  const handleImagesChange = (e) => {
    let fileObj = e.target.files;
    let fileArray = [];
    for (let i = 0; i < fileObj.length; i++) {
      fileArray.push(fileObj[i]);
    }
    setImages({ files: fileArray });
  };

  const handleEvaluationChange = (e) => {
    setEvaluation({
      ...evaluation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("subject", subject);
    form_data.append("unit", unit);
    for (let i = 0; i < images.files.length; i++) {
      form_data.append(`image${i}`, images.files[i]);
    }
    form_data.append("size", evaluation.size);
    form_data.append("difficulty", evaluation.difficulty);
    form_data.append("novelty", evaluation.novelty);
    form_data.append("integrity", evaluation.integrity);
    axios.post("/api/v1/projects/question/", form_data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  };
  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>문항 등록</Title>
      <Column>
        <Label>과목</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={subject === "" ? "#ebebeb" : "#11992e"}
          />
          <Select name="subject" onChange={handleSubjectChange} required>
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
          <Select
            name="unit"
            onChange={(e) => setUnit(e.target.value)}
            required
          >
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
          <AiOutlineCheckCircle
            size={25}
            color={images.files.length === 0 ? "#ebebeb" : "#11992e"}
          />
          <input
            type="file"
            style={{ marginLeft: "1rem" }}
            onChange={handleImagesChange}
            multiple
            required
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
          <Select name="size" onChange={handleEvaluationChange} required>
            <option value="">---------------</option>
            <option value={1}>소</option>
            <option value={2}>중</option>
            <option value={3}>대</option>
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
          <Select name="difficulty" onChange={handleEvaluationChange} required>
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
          <Select name="novelty" onChange={handleEvaluationChange} required>
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
          <Select name="integrity" onChange={handleEvaluationChange} required>
            <option value="">---------------</option>
            {[...Array(11).keys()].map((num) => (
              <option key={`integrity${num}`} value={num}>
                {num}
              </option>
            ))}
          </Select>
        </InputContainer>
      </Column>
      <Button>제출</Button>
    </FormContainer>
  );
};

export default QuestionRegister;
import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
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

  const [unit, setUnit] = useState("");

  const [unitList, setUnitList] = useState([]);

  const [images, setImages] = useState({
    files: [],
  });

  const [answer, setAnswer] = useState("");

  const handleSubjectChange = (e) => {
    setUnit("");
    setUnitList([]);
    axios
      .get(`/api/v1/projects/${e.target.value}/unit-list/`)
      .then((res) => setUnitList(res.data));
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

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("subject", subject);
    form_data.append("unit", unit);
    for (let i = 0; i < images.files.length; i++) {
      form_data.append(`image${i}`, images.files[i]);
    }
    form_data.append("answer", answer);
    axios
      .post("/api/v1/projects/questions/registration/", form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          history.push("/projects/questions");
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <FormContainer onSubmit={handleSubmit}>
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
            value={unit}
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
          <Select
            name="unit"
            onChange={(e) => setUnit(e.target.value)}
            value={unit}
            required
          >
            <option value="">---------------</option>
            {unitList == []
              ? null
              : unitList.map((unit) => {
                  return (
                    <option key={`${unit.name}`} value={unit.code}>
                      {unit.code}
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
        <Label>정답</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={answer === "" ? "#ebebeb" : "#11992e"}
          />
          <Select name="answer" onChange={handleAnswerChange} required>
            <option value="">---------------</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Select>
        </InputContainer>
      </Column>
      <Button variant="contained" color="primary" type="submit">
        제출
      </Button>
    </FormContainer>
  );
};

export default QuestionRegister;

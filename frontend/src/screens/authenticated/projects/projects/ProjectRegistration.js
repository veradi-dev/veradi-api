import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { alertActions } from "~/frontend/src/redux/alert/alertSlice";
import axios from "axios";
import styled from "styled-components";
import { makeStyles } from "@material-ui/styles";
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

const useStyles = makeStyles({
  autocomplete: {
    width: "20rem",
    height: "100%",
    marginLeft: "1rem",
    borderRadius: "20px 20px",
    fontSize: "1.5rem",
    padding: "0 1rem",
    // borderWidth: "1px",
    // borderStyle: "solid",
    // borderColor: "-internal-light-dark(rgb(118, 118, 118), rgb(195, 195, 195))",
    fontSize: "large",
  },
  textField: {
    marginLeft: "2rem",
    width: "20rem",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    // paddingTop: "0.4rem"
  },
});

const ProjectRegistration = ({ history, successAlert, errorAlert }) => {
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [directors, setDirectors] = useState({
    designer: "",
    selector: "",
    editor: "",
    reviewer_1: "",
    reviewer_2: "",
    reviewer_3: "",
  });
  const [dueDates, setDueDates] = useState({
    total_due_date: "",
    designer_due_date: "",
    selector_due_date: "",
    editor_due_date: "",
    illustrator_due_date: "",
    reviewer_1_due_date: "",
    reviewer_2_due_date: "",
    reviewer_3_due_date: "",
  });
  const today = new Date().toISOString().slice(0, 16);
  const classes = useStyles();
  useEffect(() => {
    axios.get("/api/v1/users/").then((res) => {
      const { data } = res;
      const mappedUser = data.map((user) => {
        return {
          id: user.id,
          name: `${user.last_name}${user.first_name}`,
          department: user.department,
          team: user.team,
        };
      });
      setUsers(mappedUser);
    });
  }, []);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleDueDatesChange = (e) => {
    const dateObj = new Date(e.target.value);
    if (new Date(today).getTime() >= dateObj.getTime()) {
      setDueDates({
        ...dueDates,
        [e.target.name]: "",
      });
      errorAlert("현재 이전의 시간을 선택할 수 없습니다.");
    } else {
      setDueDates({
        ...dueDates,
        [e.target.name]: e.target.value,
      });
    }
  };
  const token = useSelector((state) => state.user.token);
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("subject", subject);
    formData.append("name", name);
    formData.append("directors", JSON.stringify(directors));
    formData.append("dueDates", JSON.stringify(dueDates));
    axios
      .post("api/v1/projects/", formData, {
        Authorization: token,
      })
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          successAlert(`${name} 프로젝트가 등록되었습니다.`);
          history.push("/projects");
        }
      })
      .catch((e) => {
        e.response.data?.non_field_errors?.map((msg) => errorAlert(msg));
      });
  };
  return (
    <FormContainer onSubmit={handleSubmit}>
      <BackBtn onClick={() => history.goBack()}>
        <IoIosArrowBack size={25} />
      </BackBtn>
      <Title>프로젝트 등록</Title>
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
        <Label>프로젝트 마감 기한</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={dueDates.total_due_date === "" ? "#ebebeb" : "#11992e"}
          />
          <TextField
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            name="total_due_date"
            value={dueDates.total_due_date}
            onChange={handleDueDatesChange}
            required
          />
        </InputContainer>
      </Column>
      <Column>
        <Label />
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={directors.designer === "" ? "#ebebeb" : "#11992e"}
          />
          <Autocomplete
            onChange={(e, newValue) => {
              if (newValue === null) {
                setDirectors({
                  ...directors,
                  designer: "",
                });
              } else {
                setDirectors({
                  ...directors,
                  designer: newValue.id,
                });
              }
            }}
            options={users}
            getOptionLabel={(option) => option.name}
            className={classes.autocomplete}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="설계 책임자"
                  variant="outlined"
                  required
                />
              );
            }}
          />
        </InputContainer>
      </Column>
      <Column>
        <Label>설계 마감 기한</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={dueDates.designer_due_date === "" ? "#ebebeb" : "#11992e"}
          />
          <TextField
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            name="designer_due_date"
            value={dueDates.designer_due_date}
            onChange={handleDueDatesChange}
            required
          />
        </InputContainer>
      </Column>
      <Column>
        <Label />
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={directors.selector === "" ? "#ebebeb" : "#11992e"}
          />
          <Autocomplete
            onChange={(e, newValue) => {
              setDirectors({
                ...directors,
                selector: newValue.id,
              });
            }}
            options={users}
            getOptionLabel={(option) => option.name}
            className={classes.autocomplete}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="선정 책임자"
                  variant="outlined"
                  required
                />
              );
            }}
          />
        </InputContainer>
      </Column>
      <Column>
        <Label>문제 선정 마감 기한</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={dueDates.selector_due_date === "" ? "#ebebeb" : "#11992e"}
          />
          <TextField
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            name="selector_due_date"
            value={dueDates.selector_due_date}
            onChange={handleDueDatesChange}
            required
          />
        </InputContainer>
      </Column>
      <Column>
        <Label />
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={directors.editor === "" ? "#ebebeb" : "#11992e"}
          />
          <Autocomplete
            onChange={(e, newValue) => {
              setDirectors({
                ...directors,
                editor: newValue.id,
              });
            }}
            options={users}
            getOptionLabel={(option) => option.name}
            className={classes.autocomplete}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="편집 책임자"
                  variant="outlined"
                  required
                />
              );
            }}
          />
        </InputContainer>
      </Column>
      <Column>
        <Label>편집 마감 기한</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={dueDates.editor_due_date === "" ? "#ebebeb" : "#11992e"}
          />
          <TextField
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            name="editor_due_date"
            value={dueDates.editor_due_date}
            onChange={handleDueDatesChange}
            required
          />
        </InputContainer>
      </Column>
      <Column>
        <Label />
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={directors.reviewer_1 === "" ? "#ebebeb" : "#11992e"}
          />
          <Autocomplete
            onChange={(e, newValue) => {
              setDirectors({
                ...directors,
                reviewer_1: newValue.id,
              });
            }}
            options={users}
            getOptionLabel={(option) => option.name}
            className={classes.autocomplete}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="1차 피드백 책임자"
                  variant="outlined"
                  required
                />
              );
            }}
          />
        </InputContainer>
      </Column>
      <Column>
        <Label>1차 피드백 마감 기한</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={dueDates.reviewer_1_due_date === "" ? "#ebebeb" : "#11992e"}
          />
          <TextField
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            name="reviewer_1_due_date"
            value={dueDates.reviewer_1_due_date}
            onChange={handleDueDatesChange}
            required
          />
        </InputContainer>
      </Column>
      <Column>
        <Label />
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={directors.reviewer_2 === "" ? "#ebebeb" : "#11992e"}
          />
          <Autocomplete
            onChange={(e, newValue) => {
              setDirectors({
                ...directors,
                reviewer_2: newValue.id,
              });
            }}
            options={users}
            getOptionLabel={(option) => option.name}
            className={classes.autocomplete}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="2차 피드백 책임자"
                  variant="outlined"
                  required
                />
              );
            }}
          />
        </InputContainer>
      </Column>
      <Column>
        <Label>일러스트 마감 기한</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={dueDates.illustrator_due_date === "" ? "#ebebeb" : "#11992e"}
          />
          <TextField
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            name="illustrator_due_date"
            value={dueDates.illustrator_due_date}
            onChange={handleDueDatesChange}
            required
          />
        </InputContainer>
      </Column>
      <Column>
        <Label>2차 피드백 마감 기한</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={dueDates.reviewer_2_due_date === "" ? "#ebebeb" : "#11992e"}
          />
          <TextField
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            name="reviewer_2_due_date"
            value={dueDates.reviewer_2_due_date}
            onChange={handleDueDatesChange}
            required
          />
        </InputContainer>
      </Column>
      <Column>
        <Label />
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={directors.reviewer_3 === "" ? "#ebebeb" : "#11992e"}
          />
          <Autocomplete
            onChange={(e, newValue) => {
              setDirectors({
                ...directors,
                reviewer_3: newValue.id,
              });
            }}
            options={users}
            getOptionLabel={(option) => option.name}
            className={classes.autocomplete}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label="3차 피드백 책임자"
                  variant="outlined"
                  required
                />
              );
            }}
          />
        </InputContainer>
      </Column>
      <Column>
        <Label>3차 피드백 마감 기한</Label>
        <InputContainer>
          <AiOutlineCheckCircle
            size={25}
            color={dueDates.reviewer_3_due_date === "" ? "#ebebeb" : "#11992e"}
          />
          <TextField
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            name="reviewer_3_due_date"
            value={dueDates.reviewer_3_due_date}
            onChange={handleDueDatesChange}
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

const successAlert = alertActions.success;
const errorAlert = alertActions.error;
const mapDispatchToProps = { successAlert, errorAlert };

export default connect(() => ({}), mapDispatchToProps)(ProjectRegistration);

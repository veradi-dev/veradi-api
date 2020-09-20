import React, { useState, useEffect, createRef } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import FlexEndContainer from "~/frontend/src/components/layout/FlexEndContainer";
import HorizontalStepper from "~/frontend/src/components/stepper/HorizontalStepper";
import MaterialTable from "material-table";
import CollapsibleTable from "~/frontend/src/components/table/QuestionTable";
import axios from "axios";

const useStyles = makeStyles({
  managementColumn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: "1%",
  },
  teamMemberManagement: {
    flexGrow: 1,
    marginRight: "1%",
  },
  questionManagement: {
    flexGrow: 2,
  },
});

function getSteps(project) {
  const steps = [
    {
      name: "select_completed",
      label: "대상 선정",
      completed: false,
    },
    {
      name: "edit_completed",
      label: "편집",
      completed: false,
    },
    {
      name: "review_1_completed",
      label: "1차 피드백",
      completed: false,
    },
    {
      name: "illustration_1_completed",
      label: "일러스트 1차",
      completed: false,
    },
    {
      name: "review_2_completed",
      label: "2차 피드백",
      completed: false,
    },
    {
      name: "illustration_2_completed",
      label: "일러스트 2차",
      completed: false,
    },
    {
      name: "review_3_completed",
      label: "3차 피드백",
      completed: false,
    },
    {
      name: "illustration_3_completed",
      label: "일러스트 3차",
      completed: false,
    },
    {
      name: "total_completed",
      label: "마감",
      completed: false,
    },
  ];
  return steps.map((step) => {
    step.completed = project[step.name];
    return step;
  });
}

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [steps, setSteps] = useState([]);
  const [questions, setQuestions] = useState([]);
  const columns = [
    { name: "단원", align: "right" },
    { name: "문항명", align: "right" },
    { name: "정답", align: "right" },
    { name: "단계", align: "right" },
  ];
  const classes = useStyles();

  const getQuestions = (project) => {
    const questions = project.questions;
    return questions.map((question) => {
      const recentHistory = question.histories[question.histories.length - 1];
      const questionId = question.id;
      return {
        id: questionId,
        unit: question.unit.name,
        title: question.name,
        images: recentHistory.images,
        answer: recentHistory.answer,
        step: "추가 검토 필요",
        delete: (
          <IconButton
            onClick={() => {
              if (confirm("프로젝트에서 문항을 삭제하시겠습니까?")) {
                setQuestions((prevState) => {
                  axios.post("/api/v1/projects/11/toggleQuestions/", {
                    questionId: questionId,
                  });
                  return prevState.filter(
                    (question) => question.id !== questionId
                  );
                });
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        ),
      };
    });
  };

  useEffect(() => {
    axios
      .get(`api/v1/projects/${id}`)
      .then((res) => {
        setProject(res.data);
        setSteps(getSteps(res.data));
        setQuestions(getQuestions(res.data));
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);
  return (
    <FlexEndContainer title="프로젝트 상황판">
      <HorizontalStepper steps={steps} />
      <div className={classes.managementColumn}>
        <div className={classes.teamMemberManagement}>
          <MaterialTable
            columns={[
              { title: "이름", field: "name", type: "string" },
              { title: "직원코드", field: "code", type: "string" },
            ]}
            data={[
              {
                name: "한상수",
                code: "1",
              },
            ]}
            title="팀원 조회"
          />
          <MaterialTable
            columns={[
              { title: "이름", field: "name", type: "string" },
              { title: "직원코드", field: "code", type: "string" },
            ]}
            data={[
              {
                name: "한상수",
                code: "1",
              },
            ]}
            title="팀원 조회"
          />
        </div>
        <div className={classes.questionManagement}>
          <CollapsibleTable
            title="문항 조회"
            columns={columns}
            rows={questions}
          />
        </div>
      </div>
    </FlexEndContainer>
  );
};

export default ProjectDetail;

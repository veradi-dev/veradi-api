import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FlexEndContainer from "~/frontend/src/components/layout/FlexEndContainer";
import HorizontalStepper from "~/frontend/src/components/stepper/HorizontalStepper";
import MaterialTable from "material-table";
import getSteps from "~/frontend/src/utils/getSteps";
import axios from "axios";
import { deleteQuestionInProject } from "~/frontend/src/api/projects";

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

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [steps, setSteps] = useState([]);
  const [manageMode, setManageMode] = useState(false);
  const [members, setMembers] = useState([
    {
      name: "한상수",
      code: "1",
      role: "King",
    },
  ]);
  const [questions, setQuestions] = useState([]);

  const columns = [
    { name: "단원", align: "right" },
    { name: "문항명", align: "right" },
    { name: "정답", align: "right" },
    { name: "단계", align: "right" },
  ];

  const classes = useStyles();

  const makeQuestionsRows = useCallback(
    (questions) => {
      return questions.map((question) => {
        const recentHistory = question.histories[question.histories.length - 1];
        const questionId = question.id;
        let questionRow = {
          id: questionId,
          unit: question.unit.name,
          title: question.name,
          images: recentHistory.images,
          answer: recentHistory.answer,
          step: "추가 검토 필요",
        };
        if (manageMode === true) {
          questionRow.delete = (
            <IconButton
              onClick={() => {
                if (confirm("프로젝트에서 문항을 삭제하시겠습니까?")) {
                  deleteQuestionInProject({
                    projectId: id,
                    questionId: questionId,
                  }).then(() => {
                    setQuestions((prevState) => {
                      return prevState.filter(
                        (question) => question.id !== questionId
                      );
                    });
                  });
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          );
        }
        return questionRow;
      });
    },
    [manageMode]
  );

  useEffect(() => {
    axios
      .get(`api/v1/projects/${id}`)
      .then((res) => {
        setProject(res.data);
        setSteps(getSteps(res.data));
        setQuestions(res.data.questions);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <FlexEndContainer title="프로젝트 상황판">
      <HorizontalStepper steps={steps} />
      <FormControlLabel
        control={
          <Switch
            checked={manageMode}
            onChange={() => setManageMode(!manageMode)}
          />
        }
        label="관리 모드"
      />
      <div className={classes.managementColumn}>
        <div className={classes.teamMemberManagement}>
          <MaterialTable
            columns={[
              { title: "이름", field: "name", type: "string" },
              { title: "직원코드", field: "code", type: "string" },
              { title: "직책", field: "role", type: "string" },
            ]}
            data={members}
            title={manageMode ? "문항 추가" : "팀원 조회"}
          />
        </div>
        <div className={classes.questionManagement}>
          <CollapsibleTable
            title={manageMode ? "문항 관리" : "문항 조회"}
            manageMode={manageMode}
            columns={manageMode ? columns.concat({}) : columns}
            rows={makeQuestionsRows(questions)}
          />
        </div>
      </div>
    </FlexEndContainer>
  );
};

export default ProjectDetail;

import React, { useState, useEffect } from "react";
import FlexEndContainer from "../../../../components/layout/FlexEndContainer";
import axios from "axios";
import CollapsibleTable, {
  createData,
} from "~/frontend/src/components/table/QuestionTable";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const columns = [
    { name: "과목", align: "inherit" },
    { name: "단원", align: "right" },
    { name: "문항명", align: "right" },
    { name: "출제자", align: "right" },
    { name: "출제일", align: "right" },
    { name: "그룹", align: "right" },
  ];
  useEffect(() => {
    axios.get("/api/v1/questions/").then((res) => {
      setQuestions(res.data);
    });
  }, []);
  return (
    <FlexEndContainer title="문항 조회">
      <CollapsibleTable columns={columns} rows={createData(questions)} />
    </FlexEndContainer>
  );
};

export default QuestionList;

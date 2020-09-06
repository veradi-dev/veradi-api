import React from "react";
import { useParams } from "react-router-dom";
import FlexEndContainer from "~/frontend/src/components/layout/FlexEndContainer";
const ProjectManage = () => {
  const { id } = useParams();
  return <FlexEndContainer title="프로젝트 관리">{id}</FlexEndContainer>;
};

export default ProjectManage;

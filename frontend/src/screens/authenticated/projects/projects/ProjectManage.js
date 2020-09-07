import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FlexEndContainer from "~/frontend/src/components/layout/FlexEndContainer";
import HorizontalTimeline from "~/frontend/src/components/timeline/HorizontalTimeline";

const ProjectManage = () => {
  const { id } = useParams();
  return (
    <FlexEndContainer title="프로젝트 관리">
      <HorizontalTimeline />
      <span>{id}</span>
    </FlexEndContainer>
  );
};

export default ProjectManage;

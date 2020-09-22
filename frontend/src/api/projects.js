import request, { createHeaders } from "./base";

export const deleteQuestionInProject = (data) => {
  if (data.projectId !== undefined && data.questionId !== undefined) {
    return request(
      "post",
      `api/v1/projects/${data.projectId}/deleteQuestions/`,
      data
    );
  } else {
    throw "Invalid data";
  }
};

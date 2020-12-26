export default function getSteps(project) {
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

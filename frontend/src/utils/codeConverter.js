const subjects = [
  {
    name: "국어",
    code: "COLO",
  },
  {
    name: "수학",
    code: "COMT",
  },
  {
    name: "물리학",
    code: "COPH",
  },
  {
    name: "화학",
    code: "COCH",
  },
  {
    name: "생명과학",
    code: "COBS",
  },
  {
    name: "지구과학",
    code: "COGS",
  },
];

export const subjectCodeConverter = (code) => {
  const target = subjects.find((subject) => subject.code === code);
  if (target !== undefined) {
    return target.name;
  } else {
    return "미정";
  }
};

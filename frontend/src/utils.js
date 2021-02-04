export const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return {
    year,
    month,
    day
  };
};

export const secondsToLocalTimeString = seconds => {
  const hour = parseInt(seconds / 3600);
  const min = parseInt((seconds % 3600) / 60);
  return `${hour}시간 ${min}분`;
};

export const toggleMode = mode => {
  // 만약 mode 가 수(1,2,3)이면 문자열(출근, 퇴근, 출입)으로 변환하고
  // 문자열(출근, 퇴근, 출입)이면 수(1,2,3)로 변환한다.
  if (mode === 1) {
    return "출근";
  } else if (mode === 2) {
    return "퇴근";
  } else if (mode === 3) {
    return "출입";
  } else if (mode === "출근") {
    return 1;
  } else if (mode === "퇴근") {
    return 2;
  } else if (mode === "출입") {
    return 3;
  } else {
    throw Error("잘못된 값입니다.");
  }
};

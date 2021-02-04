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


export function getPosition(user) {
  if (user.position=='평사원'){
      return 1
  }
  else if (user.position=='타스크장'){
      return 2
  }
  else if (user.position=='팀장'){
      return 3
  }
  else if (user.position=='실장'){
      return 4
  }
  else if (user.position=='사업부장'){
      return 5
  }
  else if (user.position=='본부장'){
      return 6
  }
  else if (user.position=='부사장'){
      return 7
  }
  else if (user.position=='사장'){
      return 8
  }
};

export function getTeamCode(team) {
  if (team === "물리학연구팀"){
    return "SCI_PH"
  }
  else if (team === "화학연구팀"){
    return "SCI_CH"
  }
  else if (team === "생명과학연구팀"){
    return "SCI_BS"
  }
  else if (team === "지구과학연구팀"){
    return "SCI_GS"
  }
  else if (team === "한국사연구팀"){
    return "CM_KH"
  }
  else if (team === "생활과윤리연구팀"){
    return "CM_LAE"
  }
  else if (team === "윤리와사상연구팀"){
    return "CM_AEI"
  }
  else if (team === "한국지리연구팀"){
    return "CM_KRG"
  }
  else if (team === "세계지리연구팀"){
    return "CM_WDG"
  }
  else if (team === "동아시아사연구팀"){
    return "CM_EAH"
  }
  else if (team === "세계사연구팀"){
    return "CM_WDH"
  }
  else if (team === "경제연구팀"){
    return "CM_ECN"
  }
  else if (team === "정치와법연구팀"){
    return "CM_PAL"
  }
  else if (team === "사회문화연구팀"){
    return "CM_SCT"
  }
  else if (team === "국어연구팀"){
    return "KR"
  }
  else if (team === "수학연구팀"){
    return "MT"
  }
  else if (team === "영어연구팀"){
    return "EG"
  }
  else if (team === "교육/인사팀"){
    return "MS_EPD"
  }	
  else if (team === "회계팀"){
    return "MS_FI"
  }
  else if (team === "법무팀"){
    return "MS_LAW"
  }
  else if (team === "총무팀"){
    return "MS_GA"
  }
  else if (team === "영상팀"){
    return "VDO"
  }
  else if (team === "기술개발팀"){
    return "TDD"
  }
  else if (team === "디자인팀"){
    return "DDB"
  }
}
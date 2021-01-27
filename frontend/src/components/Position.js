function Position(user) {
    if (user.position==='평사원'){
        return 1
    }
    else if (user.position==='타스크장'){
        return 2
    }
    else if (user.position==='팀장'){
        return 3
    }
    else if (user.position==='실장'){
        return 4
    }
    else if (user.position==='사업부장'){
        return 5
    }
    else if (user.position==='본부장'){
        return 6
    }
    else if (user.position==='부사장'){
        return 7
    }
    else if (user.position==='사장'){
        return 8
    }
  }

  export default Position;
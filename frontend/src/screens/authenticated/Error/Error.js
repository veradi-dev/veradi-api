import React from "react";
import "./Error.css";

function Error() {
  return (
    <div className="error-page-con">
      <div className="error-contents-con">
        <div className="error-description">
          <p>오류가 발생했습니다.</p>
          <p>이 페이지는 없는 페이지입니다.</p>
        </div>
        <button
          className="error-goto-btn"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Go To Home
        </button>
      </div>
    </div>
  );
}

export default Error;

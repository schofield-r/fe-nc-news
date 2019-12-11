import React from "react";

const ErrorMessages = err => {
  return (
    <section>
      <p>
        {err.err.status} {err.err.msg}
        <img src={`https://http.cat/${err.err.status}`} />
      </p>
    </section>
  );
};

export default ErrorMessages;

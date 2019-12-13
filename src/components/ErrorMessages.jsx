import React from "react";

const ErrorMessages = err => {
  return (
    <section>
      <p>
        {err.err.status} {err.err.msg} <br></br>
        <img src={`https://http.cat/${err.err.status}`} alt='error cat' height='200px' width='300px'/>
      </p>
    </section>
  );
};

export default ErrorMessages;

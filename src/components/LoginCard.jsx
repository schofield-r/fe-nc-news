import React from 'react';

function LoginCard(props) {
  return (
    <div>
      Log in
       with an existing username or <br></br>
      <Link to='/create-new-user'>create a new user</Link>
    </div>
  );
}

export default LoginCard;
import React from "react";

function Messages(props)
{
  if (props.message === 'success') {
    return (
      <div className="alert alert-success" role="alert">
        Success!
      </div>
    )
  }
  if (props.message === 'danger') {
    return (
      <div className="alert alert-danger" role="alert">
        Check password
      </div>
    )
  }
}

export default Messages;
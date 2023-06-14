import React from 'react';

function Button({ onClick, disabled, isVisible }) {
  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className="buttonload"
      onClick={onClick}
      disabled={disabled}
    >
      Load more
    </button>
  );
}

export default Button;

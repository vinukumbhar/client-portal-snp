import React from 'react';

const Test = () => {
  const handleSubmit = () => {
    window.location.href = 'https://secure.cpacharge.com/pages/snptaxandfinancials1/test-card';
  };

  return (
    <div>
      test
      <button onClick={handleSubmit}>Payment</button>
    </div>
  );
};

export default Test;

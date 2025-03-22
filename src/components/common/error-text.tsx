import React from 'react';

const ErrorText = ({ id, text }: { id: string; text: string }) => {
  const formMessageId = `${id}-form-item-message`;

  return (
    <p
      id={`${formMessageId}`}
      className="text-xs font-medium leading-none text-destructive"
    >
      {text}
    </p>
  );
};

export default ErrorText;

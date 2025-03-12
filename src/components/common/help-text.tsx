import React from 'react';

const HelpText = ({ id, text }: { id: string; text: string }) => {
  const formMessageId = `${id}-form-item-message`;

  return (
    <p
      id={`${formMessageId}`}
      className="text-xs leading-none text-muted-foreground"
    >
      {text}
    </p>
  );
};

export default HelpText;

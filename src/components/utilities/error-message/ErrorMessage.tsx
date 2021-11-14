import React from 'react';
import './error-message.scss';
import { BiErrorCircle } from 'react-icons/bi';

interface IErrorMessageOwnProps {
  message: string;
}

const ErrorMessage: React.FC<IErrorMessageOwnProps> = ({
  message
}): JSX.Element => {
  return (
    <p className='error-block'>
      <BiErrorCircle />
      {message}
    </p>
  );
};

export default ErrorMessage;

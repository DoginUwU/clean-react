import { FocusEvent, useContext } from 'react';
import Styles from './input-styles.scss'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  errorMessage?: string;
}

const Input: React.FC<Props> = (props: Props) => {
  const handleEnableInput = (event: FocusEvent<HTMLInputElement>) =>
    event.target.readOnly = false;
  
  const handleStatus = (): string => {
    return '🔴';
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={handleEnableInput} />
      <span title={props.errorMessage} data-testid="status">{handleStatus()}</span>
    </div>
  );
};

export default Input;
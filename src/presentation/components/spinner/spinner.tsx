import { HTMLAttributes } from 'react';
import Styles from './spinner-styles.scss';

type Props = HTMLAttributes<HTMLElement>

const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <div {...props} className={[Styles.spinner, props.className].join(" ")}>
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;

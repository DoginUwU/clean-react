import Spinner from "../spinner/spinner";
import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner />
    </div>
  );
}

export default FormStatus;
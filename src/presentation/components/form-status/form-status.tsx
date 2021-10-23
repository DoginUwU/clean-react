import Context from '@/presentation/contexts/form/form-context';
import { useContext } from 'react';
import Spinner from "../spinner/spinner";
import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { isLoading } = useContext(Context);

  return (
    <div className={Styles.errorWrap} data-testid="error-wrap">
      {isLoading && <Spinner />}
    </div>
  );
}

export default FormStatus;
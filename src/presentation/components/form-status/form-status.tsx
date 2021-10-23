import Spinner from "../spinner/spinner";
import Styles from './form-status-styles.scss'

interface Props extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  isLoading?: boolean;
}

const FormStatus: React.FC<Props> = ({ isLoading, ...others }: Props) => {
  return (
    <div className={Styles.errorWrap} data-testid="error-wrap" {...others}>
      {isLoading && <Spinner />}
    </div>
  );
};

export default FormStatus;
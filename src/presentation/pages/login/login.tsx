import Styles from './login-styles.scss'
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from '@/presentation/components';
import { FocusEvent, FormEvent, useEffect, useState } from 'react';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/usecases';
import toast from 'react-hot-toast';

type StateProps = {
  isLoading?: boolean;
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
};

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    });
  }, [state.email, state.password]);

  const handleInputChange = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleSubmitDisabled =
    state.isLoading || !!state.emailError || !!state.passwordError;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleSubmitDisabled)
      return
    
    setState({
      ...state,
      isLoading: true
    });

    authentication.auth({
      email: state.email,
      password: state.password
    }).then(() => {
    }).catch(error => {
      toast.error(error.message);
    }).finally(() => { 
      setState({
        ...state,
        isLoading: false
      });
    });
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form data-testid="form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <Input
          type="email"
          name="email"
          placeholder="Digite seu email"
          onChange={handleInputChange}
          errorMessage={state.emailError}
          data-testid="email"
        />
        <Input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          onChange={handleInputChange}
          errorMessage={state.passwordError}
          data-testid="password"
        />
        <button
          type="submit"
          data-testid="submit"
          disabled={handleSubmitDisabled}
        >
          Entrar
        </button>

        <span className={Styles.link}>Criar conta</span>
        <FormStatus isLoading={state.isLoading} />
      </form>
      <Footer />
    </div>
  );
};

export default Login
import Styles from './login-styles.scss'
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from '@/presentation/components';
import { FocusEvent, useEffect, useState } from 'react';
import { Validation } from '@/presentation/protocols/validation';

type StateProps = {
  isLoading?: boolean;
  email: string;
  password: string;
  errorMessage?: string;
  emailError: string;
  passwordError: string;
};

type Props = {
  validation: Validation;
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    email: '',
    password: '',
    errorMessage: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório'
  });

  useEffect(() => {
    validation.validate({
      email: state.email,
    })
  }, [state.email])

  useEffect(() => {
    validation.validate({
      password: state.password
    });
  }, [state.password]);

  const handleInputChange = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form>
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
        <button type="submit" data-testid="submit" disabled>
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
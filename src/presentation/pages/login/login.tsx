import Styles from './login-styles.scss'
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from '@/presentation/components';
import { useState } from 'react';

type StateProps = {
  isLoading?: boolean;
  errorMessage?: string;
  emailError: string;
  passwordError: string;
};

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório'
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />
        <form>
          <h2>Login</h2>

          <Input
            type="email"
            name="email"
            placeholder="Digite seu email"
            errorMessage={state.emailError}
          />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            errorMessage={state.passwordError}
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
}

export default Login
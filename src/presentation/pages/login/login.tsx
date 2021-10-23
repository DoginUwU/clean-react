import Styles from './login-styles.scss'
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{}}>
        <form>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button type="submit">Entrar</button>

          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
}

export default Login
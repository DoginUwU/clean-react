import '@/presentation/styles/colors.scss'
import Spinner from '@/presentation/components/spinner/spinner';
import Styles from './login-styles.scss'


const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header>
        <img src="./images/logo.svg" alt="logo" />
        <h1>4Dev - Enquetes para Programadores</h1>
      </header>
      <form>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu email" />
          <span>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="Digite sua senha"/>
          <span>🔴</span>
        </div>
        <button type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner />
        </div>
      </form>
      <footer />
    </div>
  );
}

export default Login
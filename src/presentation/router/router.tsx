import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Login } from '../pages'

import '@/presentation/styles/global.scss'
import { Toaster } from 'react-hot-toast'

const Router: React.FC = () => {
    return (
        <BrowserRouter>
          <Toaster />
          <Switch>
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
    );
}

export default Router;
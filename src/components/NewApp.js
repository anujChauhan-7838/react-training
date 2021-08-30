import {BrowserRouter , Route, Switch} from 'react-router-dom';
import Signup from './Signup';
import Home from './Home';
import PageNotFound from './PageNotFound';
import Nav from './Nav';
import Signin from './Signin';
import Search from './Search';
import Admin from './Admin';
import Cart from './Cart';
import Forgot from './Forgot';
import Otpverify from './Optiverify';
import Cakeview from './Cakeview';





function NewApp(){
    return (
          <div>
              <BrowserRouter>
              <div>
              <Nav></Nav>
              <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/search/:searchBy" component={Search} />
              <Route exact path="/view-cake/:cakeSlug" component={Cakeview} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/forgot" component={Forgot} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/otp-verify" component={Otpverify} />
              <Route exact path="/*" component={PageNotFound} />
              </Switch>
              </div>
              </BrowserRouter>
          </div>
    )
}

export default NewApp;
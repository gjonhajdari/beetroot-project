import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import NavBar from './layouts/NavBar';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './dashboard';
import PrivateRoute from './common/PrivateRoute';
import CreateProfile from './dashboard/CreateProfile';
import EditProfile from './dashboard/EditProfile';
import AddExperience from './dashboard/AddExperience';
import AddEducation from './dashboard/AddEducation';

class App extends Component {

    render() {
        return (
         <div className="wrap">
             <NavBar/>
              <div className="wrap-center">
                     <Route exact path='/' component={Home} />
                     <PrivateRoute path='/create-profile' component={CreateProfile}/>
                     <PrivateRoute  path='/dashboard' component={Dashboard} />
                     <PrivateRoute path='/edit-profile' component={EditProfile}/>
                     <PrivateRoute  path='/add-experience' component={AddExperience} />
                     <PrivateRoute  path='/add-education' component={AddEducation} />

                     <Route  path='/register' component={Register} />
                     <Route  path='/login' component={Login} />
               </div>
              <Footer />
          </div>
        );
      }
}

export default App;

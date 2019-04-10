import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { connect } from 'react-redux';
import Controls from '../Controls';
import Schedule from '../Schedule';
import Confirmation from '../Confirmation';
import SignIn from '../SignIn';
import { signUserOut } from '../../actions';
import { signInUser } from '../../thunks/signInUser';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Availability } from '../Availability';

export class App extends Component {
  componentDidMount() {
    this.checkUser();
  }

  checkUser = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.props.signInUser(user.uid);
      }
    });
  }

  handleSignOut = async () => {
    await firebase.auth().signOut();
    this.props.signUserOut();
  };

  render() {
    const { user } = this.props;
    return (
      <div className="App">
        <Sidebar />
        <div>
          <header>
          </header>
          {
            user.id &&
            <React.Fragment>
              <button onClick={this.handleSignOut}>
                Sign Out
              </button>
              <Availability />

              <Switch>
                <Route path="/schedule" component={Schedule} />
                <Route path="/book-pairing" component={Controls} />
                <Route path="/confirm" component={Confirmation}/>
                <Route exact path="/" render={() => <div>path: /</div>} />
                <Route render={() => <div>ERRORRRRRRRR</div>} />
              </Switch>
            </React.Fragment>
          }
          {!user.id && <SignIn history={this.props.history} />}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  isLoading: state.isLoading,
  hasError: state.hasError,
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  signInUser: (id) => dispatch(signInUser(id)),
  signUserOut: () => dispatch(signUserOut())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

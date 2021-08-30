import MainHeader from "./components/main-header/MainHeader";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogInPage from "./components/login-page/LogInPage";
import SignUpPage from "./components/signup-page/SignUpPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <MainHeader />
          </div>
        </Route>

        <Route path="/signup">
          <SignUpPage />
        </Route>

        <Route path="/login">
          <LogInPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

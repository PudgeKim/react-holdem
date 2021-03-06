import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogInPage from "./components/login-page/LogInPage";
import SignUpPage from "./components/signup-page/SignUpPage";
import GameRoomPage from "./components/game-room/GameRoomPage";
import MakeRoomPage from "./components/make-room-page/MakeRoomPage";
import MainPage from "./components/main-page/MainPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>

        <Route path="/signup">
          <SignUpPage />
        </Route>

        <Route path="/login">
          <LogInPage />
        </Route>

        <Route path="/make-room">
          <MakeRoomPage />
        </Route>

        <Route path="/game-room">
          <GameRoomPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

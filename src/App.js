import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './styles/theme.scss';
import BookList from './containers/BookList';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/">
              <BookList />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

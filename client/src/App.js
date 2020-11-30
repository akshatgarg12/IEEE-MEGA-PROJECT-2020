import {
  BrowserRouter as Router,
  Switch, Route} from 'react-router-dom';
import './App.css';
import HomePage from './components/organisms/homePage';

function App() {
  return (
    <Router>
      <div className="App">
      <h1>navbar</h1>
          <Switch>
            <Route exact path="/" component = {HomePage}/>
            <Route path="/search_amazon" component = {()=><h1>search_amazon</h1>}/>
            <Route path="/product_review" component = {()=><h1>product_review</h1>}/>
          </Switch>
        <h1>footer</h1>
      </div>
    </Router>
  );
}

export default App;

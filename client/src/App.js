import {
  BrowserRouter as Router,
  Switch, Route} from 'react-router-dom';
import './App.css';
import HomePage from './components/organisms/homePage';
import ProductPage from './components/organisms/productsPage';
import ReviewPage from './components/organisms/reviewPage';
import Footer from './components/templates/footer';
import CustomNavbar from './components/templates/navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <CustomNavbar />
          <Switch>
            <Route exact path="/" component = {HomePage}/>
            <Route path="/products" component = {ProductPage}/>
            <Route path="/review" component = {ReviewPage}/>
          </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

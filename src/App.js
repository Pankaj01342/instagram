import './App.css';
import Posts from './Posts';
import Footer from './Footer';
import ImageUpload from './ImageUpload';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
    
      <Switch>
        <Route exact path = "/">
          <Posts />
        </Route>
      </Switch> 


      <Switch>
          <Route exact path = "/imageUpload">
            <ImageUpload />
          </Route>
      </Switch>

      
      <Footer />

    </Router>
  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { CharacterSearch } from './CharacterSearch';

export default function App() {
  return (    
    
      <Router>
        <Routes>
          <Route path='/' element={<CharacterSearch />} />
        </Routes>    
      </Router>
  );
}

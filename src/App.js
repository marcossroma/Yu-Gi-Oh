import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CardList from './components/CardList';
import CardDetail from './components/CardDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<CardList />} />
        <Route path="/card/:id" element={<CardDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

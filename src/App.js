import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Carausel from './components/Carausel';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className='mainContainer'>
         <div className='heading-text'>
           <h1>Featured Products</h1>
           <h6>Explore and discover a variety of products</h6>
         </div>
         <Carausel></Carausel>
      </div>
    </div>
  );
}

export default App;

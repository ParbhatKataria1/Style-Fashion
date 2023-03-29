import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import AllRoutes from './Components/AllRoutes';
import ProductDetails from './Pages/ProductDetails';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <AllRoutes/>
      <ProductDetails/>
    </div>
  );
}

export default App;

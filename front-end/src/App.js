import './App.css';
import Navbar from './Components/Navbar';
import AllRoutes from './Components/AllRoutes';
import ProductDetails from './Pages/ProductDetails';

function App() {
  return (
    <div className="App AppFont">
      <Navbar/>
      <AllRoutes/>
      <ProductDetails/>
    </div>
  );
}

export default App;

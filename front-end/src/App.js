import './App.css';
import Navbar from './Components/Navbar';
import AllRoutes from './Components/AllRoutes';
import DashBoard from './Pages/DashBoard';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <AllRoutes/>
      <DashBoard/>
    </div>
  );
}

export default App;

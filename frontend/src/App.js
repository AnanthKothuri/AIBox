import './App.css';
import DetailsBar from './components/DetailsBar';
import NavigationBar from './components/Navbar';
import ResearchRAGScreen from './screens/ResearchRAG';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <DetailsBar/>
      <ResearchRAGScreen/>
    </div>
  );
}

export default App;

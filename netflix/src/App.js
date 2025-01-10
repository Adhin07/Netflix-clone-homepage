import './App.css';
import Banner from './Components/Banner/Banner';
import NavBar from './Components/NavBar/NavBar';
import Rowpost from './Components/RowPost/Rowpost';
import { actions, ComedyMovies, Documentaries, HorrorMovies, originals, RomanceMovies, trending } from './urls';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <Rowpost title='Netflix Original' url={originals}/>
      <Rowpost title='Action' isSmall url={actions}/>
      <Rowpost title='trending' isSmall url={trending}/>
      <Rowpost title='Comedy' isSmall url={ComedyMovies}/>
      <Rowpost title='Horror' isSmall url={HorrorMovies}/>
      <Rowpost title='Romance' isSmall url={RomanceMovies}/>
      <Rowpost title='Documentaries' isSmall url={Documentaries}/>


    </div>
  );
}

export default App;

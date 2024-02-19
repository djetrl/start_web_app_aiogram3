import {Routes, Route} from 'react-router-dom';
import ApplicationsList from "./page/applicationsList";
import ApplicationForm from './page/applicationform';
import imgHeader from './asset/img/imageheaderbg.png';
function App() {
  return (
    <>
        <header className="header">
          <img src={imgHeader}/>
        </header>
        <div className="container">
        <Routes>  
          <Route  path='/form' Component={ApplicationForm}  />
          <Route path='*' Component={ApplicationsList} />;   
        </Routes>
    </div>
    </>
  );
}

export default App;

// import logo from './logo.svg';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Itinerary from "./components/Itinerary/Itinerary";


function App() {
  return (
    <div className="App">
         <Header />
          <Switch>
            <Route exact path="/" exact component={Home}/>
            <Route exact path="/itinerary" component={Itinerary} />
            {/* <Route path="/upload" component={Upload} />
            <Route path="/videos/:id" 
            render={(reactRouterDomProps) =>{
              return (
                <Home
                {...reactRouterDomProps}
                />
              )
            }}>
            </Route> */}
          </Switch>
    </div>
  );
}

export default App;

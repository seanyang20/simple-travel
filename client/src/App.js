// import logo from './logo.svg';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Itinerary from "./components/Itinerary/Itinerary";
import SelectedItinerary from "./components/SelectedItinerary/SelectedItinerary";
import User from "./components/User/User";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import AddItinerary from "./pages/AddItinerary/AddItinerary";
import EditItinerary from "./pages/EditItinerary/EditItinerary";
import DeleteItinerary from "./pages/DeleteItinerary/DeleteItinerary";


function App() {
  return (
    <div className="App">
         <Route component={Header} />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/itinerary" component={Itinerary} />
            <Route exact path="/itinerary/:id" component={SelectedItinerary} />
            <Route exact path="/users/:id" component={User} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/addItinerary/:id" component={AddItinerary} />
            <Route exact path="/editItinerary/:id" component={EditItinerary} />
            <Route exact path="/deleteItinerary/:id" component={DeleteItinerary} />
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

// import logo from './logo.svg';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header"


function App() {
  return (
    <div className="App">
         <Header />
          <Switch>
            <Route path="/" exact component={Home}/>
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

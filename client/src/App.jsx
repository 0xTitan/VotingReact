import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Account from "./components/Account/AccoutInfo";
import Worflow from "./components/Worflow/Workflow";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Account />
          <hr />
          <Worflow />
          <hr />
          {/* <Demo /> */}
          <hr />
          {/* <Footer /> */}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;

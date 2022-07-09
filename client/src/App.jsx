import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Account from "./components/Account/AccoutInfo";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Account />
          <hr />
          {/* <Setup /> */}
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

import React from "react";
import Body from "./components/Body/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <React.Fragment>
      <Provider  store={appStore}>
        <Body />
      </Provider>
    </React.Fragment>
  );
}

export default App;

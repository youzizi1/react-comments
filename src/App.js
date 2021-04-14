import React, { Component } from "react";
import { Provider } from "react-redux";

import store from './store'
import CommentInputContainer from "./container/CommentInputContainer";
import CommentsListContainer from './container/CommentsListContainer'
class App extends Component {
  

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <CommentInputContainer />
          <CommentsListContainer />
        </Provider>
      </div>
    );
  }
}

export default App;

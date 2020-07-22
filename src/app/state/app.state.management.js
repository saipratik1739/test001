import React, { Component } from "react";
import AppContext from "../context/app.context";

class AppProvider extends Component {
  // this the GLOBAL APPLICATION STATE
  // use this UUID for demo: cb7a56d9-ba48-4a68-a93d-7fccccad67bf
  state = {
    tokens: {},
    selectedGroupObj: {},
    selectedTinObj: {},
    specialtyList: [],
    UUID: null,
    contractingGroupsList: [],
    setUUID: uuid => {
      this.setState({ UUID: uuid });
    },
    setTokens: tokens_data => {
      this.setState({ tokens: tokens_data });
    },
    setSelectedGroupObj: groupObj => {
      this.setState({
        selectedGroupObj: groupObj,
        selectedTinObj: {}
      });
    },
    setSelectedTinObj: tinObj => {
      this.setState({ selectedTinObj: tinObj });
    },
    setSpecialtyList: specialtyList => {
      this.setState({ specialtyList: specialtyList });
    },
    setcontractingGroupsList: contractingGroupsList => {
      this.setState({ contractingGroupsList: contractingGroupsList });
    },
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;

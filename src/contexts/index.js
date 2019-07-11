import React, { Component, createContext } from "react";

const Context = createContext();

const { Provider, Consumer: DataConsumer } = Context;

class DataProvider extends Component {
  state = { data: {}, pos: {} };
  actions = {
    setData: data => this.setState({ data }),
    setToken: token => this.setState({ token }),
    setPos: pos => this.setState({ pos })
  };
  render() {
    const { state, actions } = this;
    const value = { state, actions };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

function useData(WrappedComponent) {
  return function useData(props) {
    return (
      <DataConsumer>
        {({ state, actions }) => (
          <WrappedComponent data={state} actions={actions} />
        )}
      </DataConsumer>
    );
  };
}

export { DataProvider, DataConsumer, useData };

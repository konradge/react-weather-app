import React from "react";
import WeatherWidget from "./WeatherWidget";

import "./style.css";
export default class App extends React.Component {
  state = {
    widgets: [this.buildWidget(true, "main"), this.buildWidget(false)]
  };

  buildWidget(autoSearch, id) {
    return (
      <WeatherWidget
        addWidget={this.addWidget.bind(this)}
        key={id ? id : new Date()}
        id={id ? id : new Date()}
        onDelete={this.deleteWidget.bind(this)}
        coordSearch={autoSearch}
      />
    );
  }

  addWidget() {
    this.state.widgets.push(this.buildWidget());
    this.setState({
      widgets: this.state.widgets
    });
  }
  deleteWidget(id) {
    this.setState({
      widgets: this.state.widgets.filter(elem => elem.props.id !== id)
    });
  }
  render() {
    let elems = this.state.widgets.map(elem => elem);
    return <div>{elems}</div>;
  }
}

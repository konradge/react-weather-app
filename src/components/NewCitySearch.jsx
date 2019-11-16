import React from "react";

export default class NewCitySearch extends React.Component {
  state = { searchTerm: "" };
  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      this.props.getWeather(this.state.searchTerm);
      this.setState({ searchTerm: "" });
    }
  }

  render() {
    return (
      <div className="widget search">
        <div className="ui icon header">
          <i className="search icon"></i>
          New City
        </div>
        <div className="field">
          <div className="ui search">
            <div className="ui icon input">
              <input
                className="prompt"
                type="text"
                placeholder="Type in city name..."
                value={this.state.searchTerm}
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.keyPress.bind(this)}
              />
              <i className="search icon"></i>
            </div>
            <div>{this.props.message}</div>
          </div>
        </div>
      </div>
    );
  }
}

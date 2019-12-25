import React, { Component } from "react";

export default class Modal extends Component {
  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return <div class="container">omar abdedaim</div>;
  }
}

const container = document.createElement("div");
document.body.appendChild(container);

import React, { Component } from "react";

export default class PopUp extends Component {
  constructor(props) {
    super(props);

    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      soldPrice: 0,
    };
  }

  handleAjouterb = (id_user) => {
    this.setState(
      {
        openPopupAjout: true,
        id_user,
      },
      () => {
        this.fetchingPopup(
          this.state.id_user,
          this.state.identifiant_user,
          this.state.nom_user
        );
      }
    );
  };

  handleClick = () => {
    this.setState({
      isOpen: false,
    });
  };

  onChangePrice(e) {
    this.setState({
      soldPrice: e.target.value,
    });
  }

  onClose() {
    this.setState({
      seen: !this.state.seen,
    });
  }

  onSubmit(e) {
    e.preveDefault();

    console.log(this.state.soldPrice);
    this.setState({
      soldPrice: e.target.value,
    });
  }

  render() {
    return (
      <div id="dSolding">
        <button id="modal" onClick={this.onClose}>
          X
        </button>

        <h3 id="hPopup">Sold Peice</h3>
        <form onSubmit={this.onSubmit}>
          <div id="divSize">
            <label id="lInput">Sold price </label>
            <input
              type="text"
              required
              id="pInput"
              value={this.state.soldPrice}
              onChange={this.onChangePrice}
            />
          </div>
          <input className="button" id="sButton" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

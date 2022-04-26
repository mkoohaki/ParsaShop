import React, { Component } from "react";

export default class PopUp extends Component {
  constructor(props) {
    super(props);

    this.onChangePrice = this.onChangePrice.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      type: "",
      brand: "",
      model: "",
      color: "",
      sex: "",
      size: {
        4: false,
        4.5: false,
        5: false,
        5.5: false,
        6: false,
        6.5: false,
        7: false,
        7.5: false,
        8: false,
        8.5: false,
        9: false,
        9.5: false,
        10: false,
        10.5: false,
        11: false,
        11.5: false,
        12: false,
        12.5: false,
        13: false,
        13.5: false,
        14: false,
        XS: false,
        S: false,
        M: false,
        L: false,
        XL: false,
        XXL: false,
        XXXL: false,
      },
      description: "",
      qty: 0,
      buyFrom: "",
      buyPrice: 0.0,
      buyDate: new Date(),
      soldPrice: 0.0,
      soldDate: 0,
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
    window.location = "/";
  }

  onSubmit(e) {
    // e.preveDefault();

    console.log(this.state.id_user);
    // this.setState({
    //   soldPrice: e.target.value,
    // });
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

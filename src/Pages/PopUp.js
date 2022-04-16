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

  onSubmit(e) {
    e.preveDefault();

    console.log(this.state.soldPrice);
    this.setState({
      soldPrice: e.target.value,
    });
  }

  render() {
    return (
      <div
        className="modal"
        onClose={this.handleClose}
        {...this.state}
        isOpen={this.state.openPopupAjout}
      >
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <form onSubmit={this.onSubmit}>
            <h3>SOld Peice</h3>
            <label>
              Sold price
              <input
                type="text"
                required
                value={this.state.soldPrice}
                onChange={this.onChangePrice}
              />
            </label>
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

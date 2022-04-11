import React, { Component } from "react";
import axios from "axios";
import "../form.css";

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      type: "",
      brand: "",
      model: "",
      color: "",
      sex: "",
      size: {
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
        14.5: false,
      },
      description: "",
      year: 2000,
      price: 0.0,
    };
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }
  onChangeBrand(e) {
    this.setState({
      brand: e.target.value,
    });
  }
  onChangeModel(e) {
    this.setState({
      model: e.target.value,
    });
  }
  onChangeColor(e) {
    this.setState({
      color: e.target.value,
    });
  }
  onChangeSex(e) {
    this.setState({
      sex: e.target.value,
    });
  }
  onChangeSize(e) {
    let state = this.state;
    state.size[e.target.value] = e.target.checked;
    this.setState({ state });
    console.log(this.state.size);
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeYear(e) {
    this.setState({
      year: e.target.value,
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const item = {
      type: this.state.type,
      brand: this.state.brand,
      model: this.state.model,
      color: this.state.color,
      sex: this.state.sex,
      size: this.state.size,
      description: this.state.description,
      year: this.state.year,
      price: this.state.price,
    };

    axios
      .post("http://localhost:5000/items/add", item)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div id="item">
        <h3>Creating New Item</h3>
        <form onSubmit={this.onSubmit}>
          <div className="divs">
            <label>Type</label>
            <select
              required
              value={this.state.type}
              onChange={this.onChangeType}
            >
              <option value="" selected disabled hidden>
                Select Type
              </option>
              <option>Shoes</option>
              <option>Shirt</option>
              <option>Pantalon</option>
              <option>Others</option>
            </select>
          </div>
          <div className="divs">
            <label>Brand</label>
            <input
              type="text"
              required
              value={this.state.brand}
              onChange={this.onChangeBrand}
            />
          </div>
          <div className="divs">
            <label>Model</label>
            <input
              type="text"
              required
              value={this.state.model}
              onChange={this.onChangeModel}
            />
          </div>
          <div className="divs">
            <label>Color</label>
            <input
              type="text"
              required
              value={this.state.color}
              onChange={this.onChangeColor}
            />
          </div>
          <div className="divs">
            <label>Sex</label>
            <input
              type="text"
              required
              value={this.state.sex}
              onChange={this.onChangeSex}
            />
          </div>
          <div className="divs">
            <div id="dSize">
              <label>Size</label>
            </div>
            <div className="dCheckBox">
              <div id="dCheckBox1">
                <label className="lCheckBox">6</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="6"
                  onChange={this.onChangeSize}
                />
                <label className="lCheckBox">6.5</label>
                <input
                  type="checkbox"
                  value="6.5"
                  onChange={this.onChangeSize}
                />
                <label className="lCheckBox">7</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="7"
                  onChange={this.onChangeSize}
                />
                <label className="lCheckBox">7.5</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="7.5"
                  onChange={this.onChangeSize}
                />
                <label className="lCheckBox">8</label>
                <input type="checkbox" value="8" onChange={this.onChangeSize} />
                <label className="lCheckBox">8.5</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="8.5"
                  onChange={this.onChangeSize}
                />
              </div>
              <div id="dCheckBox2">
                <label className="lCheckBox">9</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="9"
                  onChange={this.onChangeSize}
                />
                <label className="lCheckBox">9.5</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="9.5"
                  onChange={this.onChangeSize}
                />
                <label className="lCheckBox">10</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="10"
                  onChange={this.onChangeSize}
                />
                <label className="lCheckBox">10.5</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="10.5"
                  onChange={this.onChangeSize}
                />
                <label className="lCheckBox">11</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="11"
                  onChange={this.onChangeSize}
                />
                <label className="lCheckBox">11.5</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="11.5"
                  onChange={this.onChangeSize}
                />
              </div>
              <div id="dCheckBox3">
                <label className="lCheckBox">12</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="12"
                  onChange={this.onChangeSize}
                />
                <label className="lCheckBox">12.5</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="12.5"
                  onChange={this.onChangeSize}
                />
                <label className="lCheckBox">13</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="13"
                  onChange={this.onChangeSize}
                />
                <label className="lCheckBox">13.5</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="13.5"
                  onChange={this.onChangeSize}
                />
                <label className="lCheckBox">14</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="14"
                  onChange={this.onChangeSize}
                />
                <label className="lCheckBox">14.5</label>
                <input
                  type="checkbox"
                  checked={this.state.size.value}
                  value="14.5"
                  onChange={this.onChangeSize}
                />
              </div>
            </div>
          </div>

          <div className="description">
            <label>Description</label>
            <input
              type="text"
              required
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="divs">
            <label>Year</label>
            <input
              type="text"
              required
              value={this.state.year}
              onChange={this.onChangeYear}
            />
          </div>
          <div className="divs">
            <label>Price</label>
            <input
              type="text"
              required
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </div>
          <div>
            <input className="button" type="submit" value="Add New Item" />
          </div>
        </form>
      </div>
    );
  }
}

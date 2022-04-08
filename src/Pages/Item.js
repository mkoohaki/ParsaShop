import React, { Component } from "react";
import axios from "axios";

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
      size: [],
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
    this.setState({
      size: e.target.value,
    });
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
      <div>
        <h3>Creating New Item</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Type</label>
            <select
              required
              value={this.state.type}
              onChange={this.onChangeType}
            >
              <option>Shoes</option>
              <option>Shirt</option>
              <option>Pantalon</option>
              <option>Others</option>
            </select>
          </div>
          <div>
            <label>Brand</label>
            <input
              type="text"
              required
              value={this.state.brand}
              onChange={this.onChangeBrand}
            />
          </div>
          <div>
            <label>Model</label>
            <input
              type="text"
              required
              value={this.state.model}
              onChange={this.onChangeModel}
            />
          </div>
          <div>
            <label>Color</label>
            <input
              type="text"
              required
              value={this.state.color}
              onChange={this.onChangeColor}
            />
          </div>
          <div>
            <label>Sex</label>
            <input
              type="text"
              required
              value={this.state.sex}
              onChange={this.onChangeSex}
            />
          </div>
          <div>
            <label>Size</label>
            <input
              type="text"
              required
              value={this.state.size}
              onChange={this.onChangeSize}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              required
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div>
            <label>Year</label>
            <input
              type="text"
              required
              value={this.state.year}
              onChange={this.onChangeYear}
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="text"
              required
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </div>
          <div>
            <input type="submit" value="Add New Item" />
          </div>
        </form>
      </div>
    );
  }
}

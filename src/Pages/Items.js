import React, { Component } from "react";
import axios from "axios";

const Item = (props) => (
  <tr>
    <td>{props.item.type}</td>
    <td>{props.item.brand}</td>
    <td>{props.item.model}</td>
    <td>{props.item.color}</td>
    <td>{props.item.sex}</td>
    <td>{props.item.size}</td>
    <td>{props.item.description}</td>
    <td>{props.item.year}</td>
    <td>${props.item.price}</td>
  </tr>
);

export default class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/items").then((res) => {
      this.setState({
        items: res.data,
      });
    });
  }

  itemsList() {
    return this.state.items.map((currentItem) => {
      return <Item item={currentItem} key={currentItem._id} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Items List</h3>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Color</th>
              <th>Sex</th>
              <th>Size</th>
              <th>Description</th>
              <th>Year</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{this.itemsList()}</tbody>
        </table>
      </div>
    );
  }
}

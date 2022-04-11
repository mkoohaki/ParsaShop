import React, { Component } from "react";
import axios from "axios";

const Item = (props) => (
  <tr>
    <td className="column1">{props.item.type}</td>
    <td className="column2">{props.item.brand}</td>
    <td className="column3">{props.item.model}</td>
    <td className="column4">{props.item.color}</td>
    <td className="column5">{props.item.sex}</td>
    <td className="column6">
      {Object.entries(props.item.size).map(([key, value]) => {
        if (value === true) return key + " / ";
      })}
    </td>
    <td className="column7">{props.item.description}</td>
    <td className="column8">{props.item.year}</td>
    <td className="column9">${props.item.price}</td>
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
      // const rawSize = Object.entries(res.data.size);
      // const size = rawSize.filter(([key, value]) => value === true);
      // const newSize = rawSize[key];
      // res.data.map(obj => {
      //   const newSize = obj.key )

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
      <div className="limiter">
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table100">
              <table>
                <thead>
                  <tr className="table100-head">
                    <th className="column1">Type</th>
                    <th className="column2">Brand</th>
                    <th className="column3">Model</th>
                    <th className="column4">Color</th>
                    <th className="column5">Sex</th>
                    <th className="column6">Size</th>
                    <th className="column7">Description</th>
                    <th className="column8">Year</th>
                    <th className="column9">Price</th>
                  </tr>
                </thead>
                <tbody>{this.itemsList()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

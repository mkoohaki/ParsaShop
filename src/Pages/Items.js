import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "../form.css";
import { parseISO, format } from "date-fns";

const Item = (props) => (
  <tr>
    <td className="column1" onClick={() => props.openDetail(props.item._id)}>
      {props.item.type}
    </td>
    <td className="column2" onClick={() => props.openDetail(props.item._id)}>
      {props.item.brand}
    </td>
    <td className="column3" onClick={() => props.openDetail(props.item._id)}>
      {props.item.model}
    </td>
    <td className="column4" onClick={() => props.openDetail(props.item._id)}>
      {props.item.color}
    </td>
    <td className="column5" onClick={() => props.openDetail(props.item._id)}>
      {props.item.sex}
    </td>
    <td className="column6" onClick={() => props.openDetail(props.item._id)}>
      {Object.entries(props.item.size)
        .filter(([key, value]) => value === true)
        .map(([key, value], i, arr) => {
          if (arr.length - 1 === i) {
            return key;
          } else {
            return key + " / ";
          }
        })}
    </td>
    <td className="column7" onClick={() => props.openDetail(props.item._id)}>
      {props.item.qty}
    </td>
    <td className="column8" onClick={() => props.openDetail(props.item._id)}>
      {props.item.description}
    </td>
    <td className="column9" onClick={() => props.openDetail(props.item._id)}>
      {props.item.buyFrom}
    </td>
    <td className="column10" onClick={() => props.openDetail(props.item._id)}>
      {props.item.buyPrice}
    </td>
    <td className="column11" onClick={() => props.openDetail(props.item._id)}>
      {props.item.buyDate.substring(0, 10)}
    </td>
    <td className="column12" onClick={() => props.openDetail(props.item._id)}>
      {props.item.soldPrice || "-"}
    </td>
    <td className="column13" onClick={() => props.openDetail(props.item._id)}>
      {props.item.soldDate !== "2000-01-01T05:00:00.000Z"
        ? props.item.soldDate.substring(0, 10)
        : "-"}
    </td>
    <td className="column14">
      <Link className="edit" to={"/update/" + props.item._id}>
        Edit
      </Link>
      |
      <a
        className="delete"
        href="#"
        onClick={() => props.deleteItem(props.item._id)}
      >
        Delete
      </a>
      |
      <button className="sold" onClick={() => props.soldItem(props.item._id)}>
        Sold
      </button>
    </td>
  </tr>
);

export default class Items extends Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
    this.soldItem = this.soldItem.bind(this);
    this.openDetail = this.openDetail.bind(this);

    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeSoldDate = this.onChangeSoldDate.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      items: [],
      id: "",
      seenPopeup: false,
      seenTable: true,
      mainDivStyle: {
        background: "blue",
        zIndex: 0,
      },
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/items").then((res) => {
      this.setState({
        items: res.data,
      });
    });
  }

  deleteItem(id) {
    axios
      .delete("http://localhost:5000/items/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      items: this.state.items.filter((el) => el._id !== id),
    });
  }

  soldItem(id) {
    this.setState({
      id: id,
      seenPopeup: !this.state.seenPopeup,
      seenTable: !this.state.seenTable,
      mainDivStyle: {
        ...this.state.divstyle,
        position: "fixed",
        padding: 0,
        margin: 0,
        top: 0,
        left: 0,

        width: "100%",
        height: "100%",
        zIndex: 1,
        content: " ",
        background: "rgba(0, 0, 0, 0.5)",
      },
    });

    axios.get("http://localhost:5000/items/" + id).then((item) => {
      console.log(item.data);

      this.setState({
        type: item.data.type,
        brand: item.data.brand,
        model: item.data.model,
        color: item.data.color,
        sex: item.data.sex,
        size: {
          4: item.data.size[4],
          4.5: item.data.size[4.5],
          5: item.data.size[5],
          5.5: item.data.size[5.5],
          6: item.data.size[6],
          6.5: item.data.size[6.5],
          7: item.data.size[7],
          7.5: item.data.size[7.5],
          8: item.data.size[8],
          8.5: item.data.size[8.5],
          9: item.data.size[9],
          9.5: item.data.size[9.5],
          10: item.data.size[10],
          10.5: item.data.size[10.5],
          11: item.data.size[11],
          11.5: item.data.size[11.5],
          12: item.data.size[12],
          12.5: item.data.size[12.5],
          13: item.data.size[13],
          13.5: item.data.size[13.5],
          14: item.data.size[14],
          XS: item.data.size["XS"],
          S: item.data.size["S"],
          M: item.data.size["M"],
          L: item.data.size["L"],
          XL: item.data.size["XL"],
          XXL: item.data.size["XXL"],
          XXXL: item.data.size["XXXL"],
        },
        description: item.data.description,
        qty: item.data.qty,
        buyFrom: item.data.buyFrom,
        buyPrice: item.data.buyPrice,
        buyDate: parseISO(item.data.buyDate),
        soldPrice: item.data.soldPrice,
        soldDate: parseISO(item.data.soldDate),
      });
    });
  }

  itemsList() {
    return this.state.items.map((currentItem) => {
      return (
        <Item
          item={currentItem}
          key={currentItem._id}
          deleteItem={this.deleteItem}
          soldItem={this.soldItem}
          openDetail={this.openDetail}
        />
      );
    });
  }

  openDetail(id) {
    window.location = "/details/" + id;
  }

  updateEvents = (events, callback = () => {}) => {
    this.setState(
      {
        events,
      },
      callback
    );
  };

  onChangeSoldDate(date) {
    this.setState({
      soldDate: date,
    });
  }

  onChangePrice(e) {
    this.setState({
      soldPrice: e.target.value,
    });
  }

  onClose() {
    window.location = "/";
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
      qty: this.state.qty,
      buyFrom: this.state.buyFrom,
      buyPrice: this.state.buyPrice,
      buyDate: this.state.buyDate,
      soldPrice: this.state.soldPrice,
      soldDate: this.state.soldDate,
    };
    console.log(item);

    axios
      .post("http://localhost:5000/items/update/" + this.state.id, item)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/";
  }

  render() {
    return (
      <div className="limiter">
        <div id="mainDiv" style={this.state.mainDivStyle}>
          {this.state.seenPopeup ? (
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
                    className="pInput"
                    value={this.state.soldPrice}
                    onChange={this.onChangePrice}
                  />
                </div>
                <div id="divSizeD">
                  <label id="lInputD">Sold Date </label>
                  <DatePicker
                    className="pInput"
                    id="datepicker"
                    selected={this.state.soldDate}
                    onChange={this.onChangeSoldDate}
                  />
                </div>
                <input
                  className="button"
                  id="sButton"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
          ) : null}
        </div>

        {this.state.seenTable ? (
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
                      <th className="column6">Size(s)</th>
                      <th className="column7">QTY</th>
                      <th className="column8">Description</th>
                      <th className="column9">Buy From</th>
                      <th className="column10">$ Buy Price</th>
                      <th className="column11">Buy Date</th>
                      <th className="column12">$ Sold Price</th>
                      <th className="column13">Sold Date</th>
                      <th className="column14">Actions</th>
                    </tr>
                  </thead>
                  <tbody>{this.itemsList()}</tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

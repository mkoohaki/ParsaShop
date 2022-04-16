import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PopUp from "./PopUp";

const Item = (props) => (
  <tr onClick={() => props.openDetail(props.item._id)}>
    <td className="column1">{props.item.type}</td>
    <td className="column2">{props.item.brand}</td>
    <td className="column3">{props.item.model}</td>
    <td className="column4">{props.item.color}</td>
    <td className="column5">{props.item.sex}</td>
    <td className="column6">
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
    <td className="column7">{props.item.qty}</td>
    <td className="column8">{props.item.description}</td>
    <td className="column9">{props.item.buyFrom}</td>
    <td className="column10">{props.item.buyPrice}</td>
    <td className="column11">{props.item.buyDate.substring(0, 10)}</td>
    <td className="column12">{props.item.soldPrice || "-"}</td>
    <td className="column13">
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

    this.state = {
      items: [],
      seen: false,
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
      seen: !this.state.seen,
    });

    // axios.get("http://localhost:5000/items/" + id).then((res) => {
    //   const item = {
    //     type: res.data.type,
    //     brand: res.data.brand,
    //     model: res.data.model,
    //     color: res.data.color,
    //     sex: res.data.sex,
    //     size: res.data.size,
    //     description: res.data.description,
    //     qty: res.data.qty,
    //     buyFrom: res.data.buyFrom,
    //     buyPrice: res.data.buyPrice,
    //     buyDate: res.data.buyDate,
    //     soldPrice: 300,
    //     soldDate: new Date(),
    //   };
    // axios
    //   .post("http://localhost:5000/items/update/" + id, item)
    //   .then((res) => console.log(res.data));
    // });
    // window.location.reload(false);
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

  render() {
    return (
      <div className="limiter">
        {this.state.seen ? (
          <PopUp
            updateEvents={this.updateEvents}
            ref={this.ModalAjoutb}
            id_user={this.state.id_user}
            events={this.state.events}
          />
        ) : null}
        {/* <PopUp toggle={this.togglePop} /> */}
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
      </div>
    );
  }
}

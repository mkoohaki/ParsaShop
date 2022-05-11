import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "../form.css";
import { parseISO, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

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

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeBuyFromDate = this.onChangeBuyFromDate.bind(this);
    this.onChangeBuyToDate = this.onChangeBuyToDate.bind(this);
    this.onChangeSoldFromDate = this.onChangeSoldFromDate.bind(this);
    this.onChangeSoldToDate = this.onChangeSoldToDate.bind(this);
    this.refreshFilter = this.refreshFilter.bind(this);

    this.state = {
      items: [],
      id: "",
      sold: false,
      available: false,
      all: false,
      buyFromDate: 0,
      buyToDate: 0,
      soldFromDate: 0,
      soldToDate: 0,
      totalBuy: 0,
      totalSold: 0,
      seenPopeup: false,
      seenTable: true,
      mainDivStyle: {
        background: "blue",
        zIndex: 0,
      },
    };
  }

  componentDidMount() {
    var totalBuyPrice = 0;
    var totalSoldPrice = 0;

    axios.get("http://localhost:5000/items").then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        totalBuyPrice += res.data[i].buyPrice;
        totalSoldPrice += res.data[i].soldPrice;
      }

      this.setState({
        items: res.data,
        totalBuy: totalBuyPrice,
        totalSold: totalSoldPrice,
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
          onChangeStatus={this.onChangeStatus}
        />
      );
    });
  }

  refreshFilter(e) {
    var totalBuyPrice = 0;
    var totalSoldPrice = 0;
    const yesBtn = document.getElementsByClassName("inputRadio");
    yesBtn.checked = false;
    this.setState({
      buyFromDate: 0,
      buyToDate: 0,
      soldFromDate: 0,
      soldToDate: 0,
      sold: false,
      available: false,
      all: false,
    });

    axios.get("http://localhost:5000/items").then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        totalBuyPrice += res.data[i].buyPrice;
        totalSoldPrice += res.data[i].soldPrice;
      }

      this.setState({
        items: res.data,
        totalBuy: totalBuyPrice,
        totalSold: totalSoldPrice,
      });
    });
  }

  onChangeStatus(e) {
    this.setState({
      sold: false,
      available: false,
      all: false,
      [e.target.value]: true,
    });
    this.filtering();
  }

  onChangeBuyFromDate(date) {
    this.setState({
      buyFromDate: date,
    });
    this.filtering();
  }

  onChangeBuyToDate(date) {
    this.setState({
      buyToDate: date,
    });
    this.filtering();
  }

  onChangeSoldFromDate(date) {
    this.setState({
      soldFromDate: date,
    });
    this.filtering();
  }

  onChangeSoldToDate(date) {
    this.setState({
      soldToDate: date,
    });
    this.filtering();
  }

  filtering = () => {
    axios.get("http://localhost:5000/items").then((res) => {
      var elements;

      if (this.state.sold) {
        elements = res.data.filter((el) => el.soldPrice !== 0);
      } else if (this.state.available) {
        elements = res.data.filter((el) => el.soldPrice === 0);
      } else {
        elements = res.data;
      }

      if (this.state.buyFromDate !== 0 && this.state.buyToDate !== 0) {
        elements = elements.filter(
          (el) =>
            el.buyDate <= this.state.buyToDate.toISOString() &&
            el.buyDate >= this.state.buyFromDate.toISOString()
        );
      } else if (this.state.buyFromDate !== 0) {
        elements = elements.filter(
          (el) => el.buyDate >= this.state.buyFromDate.toISOString()
        );
      } else if (this.state.buyToDate !== 0) {
        elements = elements.filter(
          (el) => el.buyDate <= this.state.buyToDate.toISOString()
        );
      }
      if (this.state.soldFromDate !== 0 && this.state.soldToDate !== 0) {
        elements = elements.filter(
          (el) =>
            el.soldDate <= this.state.soldToDate.toISOString() &&
            el.soldDate >= this.state.soldFromDate.toISOString()
        );
      } else if (this.state.soldFromDate !== 0) {
        elements = elements.filter(
          (el) => el.buyDate >= this.state.soldFromDate.toISOString()
        );
      } else if (this.state.soldToDate !== 0) {
        elements = elements.filter(
          (el) => el.soldDate <= this.state.soldToDate.toISOString()
        );
      }
      this.setState({
        items: [],
        items: elements,
      });
      this.priceCalucating(elements);
    });
  };

  priceCalucating = (elements) => {
    var totalBuyPrice = 0;
    var totalSoldPrice = 0;
    for (var i = 0; i < elements.length; i++) {
      totalBuyPrice += elements[i].buyPrice;
      totalSoldPrice += elements[i].soldPrice;
    }

    this.setState({
      totalBuy: totalBuyPrice,
      totalSold: totalSoldPrice,
    });
  };

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
              <h3 id="hPopup">Sold Price</h3>
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
                <div id="filters">
                  <div className="divsFilter">
                    <div className="dFilter">
                      <label id="lRadioFilter">Status</label>
                    </div>
                    <div className="dRadioFilter">
                      <label className="lRadioFilter">Sold</label>
                      <input
                        className="inputRadio"
                        type="radio"
                        value="sold"
                        name="status"
                        checked={this.state.sold}
                        onChange={this.onChangeStatus}
                      />
                      <label className="lRadioFilter">Available</label>
                      <input
                        className="inputRadio"
                        type="radio"
                        value="available"
                        name="status"
                        checked={this.state.available}
                        onChange={this.onChangeStatus}
                      />
                      <label className="lRadioFilter">All</label>
                      <input
                        className="inputRadio"
                        type="radio"
                        value="all"
                        name="status"
                        checked={this.state.all}
                        onChange={this.onChangeStatus}
                      />
                    </div>
                  </div>
                  <div className="divsFilter">
                    <div className="dFilter">
                      <label className="lDateFilter">Buy Date</label>
                    </div>
                    <div className="dDatePickerP">
                      <div className="dateDivP">
                        <div className="dateDiv1">
                          <label className="labelDate">From </label>
                        </div>
                        <div className="dateDiv1">
                          <DatePicker
                            className="dateFilter"
                            selected={this.state.buyFromDate}
                            onChange={this.onChangeBuyFromDate}
                          />
                        </div>
                      </div>
                      <div className="dateDivP" id="dateDivBuy">
                        <div className="dateDiv2">
                          <label className="labelDateTo">To </label>
                        </div>
                        <div className="dateDiv2">
                          <DatePicker
                            className="dateFilter"
                            selected={this.state.buyToDate}
                            onChange={this.onChangeBuyToDate}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="divsFilter">
                    <div className="dFilter">
                      <label className="lDateFilter">Sold Date</label>
                    </div>
                    <div className="dDatePickerP">
                      <div className="dateDivP">
                        <div className="dateDiv1">
                          <label className="labelDate">From </label>
                        </div>
                        <div className="dateDiv1">
                          <DatePicker
                            className="dateFilter"
                            selected={this.state.soldFromDate}
                            onChange={this.onChangeSoldFromDate}
                          />
                        </div>
                      </div>
                      <div className="dateDivP" id="dateDivSold">
                        <div className="dateDiv2">
                          <label className="labelDateTo">To </label>
                        </div>
                        <div className="dateDiv2">
                          <DatePicker
                            className="dateFilter"
                            selected={this.state.soldToDate}
                            onChange={this.onChangeSoldToDate}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button id="buttonRefresh" onClick={this.refreshFilter}>
                      Refresh Filter
                    </button>
                  </div>
                </div>
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
                <div id="result">
                  <div className="resultD">
                    <h4 className="resultH">${this.state.totalBuy}</h4>
                    <p className="resultL">Total Purchase</p>
                  </div>
                  <div className="resultD">
                    <h4 className="resultH">${this.state.totalSold}</h4>
                    <p className="resultL" id="resultL2">
                      Total Sale
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

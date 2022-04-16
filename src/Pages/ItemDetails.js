import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ItemDetails extends Component {
  constructor(props) {
    super(props);

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

  componentDidMount(e) {
    axios
      .get("http://localhost:5000/items/" + this.props.match.params.id)
      .then((item) => {
        console.log(item.data);
        this.setState({
          type: item.data.type,
          brand: item.data.brand,
          model: item.data.model,
          color: item.data.color,
          sex: item.data.sex,
          // size: item.size.map(size => size.s === true),
          description: item.data.description,
          qty: item.data.qty,
          buyFrom: item.data.buyFrom,
          buyPrice: item.data.buyPrice,
          // buyDate: item.data.buyDate,
          soldPrice: item.data.soldPrice,
          soldDate: new Date(item.data.soldDate),
        });
      });
  }

  render() {
    return (
      <div>
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
                    <th>QTY</th>
                    <th className="column8">Description</th>
                    <th className="column9">Buy From</th>
                    <th className="column10">$ Buy Price</th>
                    <th className="column11">Buy Date</th>
                    <th className="column12">$ Sold Price</th>
                    <th className="column13">Sold Date</th>
                    <th className="column14">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.type}</td>
                    <td>{this.state.brand}</td>
                    <td>{this.state.model}</td>
                    <td>{this.state.color}</td>
                    <td>{this.state.sex}</td>
                    <td>
                      {Object.entries(this.state.size)
                        .filter(([key, value]) => value === true)
                        .map(([key, value], i, arr) => {
                          if (arr.length - 1 === i) {
                            return key;
                          } else {
                            return key + " / ";
                          }
                        })}
                    </td>
                    <td>{this.state.qty}</td>
                    <td>{this.state.description}</td>
                    <td>{this.state.buyFrom}</td>
                    <td>{this.state.buyPrice}</td>
                    <td>{this.state.buyDate}</td>
                    <td>{this.state.soldPrice || "-"}</td>
                    <td>
                      {this.state.soldDate !== "2000-01-01T05:00:00.000Z"
                        ? this.state.soldDate
                        : "-"}
                    </td>
                    <td>
                      <Link className="edit" to={"/update/" + this.state._id}>
                        Edit
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

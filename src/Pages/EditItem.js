import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../form.css";
import { parseISO, format } from "date-fns";

export default class EditItem extends Component {
  constructor(props) {
    super(props);

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.onChangeBuyFrom = this.onChangeBuyFrom.bind(this);
    this.onChangeBuyPrice = this.onChangeBuyPrice.bind(this);
    this.onChangeBuyDate = this.onChangeBuyDate.bind(this);
    this.onChangeSoldPrice = this.onChangeSoldPrice.bind(this);
    this.onChangeSoldDate = this.onChangeSoldDate.bind(this);
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

  componentDidMount(e) {
    axios
      .get("http://localhost:5000/api/items/" + this.props.match.params.id)
      .then((item) => {
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
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeQty(e) {
    this.setState({
      qty: e.target.value,
    });
  }
  onChangeBuyFrom(e) {
    this.setState({
      buyFrom: e.target.value,
    });
  }
  onChangeBuyPrice(e) {
    this.setState({
      buyPrice: e.target.value,
    });
  }
  onChangeBuyDate(date) {
    this.setState({
      buyDate: date,
    });
  }
  onChangeSoldPrice(e) {
    this.setState({
      soldPrice: e.target.value,
    });
  }
  onChangeSoldDate(date) {
    this.setState({
      soldDate: date,
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
      qty: this.state.qty,
      buyFrom: this.state.buyFrom,
      buyPrice: this.state.buyPrice,
      buyDate: this.state.buyDate,
      soldPrice: this.state.soldPrice,
      soldDate: this.state.soldDate,
    };
    console.log(item);
    axios
      .put(
        "http://localhost:5000/api/items/" + this.props.match.params.id,
        item
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/";
  }

  render() {
    return (
      <div id='item'>
        <h3>Editing Item</h3>
        <form onSubmit={this.onSubmit}>
          <div id='form1'>
            <div className='divs'>
              <label>Type</label>
              <select
                value={this.state.type}
                onChange={this.onChangeType}
                selected={this.state.type}
              >
                <option>Shoes</option>
                <option>Shirt</option>
                <option>Pantalon</option>
                <option>Others</option>
              </select>
            </div>
            <div className='divs'>
              <label>Brand</label>
              <input
                type='text'
                required
                value={this.state.brand}
                onChange={this.onChangeBrand}
              />
            </div>
            <div className='divs'>
              <label>Model</label>
              <input
                type='text'
                required
                value={this.state.model}
                onChange={this.onChangeModel}
              />
            </div>
            <div className='divs'>
              <div id='dSex'>
                <label id='lRadio'>Sex</label>
              </div>
              <div id='dRadio'>
                <input
                  className='inputRadio'
                  type='radio'
                  value='M'
                  id='M'
                  name='gender'
                  checked={this.state.sex === "M"}
                  onChange={this.onChangeSex}
                />
                <label className='lRadio'>Male</label>
                <input
                  className='inputRadio'
                  type='radio'
                  value='F'
                  id='F'
                  name='gender'
                  checked={this.state.sex === "F"}
                  onChange={this.onChangeSex}
                />
                <label className='lRadio'>Female</label>
                <input
                  className='inputRadio'
                  type='radio'
                  value='U'
                  id='U'
                  name='gender'
                  checked={this.state.sex === "U"}
                  onChange={this.onChangeSex}
                />
                <label className='lRadio'>Unisex</label>
              </div>
            </div>
            <div className='divs'>
              <div id='dSize'>
                <label>Size</label>
              </div>
              <div className='dCheckBox'>
                <div id='dCheckBox1'>
                  <div className='box'>
                    <input
                      type='checkbox'
                      value='4'
                      checked={this.state.size[4]}
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>4</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[4.5]}
                      value='4.5'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>4.5</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[5]}
                      value='5'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>5</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[5.5]}
                      value='5.5'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>5.5</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[6]}
                      value='6'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>6</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[6.5]}
                      value='6.5'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>6.5</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[7]}
                      value='7'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>7</label>
                  </div>
                </div>
                <div id='dCheckBox2'>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[7.5]}
                      value='7.5'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>7.5</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[8]}
                      value='8'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>8</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[8.5]}
                      value='8.5'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>8.5</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[9]}
                      value='9'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>9</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[9.5]}
                      value='9.5'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>9.5</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[10]}
                      value='10'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>10</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[10.5]}
                      value='10.5'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>10.5</label>
                  </div>
                </div>
                <div id='dCheckBox3'>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[11]}
                      value='11'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>11</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[11.5]}
                      value='11.5'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>11.5</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[12]}
                      value='12'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>12</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[12.5]}
                      value='12.5'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>12.5</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[13]}
                      value='13'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>13</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[13.5]}
                      value='13.5'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>13.5</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size[14]}
                      value='14'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>14</label>
                  </div>
                </div>
                <div id='dCheckBox4'>
                  <div className='box'>
                    <input
                      type='checkbox'
                      value='XS'
                      checked={this.state.size["XS"]}
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>XS</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size["S"]}
                      value='S'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>S</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size["M"]}
                      value='M'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>M</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size["L"]}
                      value='L'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>L</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size["XL"]}
                      value='XL'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>XL</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size["XLL"]}
                      value='XXL'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>XXL</label>
                  </div>
                  <div className='box'>
                    <input
                      type='checkbox'
                      checked={this.state.size["XXXL"]}
                      value='XXXL'
                      onChange={this.onChangeSize}
                    />
                    <label className='lCheckBox'>XXXL</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id='form2'>
            <div className='divs'>
              <label>Color</label>
              <input
                type='text'
                required
                value={this.state.color}
                onChange={this.onChangeColor}
              />
            </div>
            <div className='description'>
              <label>Description</label>
              <input
                type='text'
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div>
            <div className='divs'>
              <label>Quantity</label>
              <input
                type='text'
                required
                value={this.state.qty}
                onChange={this.onChangeQty}
              />
            </div>
            <div className='divs'>
              <label>Buy From </label>
              <input
                type='text'
                value={this.state.buyFrom}
                onChange={this.onChangeBuyFrom}
              />
            </div>
            <div className='divs'>
              <label>Buy Price </label>
              <input
                type='text'
                value={this.state.buyPrice}
                onChange={this.onChangeBuyPrice}
              />
            </div>
            <div className='divs'>
              <label className='labelDate'>Buy Date </label>
              <DatePicker
                className='date'
                selected={this.state.buyDate}
                onChange={this.onChangeBuyDate}
              />
            </div>
            <div className='divs'>
              <label>Sold Price </label>
              <input
                type='text'
                value={this.state.soldPrice}
                onChange={this.onChangeSoldPrice}
              />
            </div>
            <div className='divs'>
              <label>Sold Date </label>
              <DatePicker
                className='date'
                selected={this.state.soldDate}
                onChange={this.onChangeSoldDate}
              />
            </div>
          </div>
          <div>
            <input className='button' type='submit' value='Update Item' />
          </div>
        </form>
      </div>
    );
  }
}

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Item } from '../item/Item';
import { getItems } from '../../actions/items';
import DatePicker from 'react-datepicker';
import '../../form.css';
import { parseISO, format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Items = ({ getItems, items }) => {
  const [unfilteredItems, setUnfilteredItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => console.log(items), [items]);
  return <h1>Hello</h1>;
};

Items.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.array,
};

const mapStateToProps = (state) => ({
  items: state.items.items,
});

export default connect(mapStateToProps, { getItems })(Items);

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Item } from '../item/Item';
import { getItems } from '../../actions/items';
import DatePicker from 'react-datepicker';
import '../../form.css';
import { parseISO, format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Items = ({ getItems, items, totalSold, totalPurchased }) => {
  const history = useHistory();
  const [filterData, setFilterData] = useState({
    status: 'all',
    buyFromDate: '',
    buyToDate: '',
    soldFromDate: '',
    soldToDate: '',
    buyFromPrice: 0,
    buyToPrice: 0,
    soldFromPrice: 0,
    soldToPrice: 0,
  });
  const {
    status,
    buyFromDate,
    buyToDate,
    soldFromDate,
    soldToDate,
    buyFromPrice,
    buyToPrice,
    soldFromPrice,
    soldToPrice,
  } = filterData;

  const [popupData, setPopupData] = useState({
    showPopup: false,
    soldPrice: 0,
    soldDate: 0,
  });
  const { showPopup, soldPrice, soldDate } = popupData;

  const [showTable, setshowTable] = useState(true);

  useEffect(() => {
    getItems();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Submit');
  };

  const clearFilter = () => {
    setFilterData({
      status: 'all',
      buyFromDate: '',
      buyToDate: '',
      soldFromDate: '',
      soldToDate: '',
      buyFromPrice: 0,
      buyToPrice: 0,
      soldFromPrice: 0,
      soldToPrice: 0,
    });
  };

  const itemsList = () => {
    if (items) {
      return items.map((currentItem) => {
        return (
          <Item
            item={currentItem}
            key={currentItem._id}
            // deleteItem={deleteItem}
            // soldItem={soldItem}
            // openDetail={openDetail}
            // onChangeStatus={onChangeStatus}
          />
        );
      });
    }
  };

  // On Change
  const onChangePopupData = (e) => {
    setPopupData({
      ...popupData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeFilterData = (e) => {
    setFilterData({
      ...filterData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='limiter'>
      <div id='mainDiv'>
        {showPopup ? (
          <div id='dSolding'>
            <button
              id='modal'
              onClick={() => setPopupData({ showPopup: !showPopup })}
            >
              X
            </button>
            <h3 id='hPopup'>Sold Price</h3>
            <form onSubmit={onSubmit}>
              <div id='divSize'>
                <label id='lInput'>Sold price </label>
                <input
                  type='number'
                  required
                  className='pInput'
                  name='soldPrice'
                  value={soldPrice}
                  onChange={onChangePopupData}
                />
              </div>
              <div id='divSizeD'>
                <label id='lInputD'>Sold Date </label>
                <input
                  type='date'
                  name='soldDate'
                  value={soldDate}
                  onChange={onChangePopupData}
                />
              </div>
              <input
                className='button'
                id='sButton'
                type='submit'
                value='Submit'
              />
            </form>
          </div>
        ) : null}
      </div>
      {showTable ? (
        <div className='container-table100'>
          <div className='wrap-table100'>
            <div className='table100'>
              <div id='filters'>
                <div className='divsFilter'>
                  <div className='dFilter'>
                    <label id='lRadioFilter'>Status</label>
                  </div>
                  <div className='dRadioFilter'>
                    <label className='lRadioFilter'>Sold</label>
                    <input
                      className='inputRadio'
                      type='radio'
                      value='sold'
                      name='status'
                      onChange={onChangeFilterData}
                      checked={status == 'sold'}
                    />
                    <label className='lRadioFilter'>Available</label>
                    <input
                      className='inputRadio'
                      type='radio'
                      value='available'
                      name='status'
                      onChange={onChangeFilterData}
                      checked={status == 'available'}
                    />
                    <label className='lRadioFilter'>All</label>
                    <input
                      className='inputRadio'
                      type='radio'
                      value='all'
                      name='status'
                      onChange={onChangeFilterData}
                      checked={status == 'all'}
                    />
                  </div>
                </div>
                <div className='divsFilter'>
                  <div className='dFilter'>
                    <label className='lDateFilter'>Buy Date</label>
                  </div>
                  <div className='dDatePickerP'>
                    <div className='dateDivP'>
                      <div className='dateDiv1'>
                        <label className='labelDate'>From </label>
                      </div>
                      <div className='dateDiv1'>
                        <input
                          type='date'
                          className='dateFilter'
                          name='buyFromDate'
                          value={buyFromDate}
                          onChange={onChangeFilterData}
                        />
                      </div>
                    </div>
                    <div className='dateDivP' id='dateDivBuy'>
                      <div className='dateDiv2'>
                        <label className='labelDateTo'>To </label>
                      </div>
                      <div className='dateDiv2'>
                        <input
                          type='date'
                          className='dateFilter'
                          name='buyToDate'
                          value={buyToDate}
                          onChange={onChangeFilterData}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='divsFilter'>
                  <div className='dFilter'>
                    <label className='lDateFilter'>Sold Date</label>
                  </div>
                  <div className='dDatePickerP'>
                    <div className='dateDivP'>
                      <div className='dateDiv1'>
                        <label className='labelDate'>From </label>
                      </div>
                      <div className='dateDiv1'>
                        <input
                          type='date'
                          className='dateFilter'
                          name='soldFromDate'
                          value={soldFromDate}
                          onChange={onChangeFilterData}
                        />
                      </div>
                    </div>
                    <div className='dateDivP' id='dateDivSold'>
                      <div className='dateDiv2'>
                        <label className='labelDateTo'>To </label>
                      </div>
                      <div className='dateDiv2'>
                        <input
                          type='date'
                          className='dateFilter'
                          name='soldToDate'
                          value={soldToDate}
                          onChange={onChangeFilterData}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='divsFilter'>
                  <div className='dFilter'>
                    <label className='lDateFilter'>Buy Price</label>
                  </div>
                  <div className='dDatePickerP'>
                    <div className='dateDivP'>
                      <div className='dateDiv1'>
                        <label className='labelDate'>From </label>
                      </div>
                      <div className='dateDiv1'>
                        <input
                          type='number'
                          className='dateFilter'
                          name='buyFromPrice'
                          value={buyFromPrice}
                          onChange={onChangeFilterData}
                        />
                      </div>
                    </div>
                    <div className='dateDivP' id='dateDivBuy'>
                      <div className='dateDiv2'>
                        <label className='labelDateTo'>To </label>
                      </div>
                      <div className='dateDiv2'>
                        <input
                          type='number'
                          className='dateFilter'
                          name='buyToPrice'
                          value={buyToPrice}
                          onChange={onChangeFilterData}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='divsFilter'>
                  <div className='dFilter'>
                    <label className='lDateFilter'>Sold Price</label>
                  </div>
                  <div className='dDatePickerP'>
                    <div className='dateDivP'>
                      <div className='dateDiv1'>
                        <label className='labelDate'>From </label>
                      </div>
                      <div className='dateDiv1'>
                        <input
                          type='number'
                          className='dateFilter'
                          name='soldFromPrice'
                          value={soldFromPrice}
                          onChange={onChangeFilterData}
                        />
                      </div>
                    </div>
                    <div className='dateDivP' id='dateDivBuy'>
                      <div className='dateDiv2'>
                        <label className='labelDateTo'>To </label>
                      </div>
                      <div className='dateDiv2'>
                        <input
                          type='number'
                          className='dateFilter'
                          name='soldToPrice'
                          value={soldToPrice}
                          onChange={onChangeFilterData}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button id='buttonRefresh' onClick={clearFilter}>
                    Clear Filter
                  </button>
                </div>
              </div>
              <table>
                <thead>
                  <tr className='table100-head'>
                    <th className='column1'>Type</th>
                    <th className='column2'>Brand</th>
                    <th className='column3'>Model</th>
                    <th className='column4'>Color</th>
                    <th className='column5'>Sex</th>
                    <th className='column6'>Size(s)</th>
                    <th className='column7'>QTY</th>
                    <th className='column8'>Description</th>
                    <th className='column9'>Buy From</th>
                    <th className='column10'>$ Buy Price</th>
                    <th className='column11'>Buy Date</th>
                    <th className='column12'>$ Sold Price</th>
                    <th className='column13'>Sold Date</th>
                    <th className='column14'>Actions</th>
                  </tr>
                </thead>
                <tbody>{itemsList()}</tbody>
              </table>
              <div id='result'>
                <div className='resultD'>
                  <h4 className='resultH'>{totalPurchased}</h4>
                  <p className='resultL'>Total Purchased</p>
                </div>
                <div className='resultD'>
                  <h4 className='resultH'>{totalSold}</h4>
                  <p className='resultL' id='resultL2'>
                    Total Sold
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

Items.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.array,
  totalSold: PropTypes.number,
  totalPurchased: PropTypes.number,
};

const mapStateToProps = (state) => ({
  items: state.items.items,
  totalSold: state.items.totalSold,
  totalPurchased: state.items.totalPurchased,
});

export default connect(mapStateToProps, { getItems })(Items);

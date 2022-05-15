import { Link } from 'react-router-dom';

export const Item = (props) => (
  <tr>
    <td className='column1' onClick={() => props.openDetail(props.item._id)}>
      {props.item.type}
    </td>
    <td className='column2' onClick={() => props.openDetail(props.item._id)}>
      {props.item.brand}
    </td>
    <td className='column3' onClick={() => props.openDetail(props.item._id)}>
      {props.item.model}
    </td>
    <td className='column4' onClick={() => props.openDetail(props.item._id)}>
      {props.item.color}
    </td>
    <td className='column5' onClick={() => props.openDetail(props.item._id)}>
      {props.item.sex}
    </td>
    <td className='column6' onClick={() => props.openDetail(props.item._id)}>
      {Object.entries(props.item.size)
        .filter(([key, value]) => value === true)
        .map(([key, value], i, arr) => {
          if (arr.length - 1 === i) {
            return key;
          } else {
            return key + ' / ';
          }
        })}
    </td>
    <td className='column7' onClick={() => props.openDetail(props.item._id)}>
      {props.item.qty}
    </td>
    <td className='column8' onClick={() => props.openDetail(props.item._id)}>
      {props.item.description}
    </td>
    <td className='column9' onClick={() => props.openDetail(props.item._id)}>
      {props.item.buyFrom}
    </td>
    <td className='column10' onClick={() => props.openDetail(props.item._id)}>
      {props.item.buyPrice}
    </td>
    <td className='column11' onClick={() => props.openDetail(props.item._id)}>
      {props.item.buyDate.substring(0, 10)}
    </td>
    <td className='column12' onClick={() => props.openDetail(props.item._id)}>
      {props.item.soldPrice || '-'}
    </td>
    <td className='column13' onClick={() => props.openDetail(props.item._id)}>
      {props.item.soldDate !== '2000-01-01T05:00:00.000Z'
        ? props.item.soldDate.substring(0, 10)
        : '-'}
    </td>
    <td className='column14'>
      <Link className='edit' to={'/update/' + props.item._id}>
        Edit
      </Link>
      |
      <a
        className='delete'
        href='#'
        onClick={() => props.deleteItem(props.item._id)}
      >
        Delete
      </a>
      |
      <button className='sold' onClick={() => props.soldItem(props.item._id)}>
        Sold
      </button>
    </td>
  </tr>
);

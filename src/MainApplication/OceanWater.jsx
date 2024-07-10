import React, {Component} from 'react';
import './OceanWater.css';

export default class OceanWater extends Component {
  render() {
    const {
      col,
      row,
      treasureChest,
      ship,
      iceberg,
      onMouseDown,
      onMouseUp,
    } = this.props;
    
    let specialNode;
    let content;
    if (ship) {
      content = <img src='https://img.icons8.com/?size=100&id=GknFxTtgn9BX&format=png&color=000000' alt="sailboat" className='boat'/>;
      specialNode = 'boat';
    } 
    else if (treasureChest) {
      content = <img src='https://img.icons8.com/?size=100&id=22467&format=png&color=000000' alt="treasurechest" className='treasure'/>;
      specialNode = 'treasure';
    }
    else if (iceberg) {
      specialNode = 'iceberg';
    }
    else {
      specialNode = '';
    }

    return (
      <div
        id={`${row}-${col}`}
        className={`ocean-water ${specialNode}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp()}><div></div><div></div>{content}</div>
    );
  }
}
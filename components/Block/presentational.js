import React, { PropTypes } from 'react';

class Block extends React.Component {
    render() {
        let clickHandler = this.props.clickHandler,
            contextHandler = this.props.contextHandler,
            value = this.props.value,
            isMine = this.props.isMine,
            isRevealed = this.props.isRevealed,
            row = this.props.row,
            col = this.props.col;

        return  <li data-is-mine={isMine} data-is-revealed={isRevealed} style={{display: "inline-block", width: "20px", height: "20px"}} className="mine-field__block">
                    <a href="#" onContextMenu={contextHandler} onClick={clickHandler}>{value}</a>
                </li>;
    }
}

export default Block;

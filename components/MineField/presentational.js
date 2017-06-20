import React, { PropTypes } from 'react';
import Block from 'components/Block/container.js'

class MineField extends React.Component {
    componentWillMount() {
        this.props.componentWillMount(this.props.randomNumbersArray, this.props.mineFieldCols, this.props.mineFieldRows);
    }

    render() {
        let mineFieldSize = this.props.mineFieldSize,
            mineFieldCols = this.props.mineFieldCols,
            mineFieldRows = this.props.mineFieldRows,
            blocks = this.props.blocks,
            cols = [],
            rows = [],
            rowIndex = 0;

        blocks.map((block, index) => {
            cols = [];
            rowIndex = index;

            block.map((block, index) => {
                let value = (block.revealed) ? block.ticks : '*';

                if (block.isMine && block.revealed) {
                    value = "X";
                }

                cols[index] = <Block row={rowIndex} col={index} key={index} id={index} isRevealed={block.revealed} isMine={block.isMine} id={block.id} value={value}  />;
            });

            rows[index] = <ul key={index} data-row={index} style={{margin: 0, padding: 0, listStyle: "none"}}>{cols}</ul>;
        });

        return <div className={"mine-field mine-field--" + mineFieldSize}>{rows}</div>;
    }
}

export default MineField;

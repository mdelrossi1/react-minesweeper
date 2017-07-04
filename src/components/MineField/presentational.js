import React from 'react';
import Block from '../../components/Block/container.js';

class MineField extends React.Component {
    componentWillMount() {
        this.props.componentWillMount(this.props.randomNumbersArray, this.props.mineFieldCols, this.props.mineFieldRows);
    }

    render() {
        let mineFieldSize = this.props.mineFieldSize,
            blocks = this.props.blocks,
            cols,
            rows = [];

        blocks.map((row, rowIndex) => {
            cols = [];

            row.map((block, colIndex) => {
                let value = (block.revealed) ? block.ticks : '*';

                if (block.isMine && block.revealed) {
                    value = "X";
                }

                if (block.flagged && !block.revealed) {
                    value = "F"
                }

                cols[colIndex] = <Block row={rowIndex} col={colIndex} key={colIndex} isRevealed={block.revealed} isMine={block.isMine} id={block.id} value={value}  />;

                return false;
            });

            rows[rowIndex] = <ul key={rowIndex} data-row={rowIndex} style={{margin: 0, padding: 0, listStyle: "none"}}>{cols}</ul>;

            return false;
        });

        return <div className={"mine-field mine-field--" + mineFieldSize}>{rows}</div>;
    }
}

export default MineField;

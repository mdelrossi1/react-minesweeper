import { connect } from 'react-redux';
import { revealMine } from '../../actions/revealMine'
import Block from './presentational';

const mapStateToProps = (state, ownProps) =>  {
    let value = ownProps.value,
        isMine = ownProps.isMine,
        isRevealed = ownProps.isRevealed,
        col = ownProps.col,
        row = ownProps.row;

    return {
        value,
        isMine,
        isRevealed,
        col,
        row
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    let row = ownProps.row,
        col = ownProps.col;

    return {
        clickHandler: (e) => {
            e.preventDefault();

            dispatch(revealMine(row, col));
        }
    }
};

const BlockContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Block);

export default BlockContainer;

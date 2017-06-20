import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { initApp } from '../../actions/initApp'
import MineField from './presentational';

const mapStateToProps = (state, ownProps) =>  {
    var mineFieldCols = state.settings.mineFieldCols,
        mineFieldRows = state.settings.mineFieldRows,
        mineFieldSize = mineFieldRows * mineFieldCols,
        numberOfMines = state.settings.numberOfMines,
        randomNumbers = (ceiling, total) => {
            let arr = [],
                i = 0;

            if (total > ceiling) {
                throw 'The total number of random numbers wanted must be greater than the ceiling';
            }

            while(i < total) {
                let random = Math.floor(Math.random() * ceiling + 0);

                if (!arr.includes(random)) {
                    arr[i] = random;

                    i++;
                }
            }

            return arr;
        },

        randomNumbersArray = randomNumbers(mineFieldSize, numberOfMines),

        blocks = state.blocks;

    return {
        randomNumbersArray,
        mineFieldCols,
        mineFieldRows,
        mineFieldSize,
        blocks
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        componentWillMount: (randomNumbersArray, cols, rows) => {
            dispatch(initApp(randomNumbersArray, cols, rows));
        }
    }
};

const MineFieldContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MineField)

export default MineFieldContainer;

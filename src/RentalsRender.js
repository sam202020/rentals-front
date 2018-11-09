import React, { Component } from "react";
import Rental from "./Rental";
import { Row, Col } from "reactstrap";
import { List, AutoSizer } from "react-virtualized";

export default class RentalsRender extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      listHeight: 300,
      listRowHeight: 50,
      overscanRowCount: 10,
      rowCount: 50,
      scrollToIndex: undefined,
      showScrollingPlaceholder: false,
      useDynamicRowHeight: false
    };

    this._getRowHeight = this._getRowHeight.bind(this);
    this._noRowsRenderer = this._noRowsRenderer.bind(this);
    this._onRowCountChange = this._onRowCountChange.bind(this);
    this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
    this._rowRenderer = this._rowRenderer.bind(this);
  }

  render() {
    const {
      listHeight,
      listRowHeight,
      overscanRowCount,
      rowCount,
      scrollToIndex,
      showScrollingPlaceholder,
      useDynamicRowHeight
    } = this.state;
    return (
      <div>
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              ref="List"
              height={listHeight}
              overscanRowCount={overscanRowCount}
              noRowsRenderer={this._noRowsRenderer}
              rowCount={rowCount}
              rowHeight={
                useDynamicRowHeight ? this._getRowHeight : listRowHeight
              }
              rowRenderer={this._rowRenderer}
              scrollToIndex={scrollToIndex}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

import React, { Component } from 'react';

class MouseButtonsOverlay extends Component {

  constructor (props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleClearMousePosition = this.handleClearMousePosition.bind(this);
    this.handleSelectParent = this.handleSelectParent.bind(this);
    this.handleBefore = this.handleBefore.bind(this);
    this.handleFirst = this.handleFirst.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handleAfter = this.handleAfter.bind(this);
    this.handleReplace = this.handleReplace.bind(this);
    this.handleCut = this.handleCut.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleClone = this.handleClone.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount () {
    const {context} = this.props;
    if (context) {
      context.addListener('mouseDown.mousebuttons', (e) => {this.setPosition(e);});
    }
  }

  componentWillUnmount () {
    this.$DOMNode = undefined;
    const {context} = this.props;
    if (context) {
      context.removeListener('mouseDown.mousebuttons');
    }
  }

  setPosition (e) {
    const {pageX, pageY, button} = e;
    this.setState({
      showMenu: true,
      mousePos: {pageX, pageY, button},
    });
    // const validMousePos = mousePos || lastMousePos;
    // let centerPointX;
    // let centerPointY;
    // if (validMousePos && !isMultipleSelected && showBlueprintButtons) {
    //   const topLeftY = newPos.top;
    //   const topLeftX = newPos.left;
    //   const bottomRightY = topLeftY + newPos.height;
    //   const bottomRightX = topLeftX + newPos.width;
    //   if (validMousePos.pageX > topLeftX &&
    //     validMousePos.pageX < bottomRightX &&
    //     validMousePos.pageY > topLeftY &&
    //     validMousePos.pageY < bottomRightY) {
    //     centerPointX = validMousePos.pageX - topLeftX;
    //     centerPointY = validMousePos.pageY - topLeftY;
    //   } else {
    //     if (topLeftY > 40) {
    //       centerPointY = newPos.height / 2;
    //     } else {
    //       centerPointY = 35;
    //     }
    //     if (topLeftX > 60) {
    //       centerPointX = newPos.width / 2;
    //     } else {
    //       centerPointX = 60;
    //     }
    //   }
    // }
  }

  handleMouseOver (e) {
    // this.props.onMouseOver(e);
  }

  handleMouseOut (e) {
    // this.props.onMouseOut(e);
  }

  handleContextMenu (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleSelectParent (e) {
    const {selectedKey, initialState: {onSelectParent}} = this.props;
    if (onSelectParent) {
      e.preventDefault();
      e.stopPropagation();
      onSelectParent(selectedKey, e.metaKey || e.ctrlKey);
    }
  }

  handleBefore (e) {
    const {selectedKey, initialState: {onBefore}} = this.props;
    if (onBefore) {
      e.preventDefault();
      e.stopPropagation();
      onBefore(selectedKey, e.metaKey || e.ctrlKey);
    }
  }

  handleFirst (e) {
    const {selectedKey, initialState: {onFirst}} = this.props;
    if (onFirst) {
      e.preventDefault();
      e.stopPropagation();
      onFirst(selectedKey, e.metaKey || e.ctrlKey);
    }
  }

  handleLast (e) {
    const {selectedKey, initialState: {onLast}} = this.props;
    if (onLast) {
      e.preventDefault();
      e.stopPropagation();
      onLast(selectedKey, e.metaKey || e.ctrlKey);
    }
  }

  handleAfter (e) {
    const {selectedKey, initialState: {onAfter}} = this.props;
    if (onAfter) {
      e.preventDefault();
      e.stopPropagation();
      onAfter(selectedKey, e.metaKey || e.ctrlKey);
    }
  }

  handleReplace (e) {
    const {selectedKey, initialState: {onReplace}} = this.props;
    if (onReplace) {
      e.preventDefault();
      e.stopPropagation();
      onReplace(selectedKey, e.metaKey || e.ctrlKey);
    }
  }

  handleCut (e) {
    const {selectedKey, initialState: {onCut}} = this.props;
    if (onCut) {
      e.preventDefault();
      e.stopPropagation();
      onCut(selectedKey, e.metaKey || e.ctrlKey);
    }
  }

  handleCopy (e) {
    const {selectedKey, initialState: {onCopy}} = this.props;
    if (onCopy) {
      e.preventDefault();
      e.stopPropagation();
      onCopy(selectedKey, e.metaKey || e.ctrlKey);
    }
  }

  handleClone (e) {
    const {selectedKey, initialState: {onClone}} = this.props;
    if (onClone) {
      e.preventDefault();
      e.stopPropagation();
      onClone(selectedKey, e.metaKey || e.ctrlKey);
    }
  }

  handleDelete (e) {
    const {selectedKey, initialState: {onDelete}} = this.props;
    if (onDelete) {
      e.preventDefault();
      e.stopPropagation();
      onDelete(selectedKey, e.metaKey || e.ctrlKey);
    }
  }


  handleClearMousePosition (e) {
    // this.props.onClearMousePosition();
  }

  render () {
    const {showMenu} = this.state;
    if (!showMenu) {
      return null;
    }
    const {centerPointY, centerPointX, componentName, isOverlay} = this.props;
    let titleStyle = {};
    if (isOverlay) {
      titleStyle.backgroundColor = '#35b3ee';
      titleStyle.opacity = 1;
    }
    return (
      <div
        className="structor_mouse-center-point"
        style={{top: centerPointY, left: centerPointX}}
        onContextMenu={this.handleContextMenu}
      >
        <div
          className="structor_mouse-title"
          style={titleStyle}
        >
          <span>{componentName}</span>
        </div>
        <div
          className="structor_mouse-top-left-second-btn structor_mouse-rectangle-btn umy-icon-cancel-circle"
          onClick={this.handleClearMousePosition}
        >
        </div>
        <div
          className="structor_mouse-top-left-btn structor_mouse-rectangle-btn umy-icon-arrow-up-left"
          title="Select parent component"
          onClick={this.handleSelectParent}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
        </div>
        <div
          className="structor_mouse-top-center-btn structor_mouse-circle-btn umy-icon-arrow-plus-down"
          title="Append before selected"
          onClick={this.handleBefore}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
        <div
          className="structor_mouse-top-right-btn structor_mouse-circle-btn umy-icon-replace"
          title="Replace selected"
          onClick={this.handleReplace}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
        <div
          className="structor_mouse-right-center-btn structor_mouse-circle-btn umy-icon-arrow-plus-down structor_rotate-clockwise"
          title="Insert into selected as last child"
          onClick={this.handleReplace}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
        <div
          className="structor_mouse-bottom-right-btn structor_mouse-rectangle-btn umy-icon-cut"
          title="Cut selected into clipboard"
          onClick={this.handleCut}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
        <div
          className="structor_mouse-bottom-center-btn structor_mouse-circle-btn umy-icon-arrow-plus-up"
          title="Append after selected"
          onClick={this.handleAfter}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
        <div
          className="structor_mouse-bottom-left-btn structor_mouse-rectangle-btn umy-icon-copy"
          title="Copy selected into clipboard"
          onClick={this.handleCopy}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
        <div
          className="structor_mouse-bottom-left-second-btn structor_mouse-rectangle-btn umy-icon-duplicate"
          title="Clone selected"
          onClick={this.handleClone}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
        <div
          className="structor_mouse-left-center-btn structor_mouse-circle-btn umy-icon-arrow-plus-up structor_rotate-clockwise"
          title="Insert into selected as first child"
          onClick={this.handleFirst}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
        <div
          className="structor_mouse-left-center-second-btn structor_mouse-rectangle-btn umy-icon-delete structor_mouse-button-warning"
          title="Delete selected"
          onClick={this.handleDelete}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
      </div>
    );
  }
}

export default MouseButtonsOverlay;

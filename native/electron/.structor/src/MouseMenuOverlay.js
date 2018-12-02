import React, { Component } from 'react';
import ContextMenu, {MENU_WIDTH, MENU_HEIGHT} from './ContextMenu';

class MouseMenuOverlay extends Component {

  constructor (props) {
    super(props);
    this.setPosition = this.setPosition.bind(this);
    this.renewPosition = this.renewPosition.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {
      showMenu: false,
      mousePos: {},
    };
  }

  componentDidMount () {
    const {context} = this.props;
    if (context) {
      context.addListener('mouseDown.mousemenu', this.setPosition);
    }
  }

  componentWillUnmount () {
    this.$DOMNode = undefined;
    const {context} = this.props;
    if (context) {
      context.removeListener('mouseDown.mousemenu');
    }
  }

  setPosition (e) {
    const {pageX, pageY, button} = e;
    this.setState({
      showMenu: button === 2,
      mousePos: {pageX, pageY, button},
    });
  }

  renewPosition (pageX, pageY) {
    this.setState({
      mousePos: {pageX, pageY, button: 2},
    });
  }

  closeMenu () {
    this.setState({showMenu: false});
  }

  render () {
    const {showMenu, mousePos: {pageX, pageY}} = this.state;
    const {context, selectedKeys} = this.props;
    if (!showMenu || !selectedKeys) {
      return null;
    }
    const windowWidth = window.innerWidth + window.scrollX;
    const windowHeight = window.innerHeight + window.scrollY;
    const widthDelta = windowWidth - pageX;
    const heightDelta = windowHeight - pageY;
    let position = {horizontal: 'right', vertical: 'bottom'};
    if (widthDelta < MENU_WIDTH) {
      position.horizontal = 'left';
    }
    if (pageY - window.scrollY > MENU_HEIGHT && heightDelta < MENU_HEIGHT) {
      position.vertical = 'top';
    }
    return (
      <ContextMenu
        centerPointY={pageY}
        centerPointX={pageX}
        position={position}
        context={context}
        selectedKeys={selectedKeys}
        onCloseMenu={this.closeMenu}
        onRenewPosition={this.renewPosition}
      />
    );
  }
}

export default MouseMenuOverlay;

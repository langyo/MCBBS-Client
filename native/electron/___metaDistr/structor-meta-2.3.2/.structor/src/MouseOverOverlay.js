import React, { Component } from 'react';

const borderRadius = '2px';
const nullPx = '0px';
const px = 'px';
const position = 'absolute';
const borderStyle = 'solid #35b3ee';
const borderSize = '2px';

const style = {
  display: 'none'
};

class MouseOverOverlay extends Component {

  constructor (props) {
    super(props);
    this.state = {
      newPos: null,
      border: '' + (props.bSize ? props.bSize : borderSize) + ' ' + (props.bStyle ? props.bStyle : borderStyle)
    };
    this.refreshPosition = this.refreshPosition.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.resetPosition = this.resetPosition.bind(this);
  }

  componentDidMount () {
    const {context} = this.props;
    if (context) {
      context.addListener('mouseOver.boundaries', this.updatePosition);
      context.addListener('mouseOut.boundaries', this.updatePosition);
    }
  }

  componentWillUnmount () {
    this.$DOMNode = undefined;
    const {context} = this.props;
    if (context) {
      context.removeListener('mouseOver.boundaries');
      context.removeListener('mouseOut.boundaries');
    }
  }

  refreshPosition (position) {
    const $DOMNode = this.$DOMNode;
    if ($DOMNode) {
      const pos = position;
      const newPos = {
        key: pos.key,
        label: pos.label,
        top: pos.top,
        left: pos.left,
        width: $DOMNode.outerWidth(),
        height: $DOMNode.outerHeight()
      };
      const {newPos: oldPos} = this.state;
      if (!oldPos ||
        newPos.top !== oldPos.top ||
        newPos.left !== oldPos.left ||
        newPos.width !== oldPos.width ||
        newPos.height !== oldPos.height) {
        this.setState({newPos});
      }
    }
  }

  resetPosition () {
    this.$DOMNode = undefined;
    this.setState({newPos: null});
  }

  updatePosition (options) {
    let targetDOMNode = options.targetDOMNode;

    if (options.remove) {
      this.resetPosition();
      this.lastPosition = undefined;
    } else {
      if (targetDOMNode) {
        const $targetDOMNode = $(targetDOMNode);
        const pos = $targetDOMNode.offset();
        const newPos = {
          top: pos.top,
          left: pos.left,
          label: options.type,
          key: options.key
        };
        if (this.$DOMNode && this.lastPosition) {
          if ((newPos.top === this.lastPosition.top && newPos.left > this.lastPosition.left)
            || (newPos.top > this.lastPosition.top && newPos.left === this.lastPosition.left)
            || (newPos.top > this.lastPosition.top && newPos.left > this.lastPosition.left)) {
            this.$DOMNode = $targetDOMNode;
            this.lastPosition = newPos;
          }
        } else {
          this.$DOMNode = $(targetDOMNode);
          this.lastPosition = newPos;
        }
        this.refreshPosition(this.lastPosition);
      }
    }
  }

  render () {
    const {newPos, border} = this.state;
    let content;
    if (newPos) {
      const endPoint = {
        top: newPos.top + px,
        left: newPos.left + px,
        width: '1px',
        height: '1px',
        position: position,
        zIndex: 1040
      };
      const topLine = {
        top: nullPx,
        left: nullPx,
        width: (newPos.width - 1) + 'px',
        height: nullPx,
        position: position,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderTop: border
      };
      const leftLine = {
        top: nullPx,
        left: nullPx,
        width: nullPx,
        height: (newPos.height - 1) + px,
        position: position,
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        borderLeft: border
      };
      const bottomLine = {
        bottom: '-' + (newPos.height - 1) + px,
        left: nullPx,
        width: (newPos.width - 1) + px,
        height: nullPx,
        position: position,
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
        borderBottom: border
      };
      const rightLine = {
        right: '-' + (newPos.width - 1) + px,
        top: nullPx,
        width: nullPx,
        height: newPos.height + px,
        position: position,
        borderTopRightRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
        borderRight: border
      };
      let labelLine = {
        left: nullPx,
        position: position
      };
      if (newPos.height < 45) {
        labelLine.top = '-15px';
      } else {
        labelLine.top = '0px';
      }
      content = (
        <div style={endPoint}>
          <div style={topLine} />
          <div style={leftLine} />
          <div style={bottomLine} />
          <div style={rightLine} />
          <span
            className="structor_mouse-overlay-label"
            style={labelLine}
          >
            {newPos.label}
          </span>
        </div>
      );
    } else {
      content = (<span style={style}/>);
    }
    return content;
  }

}

export default MouseOverOverlay;

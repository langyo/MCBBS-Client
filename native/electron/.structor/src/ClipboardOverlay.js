import React, { Component } from 'react';

const borderRadius = '2px';
const nullPx = '0px';
const px = 'px';
const position = 'absolute';
const borderStyle = 'solid #35b3ee';
const borderSize = '1px';

function isVisible (element) {
  let invisibleParent = false;
  if ($(element).css('display') === 'none') {
    invisibleParent = true;
  } else {
    $(element).parents().each(function (i, el) {
      if ($(el).css('display') === 'none') {
        invisibleParent = true;
        return false;
      }
      return true;
    });
  }
  return !invisibleParent;
}

class ClipboardOverlay extends Component {

  constructor (props) {
    super(props);
    this.state = {
      newPos: null,
      border: '' + (props.bSize ? props.bSize : borderSize) + ' ' + (props.bStyle ? props.bStyle : borderStyle),
    };
    this.startRefreshTimer = this.startRefreshTimer.bind(this);
    this.refreshPosition = this.refreshPosition.bind(this);
    this.subscribeToInitialState = this.subscribeToInitialState.bind(this);
    this.setSelectedPosition = this.setSelectedPosition.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount () {
    this.subscribeToInitialState();
  }

  componentWillUnmount () {
    if (this.refreshTimerId) {
      clearTimeout((this.refreshTimerId));
      this.refreshTimerId = undefined;
    }
    this.$DOMNode = undefined;
  }

  componentDidUpdate () {
    this.subscribeToInitialState();
  }

  componentWillReceiveProps (nextProps) {
    this.subscribeToInitialState();
  }

  subscribeToInitialState () {
    const {selectedKey, context} = this.props;
    if (selectedKey && context) {
      const selected = context.getElement(selectedKey);
      if (selected) {
        const targetDOMNode = selected.getDOMNode();
        this.setSelectedPosition({targetDOMNode});
      } else {
        this.resetTimer();
        this.setState({newPos: null});
      }
    }
  }

  startRefreshTimer () {
    this.refreshTimerId = setTimeout(() => {
      this.refreshPosition();
    }, 500);
  }

  refreshPosition () {
    const $DOMNode = this.$DOMNode;
    if ($DOMNode) {
      const {newPos: oldPos} = this.state;
      if (isVisible($DOMNode)) {
        let pos = $DOMNode.offset();
        let newPos = {
          top: pos.top,
          left: pos.left,
          width: $DOMNode.outerWidth(),
          height: $DOMNode.outerHeight()
        };
        if (!oldPos ||
          newPos.top !== oldPos.top ||
          newPos.left !== oldPos.left ||
          newPos.width !== oldPos.width ||
          newPos.height !== oldPos.height) {
          this.setState({newPos});
        }
      } else {
        if (oldPos) {
          this.setState({newPos: null});
        }
      }
    }
    this.startRefreshTimer();
  }

  resetTimer () {
    if (this.refreshTimerId) {
      clearTimeout((this.refreshTimerId));
      this.refreshTimerId = undefined;
    }
    this.$DOMNode = undefined;
  }

  setSelectedPosition (options) {
    let targetDOMNode = options.targetDOMNode;
    this.resetTimer();
    if (targetDOMNode) {
      this.$DOMNode = $(targetDOMNode);
      this.refreshPosition();
    } else {
      console.error('ClipboardOverlay: target DOM node is null');
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
        zIndex: 1029
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
        width: newPos.width + px,
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
      content = (
        <div style={endPoint}>
          <div style={topLine} />
          <div style={leftLine} />
          <div style={bottomLine} />
          <div style={rightLine} />
        </div>
      );
    } else {
      const style = {
        display: 'none'
      };
      content = (<span style={style}/>);
    }
    return content;
  }

}

export default ClipboardOverlay;

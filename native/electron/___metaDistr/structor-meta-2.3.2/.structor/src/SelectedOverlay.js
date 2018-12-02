import { isEqual } from 'lodash';
import React, { Component } from 'react';

const nullPx = '0px';
const px = 'px';
const nonePos = {top: 0, left: 0, width: 0, height: 0};

function isVisible (element) {
  let invisibleParent = false;
  if (element.css('display') === 'none') {
    invisibleParent = true;
  } else {
    element.parents().each(function (i, el) {
      if ($(el).css('display') === 'none') {
        invisibleParent = true;
        return false;
      }
      return true;
    });
  }
  return !invisibleParent;
}

class SelectedOverlay extends Component {

  constructor (props) {
    super(props);
    this.state = {
      newPos: null,
      mousePos: undefined,
      contextMenuType: null,
      contextMenuItem: null,
      isOverlay: false,
    };
    this.startRefreshTimer = this.startRefreshTimer.bind(this);
    this.refreshPosition = this.refreshPosition.bind(this);
    this.subscribeToInitialState = this.subscribeToInitialState.bind(this);
    this.setSelectedPosition = this.setSelectedPosition.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount () {
    this.subscribeToInitialState(this.props);
  }

  componentWillUnmount () {
    if (this.refreshTimerId) {
      clearTimeout((this.refreshTimerId));
      this.refreshTimerId = undefined;
    }
    this.$DOMNode = undefined;
  }

  componentWillReceiveProps (nextProps) {
    this.subscribeToInitialState(nextProps);
  }

  subscribeToInitialState (props) {
    const {selectedKey, context} = props;
    if (selectedKey && context) {
      const element = context.getElement(selectedKey);
      if (element) {
        const targetDOMNode = element.getDOMNode();
        this.setSelectedPosition({targetDOMNode});
      } else {
        this.resetTimer();
        this.setState({
          newPos: null
        });
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
      this.$DOMNode = targetDOMNode;
      this.refreshPosition();
    } else {
      console.error('');
    }
  }

  render () {
    const {newPos} = this.state;
    if (!newPos) {
      return null;
    }
    const endPoint = {
      top: newPos.top + px,
      left: newPos.left + px,
    };
    const topLine = {
      top: nullPx,
      left: nullPx,
      width: (newPos.width - 2) + 'px',
    };
    const leftLine = {
      top: nullPx,
      left: nullPx,
      height: (newPos.height - 2) + px,
    };
    const bottomLine = {
      top: (newPos.height - 2) + px,
      left: nullPx,
      width: (newPos.width - 2) + px,
    };
    const rightLine = {
      left: (newPos.width - 2) + px,
      top: nullPx,
      height: (newPos.height - 2) + px,
    };

    // let overlay;
    // if (isOverlay) {
    //   overlay = {
    //     top: nullPx,
    //     left: nullPx,
    //     width: newPos.width + px,
    //     height: newPos.height + px,
    //     opacity: 0.2,
    //     backgroundColor: '#35b3ee',
    //   };
    // }
    return (
      <div
        className="structor_selection-border-center-point"
        style={endPoint}
      >
        <div className="structor_selection-border-top-line" style={topLine}/>
        <div className="structor_selection-border-left-line" style={leftLine}/>
        <div className="structor_selection-border-bottom-line" style={bottomLine}/>
        <div className="structor_selection-border-right-line" style={rightLine}/>
      </div>
    );
  }

}

export default SelectedOverlay;

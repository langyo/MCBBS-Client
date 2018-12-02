import React, { Component } from 'react';

const borderRadius = '2px';
const nullPx = '0px';
const px = 'px';
const position = 'absolute';

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

class HighlightedOverlay extends Component {

  constructor (props) {
    super(props);
    this.state = {
      newPos: null
    };
    this.subscribeToInitialState = this.subscribeToInitialState.bind(this);
    this.setSelectedPosition = this.setSelectedPosition.bind(this);
  }

  componentDidMount () {
    this.subscribeToInitialState();
  }

  componentWillUnmount () {
    this.$DOMNode = undefined;
  }

  subscribeToInitialState () {
    const {selectedKey, context} = this.props;
    if (selectedKey && context) {
      const element = context.getElement(selectedKey);
      if (element) {
        const targetDOMNode = element.getDOMNode();
        this.setSelectedPosition({targetDOMNode});
      } else {
        this.setState({newPos: null});
        console.error('HighlightedOverlay: selection element was not found in state.');
      }
    }
  }

  setSelectedPosition (options) {
    let targetDOMNode = options.targetDOMNode;
    if (targetDOMNode) {
      const $DOMNode = $(targetDOMNode);
      if ($DOMNode) {
        if (isVisible($DOMNode)) {
          let pos = $DOMNode.offset();
          let newPos = {
            top: pos.top,
            left: pos.left,
            width: $DOMNode.outerWidth(),
            height: $DOMNode.outerHeight()
          };
          this.setState({newPos});
        }
      }
    } else {
      console.error('HighlightedOverlay: target DOM node is null');
    }
  }

  render () {
    const {newPos} = this.state;
    let content;
    if (newPos) {
      const endPoint = {
        top: newPos.top + px,
        left: newPos.left + px,
        width: '1px',
        height: '1px',
        position: position,
        zIndex: 1030
      };
      let highlightedBox = {
        top: nullPx,
        left: nullPx,
        width: newPos.width + px,
        height: newPos.height + px,
      };
      content = (
        <div style={endPoint}>
          <div
            className="structor_selected-overlay-highlighted"
            style={highlightedBox}
          />
        </div>
      );
    } else {
      const style = {
        display: 'none'
      };
      content = (<span style={style} />);
    }
    return content;
  }

}

export default HighlightedOverlay;

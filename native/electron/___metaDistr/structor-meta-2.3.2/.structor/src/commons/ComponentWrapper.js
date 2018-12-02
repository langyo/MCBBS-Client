import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ComponentWrapper extends Component {

  constructor (props, content) {
    super(props, content);

    this.initDOMNode = this.initDOMNode.bind(this);
    this.subscribeToContext = this.subscribeToContext.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleNoop = this.handleNoop.bind(this);
  }

  initDOMNode () {
    if (!this.$DOMNode) {
      this.$DOMNode = $(ReactDOM.findDOMNode(this));
      this.$DOMNode
        .on('mousedown', this.handleMouseDown)
        .on('mouseover', this.handleMouseOver)
        .on('mouseout', this.handleMouseOut)
        .on('click', this.handleNoop)
        .on('doubleclick', this.handleNoop)
        .on('mouseup', this.handleNoop)
        .on('contextmenu', this.handleContextMenu);
    }
  }

  componentDidMount () {
    this.initDOMNode();
    this.subscribeToContext(this.props);
  }

  componentWillUpdate (nextProps, nextState) {
    this.subscribeToContext(nextProps);
  }

  componentWillUnmount () {
    let { context, elementKey } = this.props;
    if (context) {
      context.removeElement(elementKey);
    }
    if (this.$DOMNode) {
      this.$DOMNode
        .off('mousedown')
        .off('mouseover')
        .off('mouseout')
        .off('click')
        .off('doubleclick')
        .off('mouseup')
        .off('contextmenu');
    }
    this.$DOMNode = undefined;
  }

  subscribeToContext (props) {
    let { context, elementKey, type } = props;
    if (context) {
      context.addElement(elementKey, {
        type,
        getDOMNode: () => {
          this.initDOMNode();
          return this.$DOMNode;
        }
      });
    }
  }

  handleMouseDown (e) {
    if (!e.shiftKey) {
      e.stopPropagation();
      e.preventDefault();
      const {context, elementKey} = this.props;
      if (context) {
        context.trigger('componentClick', elementKey, e.metaKey || e.ctrlKey, e.button);
        context.trigger('mouseDown', e);
      }
    }
  }

  handleContextMenu (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  handleMouseOver (e) {
    const {context, elementKey, type} = this.props;
    if (context) {
      context.trigger('mouseOver', {targetDOMNode: this.$DOMNode[0], type, key: elementKey});
    }
  }

  handleMouseOut (e) {
    const {context} = this.props;
    if (context) {
      context.trigger('mouseOut', {targetDOMNode: this.$DOMNode[0], remove: true});
    }
  }

  handleNoop (e) {
    if (!e.shiftKey) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  render () {
    const {wrappedComponent, wrappedProps, children} = this.props;
    return React.createElement(wrappedComponent, wrappedProps, children);
  }
}

export default ComponentWrapper;
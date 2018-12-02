/**
 *
 * ContextMenu
 *
 */

import { isEqual } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const MENU_WIDTH = 200;
export const MENU_HEIGHT = 195;

const showParentsNumber = 4;

const makeTitle = (componentName) => {
  let titleComponentName = componentName;
  if (titleComponentName && titleComponentName.length > 30) {
    titleComponentName = titleComponentName.substr(0, 27) + '...';
  }
  return titleComponentName;
};

class ContextMenu extends Component {
  constructor (props) {
    super(props);
    this.state = {
      parents: [],
      showParents: false,
    };
    this.setParentList = this.setParentList.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
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
    this.handleSelect = this.handleSelect.bind(this);
    this.toggleParents = this.toggleParents.bind(this);
  }

  componentDidMount () {
    this.setParentList(this.props);
  }

  componentWillReceiveProps (nextProps) {
    const {selectedKeys} = this.props;
    if (selectedKeys &&
      nextProps.selectedKeys &&
      !isEqual(selectedKeys, nextProps.selectedKeys)) {
      this.setParentList(nextProps);
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    const {centerPointY, centerPointX, position, selectedKeys} = this.props;
    const {parents, showParents} = this.state;
    return nextProps.centerPointY !== centerPointY ||
      nextProps.centerPointX !== centerPointX ||
      nextProps.position !== position ||
      nextProps.selectedKeys !== selectedKeys ||
      nextState.parents !== parents ||
      nextState.showParents !== showParents;
  }

  setParentList (props) {
    const {selectedKeys, context} = props;
    let parents = [];
    if (selectedKeys.length === 1) {
      const {get} = context;
      const parentList = get('parentList', selectedKeys[0]);
      if (parentList && parentList.length > 0) {
        const componentNumber = parentList.length - 1;
        const lastIndex = componentNumber - 1;
        const restNumber = componentNumber > showParentsNumber ? componentNumber - showParentsNumber : 0;
        let item;
        for (let i = lastIndex - restNumber; i >= 1; i--) {
          item = parentList[i];
          parents.push({
            title: makeTitle(item.modelNode.type),
            key: item.key,
          });
        }
      }
    }
    this.setState({parents, showParents: false});
  }

  handleMouseOver (e) {
    const {context} = this.props;
    if (context) {
      const selectKey = e.currentTarget.dataset.key;
      context.trigger('highlight', selectKey, true);
    }
  }

  handleMouseOut (e) {
    const {context} = this.props;
    if (context) {
      const selectKey = e.currentTarget.dataset.key;
      context.trigger('highlight', selectKey, false);
    }
  }

  handleContextMenu (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleCloseMenu (e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onCloseMenu();
  }

  handleSelectParent (e) {
    // this.props.onSelectParent(e);
  }

  handleBefore (e) {
    e.stopPropagation();
    e.preventDefault();
    const {context, onCloseMenu} = this.props;
    if (context) {
      context.trigger('before');
      onCloseMenu();
    }
  }

  handleFirst (e) {
    e.stopPropagation();
    e.preventDefault();
    const {context, onCloseMenu} = this.props;
    if (context) {
      context.trigger('first');
      onCloseMenu();
    }
  }

  handleLast (e) {
    e.stopPropagation();
    e.preventDefault();
    const {context, onCloseMenu} = this.props;
    if (context) {
      context.trigger('last');
      onCloseMenu();
    }
  }

  handleAfter (e) {
    e.stopPropagation();
    e.preventDefault();
    const {context, onCloseMenu} = this.props;
    if (context) {
      context.trigger('after');
      onCloseMenu();
    }
  }

  handleReplace (e) {
    e.stopPropagation();
    e.preventDefault();
    const {context, onCloseMenu} = this.props;
    if (context) {
      context.trigger('replace');
      onCloseMenu();
    }
  }

  handleCut (e) {
    e.stopPropagation();
    e.preventDefault();
    const {context, selectedKeys, onCloseMenu} = this.props;
    if (context && selectedKeys) {
      context.trigger('cut', selectedKeys);
      onCloseMenu();
    }
  }

  handleCopy (e) {
    e.stopPropagation();
    e.preventDefault();
    const {context, selectedKeys, onCloseMenu} = this.props;
    if (context && selectedKeys) {
      context.trigger('copy', selectedKeys);
      onCloseMenu();
    }
  }

  handleClone (e) {
    // this.props.onClone(e);
  }

  handleDelete (e) {
    e.stopPropagation();
    e.preventDefault();
    const {context, onCloseMenu} = this.props;
    if (context) {
      context.trigger('delete');
      onCloseMenu();
    }
  }

  handleSelect (e) {
    e.stopPropagation();
    e.preventDefault();
    const selectKey = e.currentTarget.dataset.key;
    const {context, onRenewPosition} = this.props;
    if (context) {
      context.trigger('select', selectKey);
      context.trigger('highlight', selectKey, false);
    }
  }

  toggleParents (e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({showParents: !this.state.showParents});
  }

  render () {
    const {centerPointY, centerPointX, position, selectedKeys, context} = this.props;
    const {parents, showParents} = this.state;
    let top = centerPointY;
    let left = centerPointX;
    if (position) {
      const {horizontal, vertical} = position;
      if (horizontal === 'left') {
        left -= MENU_WIDTH;
      }
      if (vertical === 'top') {
        top -= MENU_HEIGHT;
      }
    }
    let componentName;
    let isMultipleSelection = selectedKeys.length > 1;
    let parentElements = [];
    const menuBoxStyle = {width: isMultipleSelection ? '150px' : '200px'};
    let menuTabStyle = {zIndex: 15, left: 0};
    if (isMultipleSelection) {
      componentName = 'Multiple selection';
    } else if (selectedKeys.length === 1) {
      const element = context.getElement(selectedKeys[0]);
      if (element) {
        componentName = makeTitle(element.type);
      }
      if (parents && parents.length > 0) {
        if (showParents) {
          parents.forEach((item, index) => {
            parentElements.push(
              <div
                key={'parentTab' + item.key + index}
                className="structor_context-menu-tab parent"
                style={{zIndex: index * 5, left: (index * 1.7) + 'em'}}
              >
                <div
                  className="structor_context-menu-title-wrapper rotate"
                  data-key={item.key}
                  onClick={this.handleSelect}
                  onMouseOver={this.handleMouseOver}
                  onMouseOut={this.handleMouseOut}
                  title="Select component"
                >
                  {item.title}
                </div>
              </div>
            );
          });
        } else {
          parentElements.push(
            <div
              key="parentTabToggler"
              className="structor_context-menu-tab parent"
              style={{zIndex: 0, left: 0}}
              onClick={this.toggleParents}
              title="Show parent components"
            >
              <div style={{padding: '0.5em 0.3em'}}>
                <div className="umy-icon-play-back" />
              </div>
            </div>
          );
        }
      }
      menuTabStyle.zIndex = parentElements.length * 5;
      menuTabStyle.left = (parentElements.length * 1.7) + 'em';
    }
    return (
      <div
        className="structor_mouse-center-point"
        style={{top, left, zIndex: 1045}}
        onContextMenu={this.handleContextMenu}
      >

        <div
          className="structor_context-menu-box"
          style={menuBoxStyle}
        >
          {parentElements}
          <div
            className="structor_context-menu-tab child"
            style={menuTabStyle}
          >
            <div className="structor_context-menu-title">
              {componentName}
              <div className="structor_context-menu-close-button">
                <div
                  className="umy-icon-cancel-circle structor_context-menu-item-icon"
                  onClick={this.handleCloseMenu}
                />
              </div>
            </div>
            <div className="structor_context-menu-horizontal-container">
              <div className="structor_context-menu-container-item">
                <div className="structor_context-menu-paste-box">
                  <div
                    className="structor_context-menu-add-placeholder"
                    onClick={this.handleBefore}
                  >
                    Before
                  </div>
                  <div className="structor_context-menu-paste-component">
                    <div
                      className="structor_context-menu-add-placeholder narrow"
                      onClick={this.handleFirst}
                    >
                      First
                    </div>
                    <div
                      className="structor_context-menu-replace-placeholder"
                      onClick={this.handleReplace}
                    >
                      Replace
                    </div>
                    <div
                      className="structor_context-menu-add-placeholder narrow"
                      onClick={this.handleLast}
                    >
                      Last
                    </div>
                  </div>
                  <div
                    className="structor_context-menu-add-placeholder"
                    onClick={this.handleAfter}
                  >
                    After
                  </div>
                </div>
              </div>
              <div className="structor_context-menu-vertical-container">
                <div
                  className="structor_context-menu-item"
                  onClick={this.handleCopy}
                >
                  <div
                    className="umy-icon-copy structor_context-menu-item-icon"
                    onClick={this.handleCopy}
                  />
                </div>
                <div
                  className="structor_context-menu-item"
                  onClick={this.handleCut}
                >
                  <div
                    className="umy-icon-cut structor_context-menu-item-icon"
                    onClick={this.handleCut}
                  />
                </div>
                <div className="structor_context-menu-container-gutter"/>
                <div
                  className="structor_context-menu-item"
                  onClick={this.handleDelete}
                >
                  <div
                    className="umy-icon-delete structor_context-menu-item-icon"
                    onClick={this.handleDelete}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ContextMenu.propTypes = {
  centerPointY: PropTypes.number.isRequired,
  centerPointX: PropTypes.number.isRequired,
  position: PropTypes.object.isRequired,
};
ContextMenu.defaultProps = {
  centerPointY: 0,
  centerPointX: 0,
  position: {},
};

export default ContextMenu;

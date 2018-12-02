import React, { Component } from 'react';
import { isEqual } from 'lodash';
import { getPagePathName } from './commons/constants.js';
import pageDefaultModel from './commons/model.js';
import { createElements } from './commons/pageUtils.js';
import Context from './commons/Context.js';

import MouseOverOverlay from './MouseOverOverlay.js';
import SelectedOverlay from './SelectedOverlay.js';
import HighlightedOverlay from './HighlightedOverlay.js';
import ClipboardOverlay from './ClipboardOverlay.js';
import MouseMenuOverlay from './MouseMenuOverlay';

class PageForDesk extends Component {

  constructor (props, content) {
    super(props, content);
    this.elementTree = [];
    this.pageContext = new Context();
    this.state = {
      isEditModeOn: true,
      updateCounter: 0
    };

    this.changePath = this.changePath.bind(this);
    this.changeRealPath = this.changeRealPath.bind(this);
    this.updatePageModel = this.updatePageModel.bind(this);
    this.updateMarks = this.updateMarks.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
  }

  componentDidMount () {
    if (window.onPageDidMount) {
      window.onPageDidMount(this);
      this.changeRealPath(window.location.pathname);
    }
  }

  componentWillUnmount () {
    this.pageContext.clear();
    this.elementTree = undefined;
  }

  handleMouseDown (e) {
    // const {isEditModeOn} = this.state;
    // if (isEditModeOn) {
    //   this.pageContext.trigger('mouseDown', e);
    // }
  }

  handleContextMenu (e) {
    const {isEditModeOn} = this.state;
    if (isEditModeOn) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  getContext () {
    return this.pageContext;
  }

  changePath (pagePathname) {
    const {get, trigger} = this.pageContext;
    this.updatePageModel({
      pathname: pagePathname
    });
    trigger('pathnameChanged', pagePathname);
  }

  changeRealPath (realPathname) {
    const {get, trigger} = this.pageContext;
    const pathname = getPagePathName(realPathname);
    const nextPagePath = get('pagePath', pathname);
    this.updatePageModel({
      pathname: nextPagePath
    });
    trigger('pathnameChanged', nextPagePath);
  }

  updatePageModel (options) {
    const {pathname} = options;
    const {get} = this.pageContext;
    const isEditModeOn = get('mode');
    let pageModel = get('pageModel', pathname);
    if (!pageModel) {
      pageModel = pageDefaultModel;
      pageModel.children[0].children[0].modelNode.text =
        'Route was not found: ' + pathname + '. Try to select another route.';
    }
    this.elementTree = createElements(
      pageModel,
      this.pageContext,
      isEditModeOn
    );
    this.setState({
      pathname: pathname,
      isEditModeOn: isEditModeOn,
      updateCounter: this.state.updateCounter + 1
    });
    if (isEditModeOn) {
      $('html').on('contextmenu', this.handleContextMenu);
    } else {
      $('html').off('contextmenu');
    }
  }

  updateMarks (options) {
    let {pathname} = options;
    this.setState({
      pathname: pathname,
      updateCounter: this.state.updateCounter + 1
    });
  }

  render () {
    const {isEditModeOn, pathname} = this.state;
    let boundaryOverlays = [];
    let selectedKeys = undefined;
    if (isEditModeOn && pathname) {
      const {get} = this.pageContext;
      const {selected, highlighted, forCutting, forCopying} = get('marked', pathname);
      if (selected && selected.length > 0) {
        selectedKeys = selected;
        selected.forEach(key => {
          boundaryOverlays.push(
            <SelectedOverlay
              key={'selected' + key}
              context={this.pageContext}
              selectedKey={key}
            />
          );
        });
      }
      if (forCutting && forCutting.length > 0) {
        forCutting.forEach(key => {
          boundaryOverlays.push(
            <ClipboardOverlay
              key={'forCutting' + key}
              context={this.pageContext}
              bSize="2px"
              bStyle="dotted #f0ad4e"
              selectedKey={key}
            />
          );
        });
      }
      if (forCopying && forCopying.length > 0) {
        forCopying.forEach(key => {
          boundaryOverlays.push(
            <ClipboardOverlay
              key={'forCopying' + key}
              context={this.pageContext}
              bSize="2px"
              bStyle="dotted #5cb85c"
              selectedKey={key}
            />
          );
        });
      }
      if (highlighted && highlighted.length > 0) {
        highlighted.forEach(key => {
          boundaryOverlays.push(
            <HighlightedOverlay
              key={'highlighted' + key}
              context={this.pageContext}
              selectedKey={key}
            />
          );
        });
      }
    }
    return (
      <div
        id="pageContainer"
        style={{padding: '0.1px'}}
        className={isEditModeOn ? "structor_unselectable" : ""}
        onMouseDown={this.handleMouseDown}
        onContextMenu={this.handleContextMenu}
      >
        {this.elementTree}
        {boundaryOverlays}
        {isEditModeOn ?
          <MouseOverOverlay
            context={this.pageContext}
            selectedKeys={selectedKeys}
            bSize="1px"
          />
          : null
        }
        {isEditModeOn &&
          <MouseMenuOverlay
            context={this.pageContext}
            selectedKeys={selectedKeys}
          />
        }
      </div>
    );
  }

}

export default PageForDesk;


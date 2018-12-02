import { forOwn, isObject, isString, extend, difference, keys, isEqual } from 'lodash';
import React from 'react';
import ComponentWrapper from './ComponentWrapper.js';
import * as components from '../../app/components.js';

export function findComponent(index, componentName, namespace) {
	let result = undefined;
	if (index) {
		if (componentName && namespace) {
			if (index[namespace]) {
        result = index[namespace][componentName];
			}
		} else if (componentName) {
			result = index[componentName];
		}
	}
	if (!result) {
		result = componentName || 'div';
	}
	return result;
}

export function createElement(node, context, isEditModeOn){

	let modelNode = node.modelNode;
	let type = findComponent(components, modelNode.type, modelNode.namespace);
	let props = extend({}, modelNode.props, {key: node.key});

	if(node.props){
		forOwn(node.props, (prop, propName) => {
			props[propName] = createElement(prop, context, isEditModeOn);
		});
	}

  let nestedElements = null;
  if(node.children && node.children.length > 0){
    if (node.children.length === 1) {
      nestedElements = createElement(node.children[0], context, isEditModeOn)
    } else {
      nestedElements = [];
      node.children.forEach(node => {
        nestedElements.push(createElement(node, context, isEditModeOn));
      });
    }
  } else if(modelNode.text) {
    nestedElements = [modelNode.text];
  }

	let result = null;
	try{
		if(isEditModeOn){
			const wrapperProps = {
				key: node.key,
				elementKey: node.key,
				type: modelNode.type,
				context: context,
				wrappedProps: props,
				wrappedComponent: type,
			};
			result = React.createElement(ComponentWrapper, wrapperProps, nestedElements);
		} else {
			result = React.createElement(type, props, nestedElements);
		}
		if(result.type.prototype){
			if(result.type.prototype.render){
				result.type.prototype.render = ((fn) => {
					return function render(){
						try {
							return fn.apply(this, arguments);
						} catch (err) {
							console.error(err);
							return React.createElement('div', {
								style: {
									width: '100%',
									height: '100%',
									backgroundColor: '#c62828',
									color: 'white',
									padding: '3px',
									display: 'table'
								}
							}, React.createElement('span', {
								style: {
									display: 'table-cell',
									verticalAlign: 'middle'
								}
							}, '\'' + modelNode.type + '\' ' + err.toString()));
						}
					}
				})(result.type.prototype.render);
			}
		}

	} catch(e){
		console.error('Element type: ' + modelNode.type + ' is not valid React Element. Please check your components.js file. ' + e);
	}
	return result;
}

export function createElements(model, context, isEditModeOn){
	context.cleanElements();
	let elements = [];
	if(model && model.children && model.children.length > 0){
		model.children.forEach(child => {
			elements.push(createElement(child, context, isEditModeOn));
		});
	}
	return elements;
}

import Reflux from "reflux";
import Actions from "./actions";

let actions = {};

/**
 * @description 用于为不是全局的 Store 创建 Actions
 * @param {string} source 来源的 Store 名称
 * @param {number} id 该 Store 分配的唯一 ID
 * @returns {Reflux.Actions} 返回为此 Store 创建的 Actions
 */
export function createActions(source, id){
    if(Actions.single[source] === undefined) throw new Error("无法为名称为 " + source + " 的 Store 对象创建独立 Actions");
    if(actions[source] === undefined) actions[source] = {};
    actions[source][id] = Reflux.createActions(Actions.single[source]);
    return actions[source][id];
}

/**
 * @description 用于获取已创建的不是全局的 Store 创建的 Actions
 * @param {string} source 来源的 Store 名称
 * @param {number} id 该 Store 分配的唯一 ID
 * @returns {Reflux.Actions} 返回为此 Store 创建的 Actions
 */
export function getActions(source, id){
    if(actions[source] === undefined) actions[source] = {};
    return actions[source][id];
}
// https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060

module.exports = createElement;

function h(type, props, ...children){
    return {type, props: props || {}, children}
}


// { type: ‘…’, props: { … }, children: [ … ] }

function createElement(node){
    if (typeof node === 'string') {
        // virtual DOM node
        return document.createTextNode(node);
    }
    // return a real DOM node
    return document.createElement(node.type);
}

function createElement_1(node){
    if(typeof node === "string"){
        return document.createTextNode(node);
    }

    const $el = document.createElement(node.type);
    node.children
        .map(createElement)
        .forEach($el.appendChild.bind($el))

    return $el;
}

function updateElement($parent, newNode, oldNode, index) {
    if(!oldNode){
        $parent.appendChild(
                createElement(newNode);
            )
    }else if(!newNode){
        $parent.removeChild(
                $parent.childNodes[index];
            )
    }else if(changed(newNode, oldNode)){
        $parent.replaceChild(
                createElement(newNode),
                $parent.childNodes[index]
            )
    }else if(newNode.type) {
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;

        for(var i=0;i < newLength || i < oldLength; i++){
            updateElement(
                    $parent.childNodes[index],
                    newNode.children[i],
                    oldNode.children[i],
                    i
                )
        }
    }
}

function changed(node1, node2){
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type;
}


// Diff children


function setProp($target, name, value){
    $target.setAttribute(name, value);
}

// 遍历所有的props
function setProps($target, props){
    Object.keys(props).forEach(name => {
        setProp($target, name, props[name]);
      });
}

function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  setProps($el, node.props);
  node.children
    .map(createElement)
    .forEach($el.appendChild.bind($el));
  return $el;
}

// 'class' is reserved word in JS so we will not use it as property name instead of 'className'

// 'checked' and ''
function setBooleanProp($target, name, value) {
  if (value) {
    $target.setAttribute(name, value);
    $target[name] = true;
  } else {
    $target[name] = false;
  }
}

function isCustomProp(name) {
  return false;
}

function setProp($target, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === 'className') {
    $target.setAttribute("class", value);
  } else if (typeof value === 'boolean') {
    setBooleanProp($target, name, value);
  } else {
    $target.setAttribute(name, value);
  }
}

// 差分props, Diff props
function removeBooleanProp($target, name) {
  $target.removeAttribute(name);
  $target[name] = false;
}
function removeProp($target, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === ‘className’) {
    $target.removeAttribute(‘class’);
  } else if (typeof value === ‘boolean’) {
    removeBooleanProp($target, name);
  } else {
    $target.removeAttribute(name);
  }
}
function updateProp($target, name, newVal, oldVal) {
  if (!newVal) {
    removeProp($target, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setProp($target, name, newVal);
  }
}
function updateProps($target, newProps, oldProps = {}) {
  const props = Object.assign({}, newProps, oldProps);
  Object.keys(props).forEach(name => {
    updateProp($target, name, newProps[name], oldProps[name]);
  });
}

function updateElement($parent, newNode, oldNode, index = 0) {
  ...
  } else if (newNode.type) {
    updateProps(
      $parent.childNodes[index],
      newNode.props,
      oldNode.props
    );
 
    ...
  }
}


// Events
// 是否在Props中声明了事件
function isEventProp(name) {
  return /^on/.test(name);
}
function extractEventName(name) {
  return name.slice(2).toLowerCase();
}
// 如何差分functions,将function转换为toString,但是对[native code]并不适用
// 差分event handler functions
function isCustomProp(name) {
  return isEventProp(name);
}
function addEventListeners($target, props) {
  Object.keys(props).forEach(name => {
    if (isEventProp(name)) {
      $target.addEventListener(
        extractEventName(name),
        props[name]
      );
    }
  });
}
function createElement(node) {
  if (typeof node === ‘string’) {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  setProps($el, node.props);
  addEventListeners($el, node.props);
  node.children
    .map(createElement)
    .forEach($el.appendChild.bind($el));
  return $el;
}
function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.type !== node2.type ||
         node.props.forceUpdate;
}
function isCustomProp(name) {
  return isEventProp(name) || name === 'forceUpdate';
}


// write a custom component system for our Virtual DOM

export function addClass (el, className) {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
};

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
};

export function getData (el, attr, val) {
  let prefix = 'data-';
  let name = prefix + attr;
  if (val) {
    el.setAttribute(name, val).apply(this.callee, arguments)
  } else {
    return el.getAttribute(name);
  }
};

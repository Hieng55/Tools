function $(name) {
  return document.querySelector(name);
}

function $$(name) {
  return document.querySelectorAll(name);
}

function gAttr(element, name) {
  return element.getAttribute(name);
}

function sAttr(element, name, value) {
  element.setAttribute(name, value);
}

function rAttr(element, name) {
  return element.removeAttribute(name);
}

function alertStatus(title, text, icon) {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: "OK",
  });
}

const ls = {
  set: function (name, value) {
    return localStorage.setItem(name, JSON.stringify(value));
  },
  get: function (name) {
    return JSON.parse(localStorage.getItem(name));
  },
  delete: function (name) {
    return localStorage.removeItem(name);
  },
};

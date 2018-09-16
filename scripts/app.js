// no functions, only values
const state = {
  input_text: '',
  message: 'yo, planet'
};

// pure functions only, no 'this'
const logic = {
  reverse: (str) => {
    return str.split("").reverse().join(""); 
  }
};

// reads input and state
//  calls logic
//  returns new parial state
const actions = {
  set: args => () => {
    return { [args.key]: args.value };
  },
  display: () => state => {
    return { message: state.input_text }
  },
  reverse: () => state => {
    let new_message = logic.reverse(state.message);
    return { message: new_message };
  }
};

// reusable UI components
//  pure functions that return virtual dom elements
const input_ = (set, key, value) => { return (
    h("input", {
      id: key,
      onkeyup: function onkeyup(e) { return set( { key, value: e.target.value } ); },
      type: "text",
      value: value })
)};
const text_ = (id, value) => { return (h("p", { id }, value)) };
const button_ = (value, action, css_class) => { return (
  h("button", { 
    class: css_class,
    onclick: function onclick() { return action() } }, 
    value)
) };

const view = (state, actions) => { return (
  h("div", { id: 'main' }, 
    input_(actions.set, 'input_text', state.input_text),
    button_('display', actions.display, ''),
    text_('read-me', state.message),
    button_('reverse', actions.reverse, 'button'))
)};



const container = document.getElementById('container'); 
const hyper = app(state, actions, view, container, true);
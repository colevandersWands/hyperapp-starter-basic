const assert = tressa;

tressa.title('--- logic ---');

  // these are pure functions
  //  normal tressa(assertion, message) will work
  let reverse_logic_cases = [
    {arg: 'abc', expected: 'cba'},
    {arg: '{--\n--}', expected: '}--\n--{'}
  ];
  for (let t_case of reverse_logic_cases) {
    let arg = t_case.arg;
    let actual = logic.reverse(arg);
    let expected = t_case.expected;
    assert(actual === expected, 
        {arg, expected, actual} )
  };

tressa.title('--- actions ---');

  // actions are _curried_ functions
  //  they use closure to change their behavior with the state
  //  use the test_action function for testing actions


  let set_action_cases = [
    {arg: { key: 'a', value: 1}, state: null, expected: { a: 1 }},
    {arg: { key: 'b', value: 2}, state: null, expected: { b: 2 }}
  ];
  test_action(actions.set, set_action_cases);

  let reverse_action_cases = [
    {arg: null, state: { message: 'abc' }, expected: { message: 'cba' }},
    {arg: null, state: { message: '{--\n--}' }, expected: { message: '}--\n--{' }}
  ];
  test_action(actions.reverse, reverse_action_cases);

  let display_action_cases = [
    {arg: null, state: { input_text: 'abc' }, expected: { message: 'abc' }},
    {arg: null, state: { input_text: '{--\n--}' }, expected: { message: '{--\n--}' }}
  ];
  test_action(actions.display, display_action_cases);


tressa.title('--- views ---');

  // this is more complex, we deal with this later



// testing utils

function test_action(action, cases) {

  for (let t_case of cases) {
    let arg = t_case.arg;
    let _state = t_case.state;
    let actual = evaluate_action(action, arg, _state);
    let actual_string = JSON.stringify(actual);
    let expected = t_case.expected;
    let expected_string = JSON.stringify(expected);
    assert(actual_string === expected_string, 
        {arg, expected, actual} )
  };

  function evaluate_action(action, args, state) {
    const curried_action = action(args);
    const result = curried_action(state);
    return result;
  };
};
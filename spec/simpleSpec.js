// Things that Jasmine needs to work with
import React from 'react';
import ReactDOM from 'react-dom'; 
import TestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';
// Your React components
import Header from '../src/components/Header';
import Options from '../src/components/Options';
import IndecisionApp from '../src/components/IndecisionApp';

// for using JS localStorage
require('jasmine-local-storage');

/********* TEST UTILS CANNOT RENDER STATELESS COMPONENTS ******/

// For isolated components -> ShallowRenderer
// Does not rely on DOM.
const renderer = ShallowRenderer.createRenderer();

function shallow(Component, props) {
  renderer.render(<Component {...props} />);
  return renderer.getRenderOutput();
}

// For full components, together with their children -> Mount Components
// Does require and relies on DOM.
function mount(Component, props) {
  return TestUtils.renderIntoDocument(<Component {...props} />);
}


describe('Testing React with Jasmine - ShallowRenderer', () => {
  it('should shallow render a header component', () => {
    const header = shallow(Header, {title: 'Testing title', subtitle: 'Testing subtitle'});
    const titleElement = header.props.children[0];
    const subtitleElement = header.props.children[1];

    expect(header.type).toBe('div');
    expect(titleElement.type).toBe('h1');
    expect(titleElement.props.children).toBe('Testing title');
    expect(subtitleElement.type).toBe('h2');
    expect(subtitleElement.props.children).toBe('Testing subtitle');
  });
});

describe('Testing React with Jasmine - Render into document DOM', () => {
  it('should mount a header component', () => {
    const header = mount(Header, {title: 'Testing title', subtitle: 'Testing subtitle'});
    // To read an entire component, extract it from the DOM as a node.
    const headerNode = ReactDOM.findDOMNode(header);
    // To find individual element tags in a component, use the rendered DOM.
    const titleElement = TestUtils.findRenderedDOMComponentWithTag(header, 'h1');
    const subtitleElement = TestUtils.findRenderedDOMComponentWithTag(header, 'h2');

    // To read an entire component, extract it from the DOM as a node.
    expect(headerNode.textContent).toContain('Testing title');
    // To find individual element tags in a component, use the rendered DOM.
    expect(titleElement.textContent).toEqual('Testing title');
    expect(subtitleElement.textContent).toEqual('Testing subtitle');
  });
});

describe('Testing React with Jasmine - Components with children', () => {
  it('should mount an options component with option children', () => {
    const optionsArray = ['Option One', 'Option Two'];
    const options = mount(Options, {options: optionsArray});
    const optionsNode = ReactDOM.findDOMNode(options);

    // Scry is used when there are more elements than one. 
    // The button we are looking for is the first one appearing on the page, so index 0 of the button array.
    const removeAllButton = TestUtils.scryRenderedDOMComponentsWithTag(options, 'button')[0];

    expect(optionsNode.textContent).toContain('Option One');
    expect(removeAllButton).toBeTruthy();
    expect(removeAllButton).toBeDefined();
  });
});

describe('Testing React with Jasmine - Reading component props', () => {
  it('should evaluate the component props', () => {
    const application = mount(IndecisionApp);

    expect(application.props.options.length).toBe(0);
  });
});

describe('Testing React with Jasmine - Testing events', () => {
  it('should simulate click events', () => {
    const application = mount(IndecisionApp);

    const inputNode = TestUtils.findRenderedDOMComponentWithTag(application, 'input');
    const form = TestUtils.findRenderedDOMComponentWithTag(application, 'form');

    inputNode.value = 'New Test Option';
    // Trigger form submit rather than button click (which doesn't work).
    TestUtils.Simulate.submit(form);

    expect(application.state.options.length).toBe(1);
    expect(application.state.options[0]).toBe('New Test Option');
  });
});


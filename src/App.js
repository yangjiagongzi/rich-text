import React, { Component } from 'react';
import './App.css';
import { RichText } from './RichText';

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  onchange(value) {
    console.log('value change:', value);
  }

  render() {
    const keyMapping = [
      {
        keyCode: 13,
        altKey: false,
        ctrlKey: false,
        shiftKey: false,
        metaKey: false,
        keyEvent: () => {
          console.log('敲了回车');
        }
      },
      {
        keyCode: 13,
        shiftKey: true,
        keyEvent: () => {
          console.log('敲了shift回车');
        }
      },
      {
        keyCode: 13,
        preventDefault: true,
        stopPropagation: true,
        shiftKey: false,
        keyEvent: () => {
          const insertDom = document.createElement('span');
          insertDom.innerHTML = '@somebody';
          this._richText.addNode(insertDom);
          // console.log(this._richText.getNode());
        }
      },
      {
        keyCode: 8,
        preventDefault: true,
        stopPropagation: true,
        keyEvent: () => {
          this._richText.delNode(-1);
        }
      }
    ];

    return (
      <div className="App">
        <RichText
          keyMapping={keyMapping}
          placeholder="Edison Chat"
          onChange={this.onchange}
          ref={el => (this._richText = el)}
        />
      </div>
    );
  }
}

export default App;

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
    console.log('^^^^^^^onchange^^^^^^^^');
    console.log(value);
    console.log('^^^^^^^^^^^^^^^');
  }

  render() {
    const keyMapping = [
      {
        keyCode: 13,
        shiftKey: true,
        keyEvent: () => {
          console.log('敲了shift回车');
        }
      },
      {
        keyCode: 65,
        preventDefault: true,
        stopPropagation: true,
        keyEvent: () => {
          const span2 = document.createElement('span');
          span2.innerHTML = '@yangning';
          this._richText.addNode(span2);
          // console.log(this._richText.getNode());
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

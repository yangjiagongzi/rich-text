import React, { Component } from 'react';
import './App.css';
import { RichText } from './RichText';

const AT_BEGIN_CHAR = '\u0005';
const AT_END_CHAR = '\u0004';

function MessageText(text) {
  const regStr = `(${AT_BEGIN_CHAR}.*?${AT_END_CHAR})`;
  const reg = new RegExp(regStr, 'g');
  const newStr = text.replace(reg, `<span className="at">${'$1'}</span>`);
  return (
    <div
      className="msg-text-with-at"
      dangerouslySetInnerHTML={{ __html: newStr }}
    />
  );
}

function getTextFromHtml(str) {
  let strFormat = '';
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = str;
  const childs = tempDiv.childNodes;
  childs.forEach(el => {
    if (el.nodeType === 3) {
      strFormat += el.nodeValue;
    } else if (el.nodeType === 1) {
      const jid = el.getAttribute('jid');
      if (jid) {
        strFormat += `${AT_BEGIN_CHAR}@${jid}${AT_END_CHAR}`;
      }
      if (el.nodeName === 'BR') {
        strFormat += '\n';
      }
    }
  });
  return strFormat;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  onchange = value => {
    const str = getTextFromHtml(value);
    this.setState({ msgBody: str });
  };

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
        <button
          onClick={() => {
            this._richText.delNode(1);
          }}
        >
          123
        </button>
      </div>
    );
  }
}

export default App;

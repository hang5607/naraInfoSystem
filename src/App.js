import React, { Component } from 'react'
import './App.css';
import Grammar from './components/Grammar';

const grammars = [
  {
    'id': 1,
    'content': '문법 내용1',
    'comment': '문법 코멘트1',
    'check': 'Y'
  },
  {
    'id': 2,
    'content': '문법 내용2',
    'comment': '문법 코멘트2',
    'check': 'N'
  },
  {
    'id': 3,
    'content': '문법 내용3',
    'comment': '문법 코멘트3',
    'check': 'Y'
  }
]

class App extends Component {
  render() {
    return (
      <div>
        {grammars.map(c => {
          return <Grammar key={c.id} id={c.id} content={c.content} comment={c.comment} check={c.check}/>
        })}
      </div>
    );
  }
}

export default App;

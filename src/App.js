import React, { Component } from 'react'
import './App.css';
import Grammar from './components/Grammar';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>문법</TableCell>
              <TableCell>비고</TableCell>
              <TableCell>확인</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {grammars.map(c => {
            return <Grammar key={c.id} id={c.id} content={c.content} comment={c.comment} check={c.check}/>
          })}
          </TableBody>
        </Table>
        
      </div>
    );
  }
}

export default App;

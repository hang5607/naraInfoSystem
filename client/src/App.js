import React, { Component } from 'react'
import './App.css';
import Grammar from './components/Grammar';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
});


class App extends Component {

  state = {
    grammars: "",
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({grammars: res}))
      .catch(err => console.log(err));
  }

  progress= () => {
    const { completed } = this.state;
    this.setState( {completed: completed >= 100 ? 0 : completed + 1});
  }

  callApi = async() => {
    const response = await fetch('/api/grammars');
    const body = await response.json();
    return body;
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>문법</TableCell>
              <TableCell>비고</TableCell>
              <TableCell>확인</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.grammars ? this.state.grammars.map(c => {
              return <Grammar key={c.id} id={c.id} content={c.content} comment={c.comment} check={c.check}/>
            }) : 
            <TableRow>
              <TableCell colSpan="4" align="center">
                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
              </TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);

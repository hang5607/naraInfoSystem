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
import GrammarAdd from './components/GrammarAdd';


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

  constructor(props){
    super(props);
    this.state = {
      grammars: "",
      completed: 0
    }
  }

  //state 초기화
  stateRefresh = () => {
    this.setState({
      grammars: '',
      completed: 0
    });
    //고객 목록을 다시 불러와야 하기 때문에 필요한 부분.
    this.callApi()
      .then(res => this.setState({grammars: res}))
      .catch(err => console.log(err));
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
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>문법</TableCell>
                <TableCell>비고</TableCell>
                <TableCell>확인</TableCell>
                <TableCell>설정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.grammars ? this.state.grammars.map(c => {
                return <Grammar stateRefresh={this.stateRefresh} key={c.id} id={c.id} content={c.content} comment={c.comment} check={c.check}/>
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
        <GrammarAdd stateRefresh={this.stateRefresh}/>
      </div>
      
    );
  }
}

export default withStyles(styles)(App);

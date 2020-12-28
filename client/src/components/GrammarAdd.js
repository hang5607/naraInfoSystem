import React from 'react';
import {post} from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})


class GrammarAdd extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            content: '',
            comment: '',
            check: '',
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addGrammar()
            .then((response) => {
                console.log(response.data);
                //데이터 목록은 비동기화이기 때문에 데이터를 DB에 insert 한 후에 refresh
                this.props.stateRefresh();
            })
        this.setState({
            content: '',
            comment: '',
            check: '',
            open: false
        })
    }

    // handleFileChange = (e) => {
    //     this.setState({
    //         file: e.target.files[0],
    //         fileName: e.target.value
    //     })
    // }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addGrammar = () => {
        const url ='/api/grammars';
        //form전송 <파일 업로드 필요시>
        // const formData = new FormData();
        // formData.append('content',this.state.content);
        // formData.append('comment',this.state.comment);
        // formData.append('check',this.state.check);
        let data ={
            content: this.state.content,
            comment: this.state.comment,
            check: this.state.check
        }
        return post(url,data);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            content: '',
            comment: '',
            check: '',
            open: false
        });
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>문법 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>문법 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="문법" type="text" name="content" value={this.state.content} onChange={this.handleValueChange} /><br/>
                        <TextField label="비고" type="text" name="comment" value={this.state.comment} onChange={this.handleValueChange}/><br/>
                        <TextField label="확인 여부" type="text" name="check" value={this.state.check} onChange={this.handleValueChange} /><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default GrammarAdd;
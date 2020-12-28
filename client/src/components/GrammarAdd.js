import React from 'react';
import {post} from 'axios';


class GrammarAdd extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file: null,
            content: '',
            comment: '',
            check: '',
            fileName: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addGrammar()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            content: '',
            comment: '',
            check: ''
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

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>문법 추가</h1>
                문법: <input type="text" name="content" value={this.state.content} onChange={this.handleValueChange} /><br/>
                비고: <input type="text" name="comment" value={this.state.comment} onChange={this.handleValueChange}/><br/>
                확인 여부: <input type="text" name="check" value={this.state.check} onChange={this.handleValueChange} /><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default GrammarAdd
import React from 'react';

class GrammarDelete extends React.Component {
    deleteGrammar(id){
        const url= '/api/grammars/' + id;
        fetch(url,{
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }
    render() {
        return (
            <button onClick={(e) => {this.deleteGrammar(this.props.id)}}>삭제</button>
        )
    }
}


export default GrammarDelete;
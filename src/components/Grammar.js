import React from 'react';

class Grammar extends React.Component{
    render() {
        return (
            <div>
                <GrammarPart id={this.props.id} content={this.props.content}/>
                <GrammarCheck check={this.props.check}/>
            </div>
        )
    }
}

class GrammarPart extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.content}[{this.props.id}]</h2>
            </div>
        )
    }
}

class GrammarCheck extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.check}</p>
            </div>
        )
    }
}
export default Grammar;
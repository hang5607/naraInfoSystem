import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import GrammarDelete from './GrammarDelete';

class Grammar extends React.Component{
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.content}</TableCell>
                <TableCell>{this.props.comment}</TableCell>
                <TableCell>{this.props.check}</TableCell>
                <TableCell><GrammarDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        )
    }
}


export default Grammar;
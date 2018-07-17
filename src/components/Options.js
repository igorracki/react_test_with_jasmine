import React from 'react';
import Option from './Option.js';

export default class Options extends React.Component {
    render() {
        return (
            <div>
                <button className="removeAll" onClick={this.props.handleDeleteOptions}>Remove All</button>
                {this.props.options.length === 0 && <p>Please add an option to get started.</p>}
               {
                   this.props.options.map((option) => {
                       return (<Option 
                                    key={option} 
                                    optionText={option} 
                                    handleDeleteOption={this.props.handleDeleteOption}
                                />);
                   })
               }
            </div>
        );
    }
}
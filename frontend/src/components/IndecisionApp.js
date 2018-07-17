import React from 'react';
import AddOption from './AddOption.js';
import Header from './Header.js';
import Action from './Action.js';
import Options from './Options.js';
import OptionModal from './OptionModal.js';

export default class IndecisionApp extends React.Component {

    state = {
        options: [],
        selectedOption: undefined
    };

    handleDeleteOptions = () => {
        this.setState(() => {
            return {
                options: []
            };
        });
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => {
            return {
                options: prevState.options.filter((option) => {
                    return optionToRemove !== option;
                })
            }
        });
    };

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];

        this.setState((prevState) => {
            return {
                selectedOption: option
            }
        });
    };

    clearSelectedOption = () => {
        this.setState((prevState) => {
            return {
                selectedOption: undefined
            }
        })
    };

    handleAddOption = (option) => {
        if(!option) {
            return 'Enter valid value to add item.';
        } else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exists.'
        } 

        this.setState((previousState) => {
            return {
                options: previousState.options.concat(option)
            };
        });
    };

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if(options) {
                this.setState(() => {
                    return {
                        options: options
                    }
                });
            }
        } catch(error) {

        }
    }

    // Arguments: prevProps, prevState
    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        console.log('component will be unmounted');
    }

    render() {
        const subtitle = "Put your life in the hands of a computer.";

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action 
                    hasOptions={this.state.options.length > 0} 
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options} 
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
                <OptionModal 
                    selectedOption={this.state.selectedOption} 
                    clearSelectedOption={this.clearSelectedOption}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
};
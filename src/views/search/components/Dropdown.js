import React from "react";

import { Multiselect } from 'multiselect-react-dropdown';


export default class SearchDropdown extends React.Component {

    temp_selected = [];

    constructor(props) {
        super(props);
    
        this.state = {
            selectedItems : [],
            dropdownEvent : this.props.handleSelectChange
        };
    
        this.onSelect = this.onSelect.bind(this);

        this.onRemove = this.onRemove.bind(this);
    }


    onSelect(optionsList, selectedItem) {

        if (this.temp_selected.indexOf(selectedItem) <= -1) {
        
            this.temp_selected.push(selectedItem)

            this.setState({
    
                selectedItems : this.temp_selected

            }, () => {

                this.props.onChange(this.state.selectedItems);

            })
        }
           
        
    }
    
    onRemove(optionList, removedItem) {
        
            this.temp_selected = [];

            this.state.selectedItems.forEach(item => {
                if (item !== removedItem) {
                    this.temp_selected.push(item)
                }
            });
    
            this.setState({
    
                selectedItems : this.temp_selected

            }, () => {

                this.props.onChange(this.state.selectedItems);

            })
    }
 
    render() {   
        return ( 
            <Multiselect
                options={this.props.list} // Options to display in the dropdown
                // selectedvalues={this.state.selectedValue} // Preselected value to persist in dropdown
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                onSelect={this.onSelect} // Function will trigger on select event
                />
        )
    }
}

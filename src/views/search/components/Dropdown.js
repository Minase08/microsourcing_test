import React from "react";

import { Multiselect } from 'multiselect-react-dropdown';


export default class SearchDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options : this.props.list,
            onSelectEvent : null,           
            selectedValue : null
        };
    }

    onSelect(optionsList, selectedItem) {
        
    }
    
    onRemove(optionList, removedItem) {
        
    }
 
    render() {   
        return ( 
            <Multiselect
                options={this.state.options} // Options to display in the dropdown
                selectedvalues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                />
        )
    }
}

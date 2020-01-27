import React from "react";

import $ from "jquery";
import axios from "axios";

import countries from "../../../common/forms/commons/countries";

import SearchDropdown from "./Dropdown";

import {
  WidgetGrid,
  JarvisWidget
} from "../../../common";

export default class SearchForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      countryList: []
    }
  }


  static defaultProps = {
    countries
  };

  onSubmit(e) {
    e.preventDefault();
    console.log("checkout submit stuff");
  }

  formatCountry(data) {
   var temp_list = [];

   $.each(data , (count, item) => {
    
    console.log(item)

    temp_list.push({
      name: item.name,
      id: item.code
    })

   });

   this.setState({
    countryList : temp_list
   })
  }

  componentDidMount() {
    axios.get('https://api.openaq.org/v1/countries')
    .then((response) => {

      this.setState({
        isLoaded: true
      });

      this.formatCountry(response.data.results)
    })
    .catch((error) => {
      this.setState({
          isLoaded: true,
          error
        });
    })
    .then(() => {
      // always executed
    });
  }

  render() {

    console.log(this.state.countryList)

    return ( 
      <WidgetGrid>
          {/* START ROW */}
          <div className="row">
            {/* NEW COL START */}
            <article className="col-sm-12 col-md-12 col-lg-12">
              {/* Widget ID (each widget will need unique ID)*/}
              <JarvisWidget
                id="wid-id-0"
                colorbutton={false}
                editbutton={false}
                custombutton={false}
              >
          <fieldset>
            <div className="row">
              <header>
                  <span className="widget-icon">
                  <i className="fa fa-edit" />
                  </span>

                  <h2>Search Filters </h2>
              </header>
              <section className="col col-12">
              <label
                  className="control-label"
                  htmlFor="multiselect1"
                  >
                  Country
              </label>

              <SearchDropdown list={this.state.countryList} ></SearchDropdown>
              
              </section>
            </div>
          <div className="row"> 
          </div>       

          <div className="row">
          </div>
          <footer>
            <button type="submit" className="btn btn-primary">
              Validate Form
            </button>
          </footer>
          </fieldset>

          </JarvisWidget>
          </article>
          </div>
      </WidgetGrid>
    );
  }
}

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
      all_cities: [],
      countryList: [],
      cityList: []
    }
  }


  static defaultProps = {
    countries
  };

  onSubmit(e) {
    e.preventDefault();
    console.log("checkout submit stuff");
  }

  handleCountrySelectChange(selectedItems) {
    console.log("Form Event")
    console.log(selectedItems)

    let currentDocument = this;
    let temp_list = [];

    axios.get('https://api.openaq.org/v1/cities', {
    })
    .then(function (response) {
      
      currentDocument.setState({
        all_cities: response.data.results
      }, () => {

        console.log(currentDocument.state.all_cities);

        selectedItems.forEach(country => {
          currentDocument.state.all_cities.forEach(city => {
            if (city.country === country.id) {
              temp_list.push(city);
            }
          });
        });

        currentDocument.setState({
          cityList : temp_list

        }, () => {
          console.log(temp_list);

        })

      })
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });  
  }

  formatCountry(data) {
   var temp_list = [];

   $.each(data , (count, item) => {

      if (typeof(item.name) !== "undefined") {
          temp_list.push({
            name: item.name,
            id: item.code
          })
        }
    });
 
   this.setState({
    countryList : temp_list
   })
  }

   /* Call API to get List of countries */
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
    return ( 

      <div id="content">

      <WidgetGrid>
        {/* row */}
        <div className="row">
          {/* NEW WIDGET START */}
          <article className="col-sm-12 col-md-12 col-lg-6">
            {/* Widget ID (each widget will need unique ID)*/}
            <JarvisWidget
              id="wid-id-0"
              colorbutton={false}
              editbutton={false}
            >
              <header>
                <span className="widget-icon">
                  <i className="fa fa-eye" />
                </span>
                <h2>Filter Options</h2>
              </header>
              {/* widget div*/}
              <div>
                {/* widget content */}
                <div className="widget-body">
                  <form className="form-horizontal">
                    <fieldset>
                      <legend>Default Form Elements</legend>
                      <div className="form-group">
                        <label className="col-md-2 control-label">
                          Country
                        </label>
                        <div className="col-md-10">
                        <SearchDropdown sType={"Country"} onChange={this.handleCountrySelectChange.bind(this)} list={this.state.countryList} ></SearchDropdown>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">
                          City
                        </label>
                        <div className="col-md-10">
                         <SearchDropdown sType={"City"} list={this.state.cityList} ></SearchDropdown>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">
                          Location
                        </label>
                        <div className="col-md-10">
                        
                        </div>
                      </div>

                    </fieldset>
              
                      <div className="row">
                        <div className="col-md-12">
                          <button className="btn btn-default" type="submit">
                            Cancel
                          </button>
                          <button className="btn btn-primary" onClick={this.onSubmit} type="submit">
                            Submit
                          </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
          </JarvisWidget>     
        </article>
        </div>
      </WidgetGrid>
    </div>
   
    );
  }
}

import React from "react";

import {
  Stats,
  BigBreadcrumbs,
  WidgetGrid,
  JarvisWidget
} from "../../../common";

import Datatable from "../../../common/tables/components/Datatable";

import SearchForm from "./Form";

export default class Search extends React.Component {
    render() {
      return ( 
      <div id="content" className="animated fadeInUp">
        <div className="row">
          <BigBreadcrumbs
            items={["Search", "Air Quality"]}
            className="col-xs-12 col-sm-7 col-md-7 col-lg-4"
          />
          <Stats />
        </div>

        <SearchForm>
        </SearchForm>

        <WidgetGrid>
          <div class="row">
            <article>
              <JarvisWidget id="wid-id-0" editbutton={false} color="darken">
                <header>
                  <span className="widget-icon">
                    <i className="fa fa-table" />
                  </span>
                  <h2>Standard Data Tables</h2>
                </header>
                <div>
                  <div className="widget-body no-padding">
                    <Datatable
                      options={{
                        ajax: "assets/api/tables/datatables.standard.json",
                        columns: [
                          { data: "id" },
                          { data: "name" },
                          { data: "phone" },
                          { data: "company" },
                          { data: "zip" },
                          { data: "city" },
                          { data: "date" }
                        ]
                      }}
                      paginationLength={true}
                      className="table table-striped table-bordered table-hover"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th data-hide="phone">ID</th>
                          <th data-class="expand">
                            <i className="fa fa-fw fa-user text-muted hidden-md hidden-sm hidden-xs" />
                            Name
                          </th>
                          <th data-hide="phone">
                            <i className="fa fa-fw fa-phone text-muted hidden-md hidden-sm hidden-xs" />
                            Phone
                          </th>
                          <th>Company</th>
                          <th data-hide="phone,tablet">
                            <i className="fa fa-fw fa-map-marker txt-color-blue hidden-md hidden-sm hidden-xs" />
                            Zip
                          </th>
                          <th data-hide="phone,tablet">City</th>
                          <th data-hide="phone,tablet">
                            <i className="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs" />
                            Date
                          </th>
                        </tr>
                      </thead>
                    </Datatable>
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

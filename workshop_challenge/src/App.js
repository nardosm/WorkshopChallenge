import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import {Dimmer, Loader, Table } from 'semantic-ui-react'


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [],
      direction: null,
      loading: true
    };
  }

  componentDidMount () {
      const url = "https://randomuser.me/api/?results=20";

      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            data = data.results;
            this.setState({
              data:data,
              loading:false
            });
            console.log(data);
        })
  }


  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    const { column, data, direction } = this.state

    return (


      <div className= "page-padding">

          <Dimmer active = {this.state.loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>


          <Table sortable celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell sorted={column === 'phone' ? direction : null} onClick={this.handleSort('phone')}>
                  Phone
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'email' ? direction : null} onClick={this.handleSort('email')}>
                  Email
                </Table.HeaderCell>

                <Table.HeaderCell sorted={column === 'cell' ? direction : null} onClick={this.handleSort('cell')}>
                  Cell
                </Table.HeaderCell>

              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(data, ({ phone, email, cell }) => (
                <Table.Row key={phone}>
                  <Table.Cell>{phone}</Table.Cell>
                  <Table.Cell>{email}</Table.Cell>
                   <Table.Cell>{cell}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
    )
  }
}

export default App;

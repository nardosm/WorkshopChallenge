import React, { Component } from 'react'
import { Table, Menu, Icon, Segment, Input } from 'semantic-ui-react'
import _ from 'lodash';

const tableData = [
  { name: 'John', age: '15', gender: 'Male' },
  { name: 'Amber', age: '40', gender: 'Female' },
  { name: 'Leslie', age: '25', gender: 'Female' },
  { name: 'Ben', age: '70', gender: 'Male' },
   { name: 'Pob', age: '58', gender: 'Male' },
]



class App extends Component {
  constructor(props) {
    super(props);
    this.data=tableData
    this.renderRow = props.renderBodyRow || this.defaultRenderBodyRow
    this.headerRow = props.headers || Object.keys(this.data.pop());
    this.currentIndex = 0
    this.paginationLimit = props.pageLimit || 8;
    this.pagedData = this.pagination(this.data, this.paginationLimit)

    this.state = {
      data:this.pagedData[0],
      searchTerm: '',
      column: null,
      direction: null,

    }
   
  }


  componentDidMount () {

    console.log(tableData.length)
    /*
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
      */
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













  defaultRenderBodyRow = (data, index) =>
    (<Table.Row key={index}>
      {this.headerRow.map((header, idx) => (<Table.Cell key={idx}>{data[header] || ''}</Table.Cell>))}
    </Table.Row>)

  pagination = (data, perPage) => {
    let sets = [], chunks = data.length / perPage;

    for (var i = 0, j = 0; i < chunks; i++, j += perPage) sets[i] = data.slice(j, j + perPage)

    return sets;
  }

  //TODO:: reset sort/search not global reset
  reset = (type) => {
    this.pagedData = this.pagination(this.data, this.paginationLimit)
    this.currentIndex = 0
    this.setState({
      data: this.pagedData[0],
      searchTerm: '',
      sort: null,
      sortDirection: null
    })
  }

  pageChange = index => {
    if(index === this.currentIndex) return null;
    this.currentIndex = index
    this.setState({ data: this.pagedData[index] })
  }

  

  search = term => {
    if(term !==''){
      var regex = new RegExp(term, 'i');
      const filteredData = this.data.filter(row => Object.values(row).some(prop => regex.test(prop)));

      this.pagedData = this.pagination(filteredData, this.paginationLimit)
      this.currentIndex = 0

      this.setState({
        data: this.pagedData[0],
        searchTerm: term
      })
    } else {
      this.reset('search')
    }
  }

  tableHeaderClass = (header) => this.state.sort === header ? `sorted ${this.state.sortDirection}` : ''

  render(){
    const { column, data, direction } = this.state
    return (
      <div>
        <Segment attached='top' floated="right">
          <Input icon='search' value={this.state.searchTerm} onChange={(event, term) => this.search(term.value)} placeholder='Search...' />
        </Segment>
        <Table sortable celled style={{overflowX:'scroll'}}>


          <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={column === 'email' ? direction : null} onClick={this.handleSort('email')}>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'phone' ? direction : null} onClick={this.handleSort('phone')}>
              Age
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'cell' ? direction : null} onClick={this.handleSort('cell')}>
              Gender
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>


          <Table.Body>
            {this.state.data &&
              this.state.data.map((item, idx) => this.renderRow(item, idx))
            }
          </Table.Body>
          {this.pagedData &&
            this.pagedData.length > 1 &&
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan={this.headerRow.length}>
                  <Menu floated='right' pagination>
                    {this.currentIndex !== 0 && this.pagedData.length > 1 &&
                      <Menu.Item onClick={() => this.pageChange(this.currentIndex-1)} as='a' icon><Icon name='left chevron' /></Menu.Item>
                    }
                    {this.pagedData.map((dataSet, index) => (
                      <Menu.Item key={index} active={index === this.currentIndex} onClick={() => this.pageChange(index)} as='a'>{index+1}</Menu.Item>
                    ))}
                    {this.currentIndex+1 < this.pagedData.length &&
                      <Menu.Item onClick={() => this.pageChange(this.currentIndex+1)} as='a' icon><Icon name='right chevron' /></Menu.Item>
                    }

                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          }
        </Table>
      </div>)
  }

}


export default App
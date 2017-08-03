import React, { Component } from 'react'
import {Checkbox, Loader, Dimmer, Button, Sidebar, Menu, Header } from 'semantic-ui-react'
import _ from 'lodash';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './App.css'; 
import Purchase from './Purchase.js'
import Refinance from './Refinance.js'
import Definitions from './Definitions.js'



export default class TabOptions extends Component {

  constructor(props){
    super(props);
    this.state={
      tab1_hidden: false,
      tab2_hidden: true,
      tab3_hidden: true
    }
  }

  state = {}
  handleItemClick = (e, { name }) => {
    
    switch(name){
      case 'editorials':
        this.setState({
          tab1_hidden: false,
          tab2_hidden: true,
          tab3_hidden: true
          })
        break;
      case 'reviews':
        this.setState({
          tab1_hidden: true,
          tab2_hidden: false,
          tab3_hidden: true
        })
        break;
      case 'upcomingEvents':
        this.setState({
          tab1_hidden: true,
          tab2_hidden: true,
          tab3_hidden: false

        })
        break;
    }

    this.setState({ 
      activeItem: name 
    })
  }

  render(){

    const { activeItem } = this.state
    return(
      <div>
          <Menu widths='3'>
            <Menu.Item
              name='editorials'
              active={activeItem === 'editorials'}
              content='Purchase Data'
              onClick={this.handleItemClick}
            />

            <Menu.Item
              name='reviews'
              active={activeItem === 'reviews'}
              content='Refinance Data'
              onClick={this.handleItemClick}
            />

            <Menu.Item
              name='upcomingEvents'
              active={activeItem === 'upcomingEvents'}
              content='Definitions'
              onClick={this.handleItemClick}
            />
          </Menu>

          <div style={{marginTop:'70px'}} hidden={this.state.tab1_hidden}>
             <Header as='h1' textAlign='center'>Purchase Data</Header>


              <Header as='h3' style={{marginBottom:'70px', fontWeight:'normal', lineHeight:1.5}} textAlign='center'>
                This Single Family Portfolio Snapshot consists of purchase data. he data tables can be used to quickly create new reports of interest to the user. 
                The data records themselves are loan level data using all of the categorical variables highlighted on the pivot table.
              </Header>
            <Purchase />
          </div>

        
        <div style={{marginTop:'70px'}}  hidden={this.state.tab2_hidden}>
              <Header as='h1' textAlign='center'>Refinance Data</Header>
              <Header as='h3' style={{marginBottom:'70px', fontWeight:'normal', lineHeight:1.5}} textAlign='center'>
                This Single Family Portfolio Snapshot consists of refinance data. he data tables can be used to quickly create new reports of interest to the user. 
                The data records themselves are loan level data using all of the categorical variables highlighted on the pivot table.
              </Header>
            <Refinance />
          </div>
          <div hidden={this.state.tab3_hidden} style={{marginTop:'70px'}}>
            <Header as='h1' textAlign='center'>Definitions</Header>
              <Header as='h3' style={{marginBottom:'70px', fontWeight:'normal', lineHeight:1.5}} textAlign='center'>
                The definitions page provides details on the single family monthly table. We ran out of words so this is just a filler so that we can have two multiple lines and look cool.
                Yay, we have two lines now. Let's see, what else can we can talk about? Did you know that the person who would proofread Hitler's speeches is technically a grammar Nazi.
              </Header>
            <Definitions />
          </div>
      </div>
    )
  }

}



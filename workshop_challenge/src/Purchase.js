import React, { Component } from 'react'
import {Checkbox, Loader, Dimmer, Button, Sidebar, Menu,Icon, Segment, Container, Card, Header } from 'semantic-ui-react'
import _ from 'lodash';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './App.css'; 



export default class Purchase extends Component {



  constructor(props){
    super(props)
    this.state={
      data:[],
      loading:true,
      visible:false,


      property_state: false,
      property_city: false,
      property_county: false,
      property_zip: false,
      orig_mortg_sponsor_orig: false,
      originating_mortgagee_number: false,
      sponsor_name: false,
      sponsor_number: false,
      down_payment_source: false,
      non_profit_number: false,
      product_type: false,
      loan_purpose: false,
      property_type: false,
      interest_rate: false,
      original_mortgage_amount: false,
      endorsement_year: false,
      endorsement_month: false,
    }

        this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount () {

    const url = "https://129.158.65.161/ords/hud1/hud/HUDStats/GetPurchaseData";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
          data = data.items;
          this.setState({
            data:data,
            loading:false

          });
          //console.log(data);
    })     
       
  }



  handleInputChange(event, data) {

    const { name } = data
    console.log(name)

    


      switch(name){

        case 'property_state':
          this.setState({
             property_state: !this.state.property_state,
          })
          break;
        
        case 'property_city':
          this.setState({
              property_city: !this.state.property_city,
          })
          break;
        
        case 'property_county':
          this.setState({
             property_county: !this.state.property_county,
          })
          break;
        
        case 'property_zip':
          this.setState({         
              property_zip: !this.state.property_zip,
          })
          break;
        
        case 'orig_mortg_sponsor_orig':
          this.setState({
             orig_mortg_sponsor_orig: !this.state.orig_mortg_sponsor_orig,
          })
          break;
        
        case 'originating_mortgagee_number':
          this.setState({
              originating_mortgagee_number: !this.state.originating_mortgagee_number,
          })
          break;
        
        case 'sponsor_name':
          this.setState({
             sponsor_name: !this.state.sponsor_name,
          })
          break;
        
        case 'sponsor_number':
          this.setState({
             sponsor_number: !this.state.sponsor_number,
          })
          break;
        
        case 'down_payment_source':
          this.setState({
             down_payment_source: !this.state.down_payment_source,
          })
          break;
        

        case 'non_profit_number':
          this.setState({
              non_profit_number: !this.state.non_profit_number,
          })
          break;

        case 'product_type':
          this.setState({
             product_type: !this.state.product_type,
          })
          break;


        case 'loan_purpose':
          this.setState({
              loan_purpose: !this.state.loan_purpose,
          })
          break;

        case 'property_type':
          this.setState({
              property_type: !this.state.property_type,
          })
          break;


        case 'interest_rate':
          this.setState({
               interest_rate: !this.state.interest_rate ,
          })
          break;

        case 'original_mortgage_amount':
          this.setState({
              original_mortgage_amount: !this.state.original_mortgage_amount,
          })
          break;


        case 'endorsement_year':
          this.setState({
              endorsement_year: !this.state.endorsement_year,
          })
          break;


        case 'endorsement_month':
          this.setState({
               endorsement_month: !this.state.endorsement_month,
          })
          break;
        
        }
 
  }





   toggleVisibility = () => this.setState({ visible: !this.state.visible })




  render() {

  const { visible } = this.state

    return (

      <div className="page_padding">
       <Dimmer inverted active={this.state.loading}>
          <Loader>Loading</Loader>
        </Dimmer>
     

    
       
         <Button content='FILTER' icon='filter' labelPosition='left' onClick={this.toggleVisibility}/>
  

      <Sidebar.Pushable>

          <Sidebar as={Menu} animation='scale down' direction="left" width='thin' visible={visible} icon='labeled'  vertical page>
            
            <Checkbox checked={!this.state.property_state}  name="property_state" onChange={this.handleInputChange}  label='Property State ' />
            <Checkbox checked={!this.state.property_city}  name="property_city" onChange={this.handleInputChange} label='Property City ' />
            <Checkbox checked={!this.state.property_county}  name="property_county" onChange={this.handleInputChange}  label='Property County' />
            <Checkbox checked={!this.state.property_zip}  name="property_zip" onChange={this.handleInputChange} label='Property Zip' />
            <Checkbox checked={!this.state.orig_mortg_sponsor_orig}  name="orig_mortg_sponsor_orig" onChange={this.handleInputChange}  label='Originating Mortgage Sponsor' />
            <Checkbox checked={!this.state.originating_mortgagee_number}  name="originating_mortgagee_number" onChange={this.handleInputChange} label='Originating Mortgage Number' />
            <Checkbox checked={!this.state.sponsor_name}  name="sponsor_name" onChange={this.handleInputChange}  label='Sponsor Name' />
            <Checkbox checked={!this.state.sponsor_number}  name="sponsor_number" onChange={this.handleInputChange} label='Sponsor Number' />
            <Checkbox checked={!this.state.down_payment_source}  name="down_payment_source" onChange={this.handleInputChange}  label='Down Payment Source' />
            <Checkbox checked={!this.state.non_profit_number}  name="non_profit_number" onChange={this.handleInputChange} label='Non-Profit Number' />
            <Checkbox checked={!this.state.product_type}  name="product_type" onChange={this.handleInputChange}  label='Product Type ' />
            <Checkbox checked={!this.state.loan_purpose}  name="loan_purpose" onChange={this.handleInputChange} label='Loan Purpose' />
            <Checkbox checked={!this.state.property_type}  name="property_type" onChange={this.handleInputChange}  label='Property Type ' />
            <Checkbox checked={!this.state.interest_rate}  name="interest_rate" onChange={this.handleInputChange}  label='Interest Rate' />
            <Checkbox checked={!this.state.original_mortgage_amount}  name="original_mortgage_amount" onChange={this.handleInputChange} label='Original Mortgage Amount' />
            <Checkbox checked={!this.state.endorsement_year}  name="endorsement_year" onChange={this.handleInputChange}  label='Endorsement Year' />
            <Checkbox checked={!this.state.endorsement_month}   name="endorsement_month" onChange={this.handleInputChange} label='Endorsement Month' />

          </Sidebar>



        <Sidebar.Pusher className="sideBarBackground">
           
         
        <BootstrapTable className=""  data={this.state.data} striped hover pagination search>

          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.property_state} name= 'property_state' isKey dataField='property_state' dataSort={true}>Property State</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.property_city} dataField='property_city' dataSort={true}>Property City</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.property_county}  dataField='property_county' dataSort={true}>Property County</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.property_zip}  dataField='property_zip' dataSort={true}>Property Zip</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.orig_mortg_sponsor_orig}  dataField='orig_mortg_sponsor_orig' dataSort={true}>Originating Mortgage Sponsor</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.originating_mortgagee_number}  dataField='originating_mortgagee_number' dataSort={true}>Originating Mortgagee Number</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.sponsor_name}  dataField='sponsor_name' dataSort={true}>Sponsor Name</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.sponsor_number}  dataField='sponsor_number' dataSort={true}>Sponsor Number</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.down_payment_source}  dataField='down_payment_source' dataSort={true}>Down payment Source</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.non_profit_number}  dataField='non_profit_number' dataSort={true}>Non Profit Number</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.product_type}  dataField='product_type' dataSort={true}>Product Type</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.loan_purpose}  dataField='loan_purpose' dataSort={true}>Loan Purpose</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.property_type}  dataField='property_type' dataSort={true}>Property Type</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.interest_rate}  dataField='interest_rate' dataSort={true}>Interest Rate</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.original_mortgage_amount}  dataField='original_mortgage_amount' dataSort={true}>Original Morgage Amount</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.endorsement_year}  dataField='endorsement_year' dataSort={true}>Endorsement Year</TableHeaderColumn>
          <TableHeaderColumn thStyle={ { whiteSpace: 'normal' } } hidden={this.state.endorsement_month}  dataField='endorsement_month' dataSort={true}>Endorsement Month</TableHeaderColumn>
      
        </BootstrapTable>


        
          </Sidebar.Pusher>

           </Sidebar.Pushable>


      </div>
    );
  }
}



import React, { Component } from 'react'
import {Card } from 'semantic-ui-react'
import './App.css'; 




export default class Definitions extends Component {


	constructor(props){

		super(props);
		this.state = {
			data:[]
		}
	}


	componentDidMount () {

	    const url = "https://129.158.65.161/ords/hud1/hud/HUDStats/GetDefinitions";
	    fetch(url)
	      .then((resp) => resp.json())
	      .then((data) => {
	          data = data.items;
	          this.setState({
	            data:data,

	          });
	          //console.log(data);
	    	})     
	       
	  	}


  	render(){
  		let defs = this.state.data;
    	return(

    		<div className= "page-padding">
    			{defs.map(def => 
    				<Card
    					fluid
    					header={def.def_name}
    					description = {def.def_desc}
    					>
    				</Card>
    			)}
    		</div>
        
    	)
  	}

}



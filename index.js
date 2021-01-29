import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay'
import Loader from './Loader'

class App extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {lat:null, ErrMessage: ""}
    // }

    state = {lat:null, ErrMessage: ""}
    
    componentDidMount(){

        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({lat:position.coords.latitude}), 
            (err) => this.setState({ErrMessage:err.message})
        );
        console.log("my component was rendered to the screen")
    }

    componentDidUpdate(){
        console.log("my component was JUST UPDATED")
    }

    // componentWillUnmount(){

    // }

    renderContent(){
        if(this.state.ErrMessage && !this.state.lat){
            return(<div>Error: {this.state.ErrMessage}</div>)
        }

        if(!this.state.ErrMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat}/>
        }

        return (
            <Loader message="Please Accept Location Request"/>
        );
    }


    render() {
        return(
            <div className='border red'>{this.renderContent()}</div>
        )

        
    }
}

window.addEventListener('keypress', (e) => {
    if(e){
     window.location.reload(false);
    }  
})

ReactDOM.render(<App/>, document.querySelector('#root'));
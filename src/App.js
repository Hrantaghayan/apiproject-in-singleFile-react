
import './App.css';
import React from 'react';


class App extends React.Component{
  constructor(...args){
    super(...args)
    this.state={
      value:'affenpinscher',
      allbrreds:[],
      isload:false,
      imgarray:[],
      firstresult:[],
      secondresult:[],
    }
  }

  onselectchange=(e)=>{
    debugger
    console.log(e.target.value)
    this.setState({
      value:e.target.value
    })
  }

  componentDidMount=()=> {
    debugger
    fetch('https://dog.ceo/api/breeds/list/all')
    .then((response)=>{
     return response.json()
    })
    .then( (result)=>{
      let arr = Object.keys(result.message)
      debugger
      console.log(result)
      this.setState({
        allbrreds:Object.keys(result.message),
        isload:true,
        firstresult:arr.map(function (el,ind){
           return(
            <option className='dog' key={arr[ind]}>{el}</option>
           )
        })
      })
    })
  }
onBtnclick=()=>{
  debugger
  fetch(`https://dog.ceo/api/breed/${this.state.value}/images`)
  .then((response)=>{
    return response.json()
  })
  .then((result)=>{
    debugger
    let arr = result.message.slice(0,3)
    this.setState({
      secondresult:arr.map((el,ind)=>{
        return (
          <div key={arr[ind]}>
            <img src={el} alt='good'/>
          </div>
        )
      })
    })
  })
}

  render(){
    return (
   <div className='auth-content'>
    <div className='wrapper'>
      <h1>About Dogs</h1>
       <select className='choose'  onChange={this.onselectchange} >
            {this.state.firstresult}
       </select>
       <button className='btn' onClick={this.onBtnclick}>Click me</button>
       </div>
      <div className='container'>
      {this.state.secondresult}
      </div>
   </div>
    )
  } 
 }


export default App;

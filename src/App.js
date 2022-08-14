import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import LoadingBar from 'react-top-loading-bar'
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize =  10;
  state = {
    progress : 0
  }
  setProgress(progress){
    this.setState({
      progress : progress
    })
  }

  render() {
    return (
      <div>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        
        <BrowserRouter>
         <Routes>
          <NavBar/>
        <Route path="/" element={<News setProgress = {this.setProgress } pageSize={this.pageSize} country="us" category = "general" />} />
        <Route path="business" element={<News setProgress = {this.setProgress } pageSize={this.pageSize} country="us" category="business" />} />
        <Route path="entertainment" element={<News setProgress = {this.setProgress } pageSize={this.pageSize} country="us" category="entertainment" />} />
        <Route path="general" element={<News setProgress = {this.setProgress } pageSize={this.pageSize} country="us" category="general" />} />
        <Route path="health" element={<News setProgress = {this.setProgress } pageSize={this.pageSize} country="us" category="health" />} />
        <Route path="sports" element={<News setProgress = {this.setProgress } pageSize={this.pageSize} country="us" category="sports" />} />
        <Route path="technology" element={<News setProgress = {this.setProgress } pageSize={this.pageSize} country="us" category="technology" />} />
        <Route path="science" element={<News setProgress = {this.setProgress } pageSize={this.pageSize} country="us" category="science" />} />
        

        </Routes>
       </BrowserRouter>
      </div>
    )
  }
}

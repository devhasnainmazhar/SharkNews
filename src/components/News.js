import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {
  static defaultProps = {
    country : 'us',
    pageSize : 9,

  }

   PropTypes = {
    country : PropTypes.bool.isRequired,

  }

  articles = [];

  capitalized = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  
  constructor(props){
    super(props); 
    this.state = {
        articles : this.articles,
        loading : true,
        page : 1,
        totalResults : 0
    }
    document.title = `${this.capitalized(this.props.category)} - Shark News ` ;
  }

  async updateNews (){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true});
    this.props.setProgress(40);
    let data = await fetch(url);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState(
      {  articles : parseData.articles ,
        totalResults : parseData.totalResults ,
         loading : false,
        })
        this.props.setProgress(100);
  }

    async componentDidMount () {
      this.updateNews();
  }

//     handlePrev = async () => {
//     this.setState({ page : this.state.page - 1});
//   this.updateNews();
//   }


//   handleNext = async () => {
//   this.setState({ page : this.state.page + 1});
//   this.updateNews();

//  }


fetchMoreData = async () => {
  this.setState({ page : this.state.page + 1});
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parseData = await data.json();
  this.setState(
    {  articles : this.state.articles.concat(parseData.articles) ,
      totalResults : parseData.totalResults ,
       loading : false,
      }) 

}

  render() {
    return (<>
        <h2 className='text-center' style={{margin : '35px 0px'}}>Shark News - Top {this.capitalized(this.props.category)} Headlines</h2>
        { this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItems  title = {element.title ? element.title.slice(0 , 40) : ""} 
            description = {element.description ? element.description.slice(0 , 85) : ""} 
            imageUrl = {element.urlToImage}
            newsUrl = {element.url}
            author = {element.author}
            date = {element.publishedAt}
            source = {element.source.name}
            />
                  </div>
                 }
               )
             }
        </div>

        </div>
        </InfiniteScroll>


{/* Buttons */}
        {/* <div className="container d-flex justify-content-between">
          <button disabled = {this.state.page <= 1} type='button'
           className='btn btn-dark' onClick={this.handlePrev}>&larr; Previous</button>   
          <button disabled={this.state.page + 1 > Math.floor(this.state.totalResults/this.props.pageSize)}
           type='button' className='btn btn-dark' onClick={this.handleNext}>Next &rarr; </button>
         </div>  */}
     </>
    )
  }
}
 
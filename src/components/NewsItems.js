import React, { Component } from 'react'

export default class NewsItems extends Component {

   
  render() {
    let {title , description , imageUrl , newsUrl , author , date , source} = this.props
    return (
      <div className='my-3'>
        <div className="card">
            <img src={!imageUrl ? "https://images.wsj.net/im-594668/social" : imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}....
              <div className='d-flex justify-content-end position-absolute top-0' style={{right : '0'}}>
              <span className='badge rounded-pill bg-primary'>       {source}         </span>
              </div>
             
              </h5>
              <p className="card-text">{description}....</p>
              <p className="card-text"><small className="text-muted"> By {!author ? 'Unknown' : author} on {new Date(date).toGMTString()}</small></p>
              <a rel="noreferrer" href={newsUrl} target= "_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
</div>
      </div>
    )
  }
}

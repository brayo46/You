import React, { Component } from 'react';
import {VideosList, Footer } from 'components';



export default class Home extends Component {

  constructor (props) {
    super(props);
        // Set the videoList to empty array
    this.state = { videoList: [] };


  }

  async componentDidMount () {
        // Calls GET /api/v1/videos to populate videosList
    try {
      const response = await fetch(API);
      const videosList = await response.json();
      this.setState({ videosList }); // re-render with new behaviour 

    } catch (e) {
      console.log(e);
    }

  }
  render () {

    const { videosList } = this.state;
    return (
      <main className ="container" id ="container">
        <VideosList videos={videosList} />
        <Footer />
      </main>
    );
  }

}


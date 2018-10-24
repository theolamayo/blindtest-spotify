/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQBMAhb1Qde69Nej3W4Ldr7ZjxJD3Ron9es8KyLVAFmTGlY-SNPDO501X-n-QuqF0L20lm2_m37zS6hQe2-5YTUzrMhiCI9HqZzfY2vLvxHYa73Ce5gRXWBOQqv3x7Ojpe_ok3O_nBIRe9z4QfcFDDT8kd5GULuAgvoPWlcTNvsMKv1A';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class AlbumCover extends Component {
  render() {
    console.log(this.props.track);
    var coverUrl = this.props.track.album.images[0].url;
    return (
      <div>
        <p>dummy text</p>
        <img src={coverUrl}/>
      </div>
    )
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      text: "",
      songsLoaded: false
    };
  }

  componentDidMount() {
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
       Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log("Recepted data: ", data);
        this.setState({tracks: data});
        this.setState({songsLoaded: true})
      })
  }

  render() {
    if (this.state.songsLoaded) {
      var currentTrack = this.state.tracks.items[0].track;
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>
          <div className="App-images">
            <p>Number of available tracks: {this.state.tracks.items.length}</p>
            <p>Track 1: {this.state.tracks.items[0].track.artists[0].name +
                ' - ' + this.state.tracks.items[0].track.name}</p>
            <AlbumCover track={currentTrack}/>
          </div>
          <div className="App-buttons">
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
          </header>
        </div>
      );
    }
  }
}

export default App;

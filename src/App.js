/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQCBd7Sxe8mYgTVaCHEn6yWrJ2FpvGcl3EqAdYMAMfWQ7kjwrlrtcpWRUOlajQCQg9rAzqtqNmlmj0FJitcAujE9A24OZzQmdEauTO90U3IoaFhh1EPTOYEMSaEdPmUZiNBqKUNccfRG95kNWBz8Oa3V8Te9Zwmbl2cvuhWyuN2poUPr';

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
    var coverUrl = this.props.track.album.images[0].url;
    return (
      <div>
        <img src={coverUrl}/>
      </div>
    );
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      songsLoaded: false,
      tracks: null,
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
        var numberTracks = data.items.length;
        var currentTrack = data.items[getRandomNumber(numberTracks)].track;
        const timeout = setTimeout(this.chooseNewCurrentTrack.bind(this), 30000);
        this.setState({
          songsLoaded: true,
          numberTracks: numberTracks,
          tracks: data,
          currentTrack: currentTrack,
          timeout: timeout,
        });
      });
  }

  checkAnswer(id) {
    if (id === this.state.currentId) {
      swal('Bravo', 'You recognized the song!', 'success').then(this.chooseNewCurrentTrack.bind(this));
    } else {
      swal('Nope', 'You failed', 'error');
    }
  }

  chooseRandomTrack() {
    return this.state.tracks.items[getRandomNumber(this.state.numberTracks)].track;
  }

  chooseNewCurrentTrack() {
    this.setState({
      ...this.state,
      currentTrack: this.chooseRandomTrack()
    });
  }

  render() {
    if (this.state.songsLoaded) {
      this.state.currentId = this.state.currentTrack.id;
      const buttonTracks = shuffleArray([
        this.state.currentTrack,
        this.chooseRandomTrack(),
        this.chooseRandomTrack(),
      ]);
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>
          <div className="App-images">
            <p>Number of available tracks: {this.state.numberTracks}</p>
            <AlbumCover track={this.state.currentTrack}/>
            <Sound url={this.state.currentTrack.preview_url} playStatus={Sound.status.PLAYING}/>
          </div>
          <div className="App-buttons">
            {
              buttonTracks.map(track => (
                <Button onClick={() => this.checkAnswer(track.id)}>{track.name}</Button>
              ))
            }
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

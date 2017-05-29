import React, { Component } from 'react';
import axios from 'axios';
import { Timeline } from 'react-twitter-widgets'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
class EPL extends Component {

    state = {
    details: [],
    loading: true,
    error: null,
  }

  componentDidMount() {
    // Remove the 'www.' to cause a CORS error (and see the error state)

    axios.get("http://api.football-data.org/v1/competitions/426/leagueTable", { 
          headers: { "X-Auth-Token" : "d552225d25d546c58e79bd0d09eedb5e"}
        })
      .then(res => {
        // Transform the raw data by extracting the nested posts
        let details = res.data

        // Update state to trigger a re-render.
        // Clear any errors, and turn off the loading indiciator.
        this.setState({
          details,
          loading: false,
          error: null
        });
      })
      .catch(err => {
        // Something went wrong. Save the error in state and re-render.
        this.setState({
          loading: false,
          error: err
        });
      });
  }
  renderLoading() {
    return <div>Loading...</div>;
  }

  renderError() {
    return (
      <div>
        Something went wrong: {this.state.error.message}
      </div>
    );
  }

  renderDetails() {
    // Using destructuring to extract the 'error' and 'posts'
    // keys from state. This saves having to write "this.state.X" everwhere.
    const { error, details } = this.state;

    if(error) {
      return this.renderError();
    }

    return (

      <div>
        {this.state.details.standing.map((standing) =>
          <tr>
          <td><img className="crests" src = {standing.crestURI}></img></td>
          <td>{standing.teamName}</td>
          <td>{standing.playedGames}</td>
          <td>{standing.position}</td>
          <td>{standing.wins}</td>
          <td>{standing.draws}</td>
          <td>{standing.losses}</td>
           <td>{standing.points}</td>
           </tr>
        )}
        </div>
    );
  }


  render() {
    const { loading } = this.state;
    return (
      <div>
        <div >
          <MuiThemeProvider>
          <AppBar style={{
      width: '100%',
      margin: '0 auto',
      backgroundColor: "lightgrey",
      textAlign: "Left",
      textColor: "white",
    }} iconElementLeft = {<div></div>} title = {"EPL League Table"}/>
    </MuiThemeProvider>
        </div>
        <p className = "App-intro">
        </p>
        <div className="leftHalf">
          {loading ? this.renderLoading() : this.renderDetails()}
        </div>
        <div className="rightHalf">
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: 'premierleague'
              }}
              options={{
                username: 'premierleague',
                height: '600',
                quantity: '1'
              }}
        />
        </div>
        </div>
    );
  }
}


export default EPL;
import React , {Component} from 'react';
import {connect} from 'react-redux';
import { fetchuser } from './actions';

class App extends Component {
  constructor(props){
    super(props);

    this.searchUser = this.searchUser.bind(this);
  }

  searchUser(event) {
    this.props.fetchuser(event.target.value);
  }
  
  render(){
    return(
      <div>
        <h2>GitHub Search:</h2>
        <input type="text" placeholder='UserName' onChange={this.searchUser} />
        <p>
          <img src = {this.props.image} alt='Not Found' width={100} />
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  image: state.user.avatar_url
});

const mapDispatchToProps = {
  fetchuser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
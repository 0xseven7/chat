import React from 'react';
import {withRouter} from 'react-router-dom';
@withRouter
class Chat extends React.Component {
  constructor  (props) {
    super (props)
  }
  render () {
    {console.log(this.props);}
    return (
      <div>
        chat with {this.props.match.params.user}
      </div>
    );
  }
}
export default Chat;
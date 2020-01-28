import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.navigate(this.getScreen())
  }

  getScreen = () =>{
    const { role } = this.props;

    switch (role) {
      case 'RecipientUser' :
        return 'userHome';

      case 'sender' :
        return 'senderHome';

      case 'Executor' :
        return 'messages';
    }
  }

  render() {
    return (
      <Container style={{
        flexGrow: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color='#ef7f1a' />
      </Container>
    );
  }
}

const mapStateToProps = ({ authReducer }) => ({
  role: authReducer.role,
});

export default connect(mapStateToProps, null)(HomeScreen);

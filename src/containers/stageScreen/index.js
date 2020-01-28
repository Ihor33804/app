import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';

class StageScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (this.props.token) ? this.props.navigation.navigate(this.getScreen()) : this.props.navigation.navigate('authorization');
    // this.props.navigation.navigate('authorization');
    SplashScreen.hide();
  }

  getScreen = () =>{
    const { role } = this.props;

    switch (role) {
      case 'RecipientUser' :
        return 'userHome';

      case 'sender' :
        return 'senderHome';

      case 'executor' :
        return 'executorHome';
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

StageScreen.propTypes = {
  navigation: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = ({ authReducer }) => ({
  role: authReducer.role,
  token: authReducer.token,
});

export default connect(mapStateToProps, null)(StageScreen);

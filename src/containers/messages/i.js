import React, { Component } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Text, Icon, Container } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/min/locales';
import { getMessages } from '../../actions/senderMessageActions';
import { clearError } from '../../actions/errorActions';
import styles from './styles';

class MessagesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: (props.navigation.state.params) ? props.navigation.state.params.uid : null,
    };
  }

  componentDidMount() {
    this.props.getMessages(this.state.uid);
    this.setState({ loading: true });
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.senders.length > 0) && (prevProps.senders.find(item => item.uniq_identifi === this.state.uid).messages !== this.props.senders.find(item => item.uniq_identifi === this.state.uid).messages)) {
      this.props.getMessages(this.state.uid);
    }
    if ((prevProps.senders.length > 0) && (prevProps.senders.find(item => item.uniq_identifi === this.state.uid).listMessages !== this.props.senders.find(item => item.uniq_identifi === this.state.uid).listMessages)) {
      this.setState({ loading: false });
    }
  }

  parseDate = (value) => {
    moment.locale('ru');
    return moment(value).format('LLL');
  }

  sortMessages = array => (array.length > 0) && array.find(item => item.uniq_identifi === this.state.uid).listMessages

  render() {
    const { loading } = this.state;
    return (
      <Container style={[styles.wrapContainer, (loading) && ({ justifyContent: 'center' })]}>
        {(loading) && (<ActivityIndicator size="large" color='#ef7f1a' />)}
        {(!loading) && (
          (this.sortMessages(this.props.senders) && this.sortMessages(this.props.senders).length) ? (
            <FlatList
              style={styles.root}
              data={this.sortMessages(this.props.senders)}
              extraData={this.state}
              ItemSeparatorComponent={() => (
                <View style={styles.separator} />
              )}
              keyExtractor={item => item.id.toString()}
              renderItem={(item) => {
                const Notification = item.item;
                return (
                  <View style={styles.container}>
                    <Icon name='notifications' style={styles.icon} />
                    <View style={styles.content}>
                      <View>
                        <View style={styles.text}>
                          <Text style={styles.name}>{Notification.status}</Text>
                          <Text style={styles.mainText}>{Notification.text}</Text>
                        </View>
                        <Text style={styles.timeAgo}>
                          {this.parseDate(Notification.date)}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }} />
          ) : (
              <Text style={styles.smallText}>От данного отправителя сообщений пока нет.</Text>
            )
        )}
      </Container>
    );
  }
}

MessagesScreen.propTypes = {
  token: PropTypes.string,
  errorMessage: PropTypes.any,
  senders: PropTypes.array,
  getMessages: PropTypes.func,
  clearError: PropTypes.func,
  navigation: PropTypes.object,
};

const mapStateToProps = ({ authReducer }) => ({
  token: authReducer.token,
  errorMessage: authReducer.error,
  senders: authReducer.senders,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getMessages, clearError },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative, {View,Text} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Messages from '../containers/Messages';
import Input from '../containers/Input';
import { sendMessage } from '../actions';

const mapStateToProps = (state) => ({
    chatHeight: state.chatroom.meta.height,
    user: state.user
});

module.exports = class ChatUi extends Component {
    state = {
        scrollViewHeight: 0,
        inputHeight: 0
    }
    componentDidMount() {
        this.scrollToBottom(false);
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    onScrollViewLayout = (event) => {
        const layout = event.nativeEvent.layout;
        this.setState({
            scrollViewHeight: layout.height
        });
    }

    onInputLayout = (event) => {
        const layout = event.nativeEvent.layout;
        this.setState({
            inputHeight: layout.height
        });
    }

    scrollToBottom(animate = true) {
        const { scrollViewHeight, inputHeight } = this.state,
              { chatHeight } = this.props;
        const scrollTo = chatHeight - scrollViewHeight + inputHeight;
        if (scrollTo > 0) {
           this.refs.scroll.scrollToPosition(0, scrollTo, animate)
        }
    }

    _scrollToInput(reactRef) {
        this.refs.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(reactRef));
    }

    sendMessage = (text) => {
        return sendMessage(text, this.props.user)
    }

    render() {
        return (
            <View>
                <Text style={{paddingTop: 20}}>Global Chatroom</Text>
                <KeyboardAwareScrollView ref="scroll"onLayout={this.onScrollViewLayout}>
                    <Messages />
                    <Input onLayout={this.onInputLayout}
                           onFocus={this._scrollToInput.bind(this)}
                           submitAction={this.sendMessage}
                           ref="input"
                           placeholder="Say something cool ..." />
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

import React, { Component } from 'react';
import ReactNative, {View,Text,ListView,Image} from 'react-native';
import moment from 'moment';

const Message = ({ msg }) => (
    <View>
        <Image
               source={{ uri: msg.author.avatar }} />
        <View>
            <View>
                <Text>{msg.author.name}</Text>
                <Text>{moment(msg.time).from(Date.now())}</Text>
            </View>
            <Text>{msg.text}</Text>
        </View>
    </View>
);

const MessageList = ({ messages, onLayout }) => (
    <ListView data={messages}
              autoHideHeader={true}
              renderRow={msg => <Message msg={msg} />}
              onLayout={onLayout}
              />
);

export default MessageList;

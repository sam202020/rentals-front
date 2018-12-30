import Fingerprint2 from 'fingerprintjs2';
import firebase from 'firebase/app';
import 'firebase/auth'
import TwilioChat from 'twilio-chat'
import {
    AccessManager
} from 'twilio-common';
import Axios from 'axios';

export const getIdToken = async () => {
    const userToken = await firebase.auth().currentUser.getIdToken(true).then(token => {
        return token
    }).catch(error => {
        console.error(error);
        return undefined;
    });
    return userToken;
}

export const TwilioClient = async () => {

    let token = await requestToken();
    console.log(token);
    const chatClient = await TwilioChat.create(token);
    console.log(chatClient);
    const accessManager = new AccessManager(token);
    chatClient.on('channelJoined', function (channel) {
        console.log('Joined channel ' + channel.friendlyName);
    });
    accessManager.on('tokenUpdated', (am) => {
        chatClient.updateToken(am.token);
    });
    accessManager.on('tokenExpired', () => {
        const updatedToken = this.requestToken();
        accessManager.updateToken(updatedToken);
    });
    return {
        chatClient,
        accessManager
    };
}

export const initFingerprint = async () => {
    const fpInstance = new Fingerprint2();
    if (window.requestIdleCallback) {
        requestIdleCallback(function () {
            fpInstance.get(function (components) {
                console.log(components) // an array of components: {key: ..., value: ...}
                return components;
            })
        })
    } else {
        setTimeout(function () {
            fpInstance.get(function (components) {
                console.log(components) // an array of components: {key: ..., value: ...}
                return components;
            })
        }, 500)
    }
};

export const requestToken = async () => {
    let token;
    if (firebase.auth().currentUser) {
        token = await getIdToken();
    } else {
        setTimeout(async () => {
            token = await getIdToken();
        }, 500)
    }
    const browserID = await initFingerprint();
    console.log(browserID);
    token = Axios.get(`http://localhost:3001/chat/chat-token?device=${browserID}&token=${token}`).then(response => {
        console.log(response)
        return response.data.token;
    }).catch(err => {
        console.error(err);
        return undefined
    });
    return token;
}

export const Channel = async (chatClient, self, friend, property) => {
    const uniqueName = `${self}${friend}`
    console.log(chatClient)
    const channel = await chatClient
        .createChannel({
            uniqueName,
            friendlyName: `${property} Property`,
            isPrivate: true
        })
        .then((channel) => {
            console.log(channel);
            return {
                channel,
                new: true
            };
        }).catch(async (err) => {
            console.error(err);
            console.log(chatClient)
            console.log(self);
            console.log(uniqueName);
            try {
                let existingChannel = await chatClient.getChannelByUniqueName(uniqueName);
                return {
                    channel: existingChannel,
                    new: false
                }
            } catch (err) {
                console.error(err);
                return err;
            }
        });
    return channel;
}
import Axios from 'axios';
import firebase from 'firebase/app'
import {
    TwilioClient,
    Channel
} from './TwilioClient'

export const sendMessage = async (message, from, regarding) => {
    console.log(message, from, regarding);
    return await Axios.post('http://localhost:3001/user/messages', {
            message,
            user: from,
            regarding
        })
        .then(async (result) => {
            console.log(result);
            const data = result.data;
            const {
                user,
                place
            } = result.data._doc;
            const uid = data.uid;
            const chat = await TwilioClient();
            console.log(chat);
            let channel = await Channel(chat.chatClient, uid, user, place);
            let addFriend = await channel.channel.add(user);
            // const msg = await messageChannel(channel.channel, message);
            // console.log(msg)
            console.log(addFriend);
        })
        .catch(err => {
            console.error(err)
            return err;
        });
}

export const messageChannel = async (channel, message) => {
    return await channel.sendMessage(message);
}

export const joinChannel = async (channel) => {
    channel.join().then((result) => {
        return result;
    }).catch(function (err) {
        console.error(
            "Couldn't join channel " + channel.friendlyName + ' because ' + err
        );
    });
}

export const retrieveMessages = async () => {
    const currentUser = await getCurrentUser;
    if (currentUser === null) return {
        err: 'no current user'
    };
    return Axios.get(`http://localhost:3001/messages?token=${currentUser}`)
        .then(result => {
            return result
        })
        .catch(err => {
            return err
        });
}

export const getCurrentUser = async () => {
    return await firebase
        .auth()
        .currentUser.getIdToken( /* forceRefresh */ true)
        .then(idToken => {
            return idToken;
        })
        .catch(error => {
            console.error(error);
            return null;
        });
}
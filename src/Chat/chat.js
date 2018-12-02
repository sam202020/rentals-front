import Axios from 'axios';
import firebase from 'firebase/app'
import SendBird from 'sendbird'

export const sendMessage = async (message, from, regarding) => {
    console.log(message, from, regarding);
    return await Axios.post('http://localhost:3001/user/messages', {
            message,
            user: from,
            regarding
        })
        .then(result => {
            const friend = result.data.user;
            const property = result.data.place;
            console.log(friend, property);
            initSendBird(friend, property);
            // return result;
        })
        .catch(err => {
            console.error(err)
            return err;
        });
}

export const retrieveMessages = async (user) => {
    return await Axios.get(`http://localhost:3001/messages/${user}`)
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



export const initSendBird = async (friend, property) => {
    const sb = new SendBird({
        appId: '2F22DC88-4E15-4C7E-A7AD-FA8F159C6D9F'
    });
    if (!firebase.auth().currentUser) return undefined;
    const USER_ID = await firebase.auth().currentUser.uid
    const userIds = [USER_ID, friend];
    sb.connect(USER_ID, (user, error) => {
        if (error) {
            console.error(error)
            return;
        }
        console.log(user);
        sb.GroupChannel.createChannelWithUserIds(userIds, true, property, false, property, function (groupChannel, error) {
            if (error) {
                console.error(error)
                return;
            }
            console.log(groupChannel);
            const CHANNEL_URL = groupChannel.url;
            sb.OpenChannel.getChannel(CHANNEL_URL, function (openChannel, error) {
                if (error) {
                    return;
                }

                openChannel.enter(function (response, error) {
                    if (error) {
                        return;
                    }
                })
            });
        });
    });
}
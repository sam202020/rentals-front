import axios from Axios

export const sendMessage = (e, message, from, to) => {
    e.preventDefault();
    console.log(e, message, from, to);
    Axios.post('http://localhost:3001/messages', {
            message,
            to,
            from
        })
        .then(result => {
            return result
        })
        .catch(err => {
            return err
        });
}

export const retrieveMessages = (user) => {
    Axios.get(`http://localhost:3001/messages/${user}`)
        .then(result => {
            return result
        })
        .catch(err => {
            return err
        });
}
import axios from 'axios';

export default class RemServices {
    getMessages() {
        return axios.get('http://127.0.0.1:8000/info/fusimessage').then
        ((res) => res.data);
    }
}

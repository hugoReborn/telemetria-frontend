import axios from 'axios';

export default class RemService {
    getMessages() {
        return axios.get('http://127.0.0.1:8000/info/fusimessage/').then((res) => res.data.data);
    }
}

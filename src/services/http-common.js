import axios from "axios";

export default axios.create({
    baseURL: 'https://glacial-hamlet-11912.herokuapp.com/',
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
});
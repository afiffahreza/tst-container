import axios from 'axios'

export default function loginService(user) {
    return axios({
        method: 'post',
        url: "http://127.0.0.1:8000/token",
        data: "grant_type=&username="+user.username+"&password="+user.password+"&scope=&client_id=&client_secret="
      });
}
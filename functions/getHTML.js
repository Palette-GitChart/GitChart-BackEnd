import axios from 'axios';

function getHTML(user){
    return new Promise((resolve, reject) => {
        user = encodeURI(user);
        axios.get(`https://github.com/users/${user}/contributions`, {            
                headers: {
                    withCredentials: true,
                    "Cookie": "tz=Asia%2FSeoul; logged_in=yes;"
                }
        })
        .then(res => resolve(res))
        .catch(err => {
            console.log(err);
            resolve(false);
        })
    })
}

export default getHTML;
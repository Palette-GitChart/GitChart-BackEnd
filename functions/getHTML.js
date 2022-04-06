import axios from 'axios';

function getHTML(user){
    return new Promise((resolve, reject) => {
        user = encodeURI(user);
        try {
            resolve(axios.get(`https://github.com/users/${user}/contributions`, {            
                headers: {
                    withCredentials: true,
                    "Cookie": "tz=Asia%2FSeoul; logged_in=yes;"
                }
            }));
        }catch(err){
            console.log(err);
        }
    })
}

export default getHTML;
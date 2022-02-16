import axios from 'axios';


export const instance =  axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
});

export const instanceApi =  axios.create({
    baseURL:"http://isvhintp01:8105/elastic/"
});

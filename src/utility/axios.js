import axios from 'axios';


export const instance =  axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
});

export const instanceApi =  axios.create({
    baseURL:"http://vstarkmst51:8105/"
});

export const authApi =  axios.create({
    baseURL:"http://isvhintp01:8900"
});

export const sourceApi =  axios.create({
    baseURL:"http://vstarkmp213:8020/"
});

import axios from 'axios'

export function getCapture(query){
    return axios({
        url: "http://127.0.0.1:9292/test/capturepcap",
        method: 'get',
        params: query,
    })
}

export function dataProcess(query){
    return axios({
        url: "http://127.0.0.1:9292/test/processpcap",
        method: 'get',
        params: query,
    })
}

export function getPcap(query){
    return axios({
        url: "http://127.0.0.1:9292/test/getpcap",
        method: 'get',
        params: query,
    })
}

export function getAllPcap(query){
    return axios({
        url: "http://127.0.0.1:9292/testfeature/getallfeature",
        method: 'get',
        params: query,
    })
}


export function conAllFeature(query){
    return axios({
        url: "http://127.0.0.1:9292/test/conallfeature",
        method: 'get',
        params: query,
    })
}

export function getSessionFeature(query){
    return axios({
        url: "http://127.0.0.1:9292/test/getsessionfeature",
        method: 'get',
        params: query,
    })
}

export function getOneFeature(query)
{
    return axios({
        url: "http://127.0.0.1:9292/testfeature/getonefeature",
        method: 'get',
        params: query,
    })
}

export function getImage(query){
    return axios({
        url: "http://127.0.0.1:9292/test/getimage",
        method: 'get',
        params: query,
        responseType:'blob',
    })
}

export function getResult(query){
    return axios({
        url: "http://127.0.0.1:9292/test/getresult",
        method: 'get',
        params: query,
    })
}

export function getTls(query){
    return axios({
        url: "http://127.0.0.1:9292/test/gettls",
        method: 'get',
        params: query,
    })
}

export function getAbnormalGraphData(query){
    return axios({
        url: "http://127.0.0.1:9292/train_graph_data/edges_test_abnormal.json/",
        method: 'get',
        params: query,
    })
}

export function getNormalGraphData(query){
    return axios({
        url: "http://127.0.0.1:9292/train_graph_data/edges_test_normal.json/",
        method: 'get',
        params: query,
    })
}
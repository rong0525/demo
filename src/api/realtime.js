// import axios from 'axios'
import request from '@/utils/cancel-token-request'

export function getCapture(query){
    return request({
        url: "http://127.0.0.1:9292/realtimepcap/capturepcap",
        method: 'get',
        params: query,
    })
}

export function splitPcap(query){
    return request({
        url: "http://127.0.0.1:9292/realtimepcap/splitpcap",
        method: 'get',
        params: query,
    })
}


export function processFeature(query){
    return request({
        url: "http://127.0.0.1:9292/realtimefeature/processfeature",
        method: 'get',
        params: query,
    })  
}
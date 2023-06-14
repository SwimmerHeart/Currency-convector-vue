import {handlerError, handlerResponse, handlerToJSON} from "@/api/handlers";
//создать функции POST PATCH DELETE
export function query(url, config){
    return fetch(url, config)
        .then(handlerResponse)
        .then(handlerToJSON)
        .catch(handlerError)
}
export function GET(url, param){
    return query(url, {method: 'GET', params:{}})
}

export function POST(url, param?){
    return query(url, {method: 'POST', params:{
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(obj)
        }})
}

export function PATCH(url, param?){
    return query(url, {method: 'PATCH', params:{?}})
}

export function DELETE(url, param?){
    return query(url, {method: 'DELETE', params:{?}})
}
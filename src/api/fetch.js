import {handlerError, handlerResponse, handlerToJSON} from "@/api/handlers";
//создать функции POST PATCH DELETE
export function query(url, config){
    return fetch(url, config)
        .then(handlerResponse)
        .then(handlerToJSON)
        .catch(handlerError)
}
export function get(url, param?){
    return query(url, {method: 'GET', params:{?}})
}
//
import {snackbarError} from "@/components/Snackbar";


function parser(arg) {
    switch(arg){
        case 'Network Error': 'ошибка взаимодействия с сервером',
        default: return arg
    }
}
export function handlerResponse(response){
    //выполнить проверки (401) на код ответа response.ok, если нет return reject
    //если ошибка ....
    return response
}
export function handlerError(error){
    //parser. получаем текст ошибки
    snackbarError()
    console.log(error)
    return Promise.reject(error)
}
export function handlerToJSON(response){

   return response.json()
}


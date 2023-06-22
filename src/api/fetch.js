import {handlerError, handlerResponse, handlerToJSON} from "@/api/handlers";

export function query(url, config, {handlers={}}={}) {
    console.warn('handlers', handlers)
    // проверять массив или просто объект в handlers
    // что если мы передаем handlers, но не передаем catch

    const _fetch = fetch(url, config).then(handlerResponse)

    if (handlers?.catch) {
        //проверяем на массив catch
        if(Array.isArray(handlers.catch)){
            for (let func of handlers.catch) {
                //не пустой ли объект
                if (func) {
                    //передаем свой handler
                    _fetch.catch(func)
                }
            }
        }
        else {
            _fetch.catch(handlers.catch)
        }
    } else {
        //catch по умолчанию
        _fetch.catch(handlerError)
    }
    if (handlers?.then) {
        if(Array.isArray(handlers.catch)){
            for (let func of handlers.catch) {
                //не пустой ли объект
                if (func) {
                    _fetch.catch(func)
                }
            }
        }
        else {
            _fetch.catch(handlers.catch)
        }
    } else {
        _fetch.then(handlerToJSON)
    }
    console.warn('_fetch',_fetch)
    return _fetch
}

export function GET(url, params, options) {
    const paramsString = new URLSearchParams(params).toString()
    return query(`${url}?${paramsString}`, undefined, options)
}

export function POST(url, data) {
    return query(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export function PATCH(url, data) {
    return query(url, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export function DELETE(url, params) {
    const paramsString = new URLSearchParams(params).toString()
    return query(`${url}?${paramsString}`, {method: 'DELETE'})
}
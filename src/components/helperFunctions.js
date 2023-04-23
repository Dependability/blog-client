//using async functions

async function easyFetch(path, method='GET', payload={}, headers=null) {
    const initValue = {method: method.toUpperCase(), headers: {'Content-Type': 'application/json'}}
    switch(method.toUpperCase()) {
        case 'POST':
            initValue.body = JSON.stringify(payload);
            break;
        case 'PUT':
            initValue.body = JSON.stringify(payload);
            break;
        default:
            break;

    }
    let newHeader = {}
    if (headers) {
        newHeader = {
            ...initValue.headers,
            ...headers
        }
        
    } else {
        newHeader = {
            ...initValue.headers
        }

    }
    initValue.headers = newHeader;
    const request = await fetch(`https://lit-reef-26994.herokuapp.com/api${path}`, initValue);
    const data = await request.json();
    return data;
}

export {easyFetch}
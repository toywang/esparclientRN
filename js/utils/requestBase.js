

class requestBase {
    constructor(){

    }
    getRequest(url) {
        return new Promise((resolve,reject)=>{
            fetch(url,{
                method:'GET'
            }).then((response)=>response.json()).then((responseJson)=>{
                console.log('res'+responseJson)
                if (Boolean(responseJson.success)){
                    resolve(responseJson)
                }
            }).catch((error)=>{
                reject(error)
            })
        })
    }
}
export default requestBase

/////////////////////////////// INITIALISATION ARRIVER DU VISITEUR//////////////////////////////////////////////
if (localStorage.getItem("userId") === null) {
    localStorage.setItem("userId", false);
}
///////////////////////////////  END   //////////////////////////////////////////////


/////////////////////////////// DECLARATION PROMISE //////////////////////////////////////////////
var connectWithApiInPost = function(url){
    return new Promise(function(resolve, reject){
        var xhr = new window.XMLHttpRequest()
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.responseText))
                } else{
                    reject(xhr)
                }
            }
        }
        xhr.open('POST', url, true)
        xhr.send()
    })
}
//////////////////////////////////////// END //////////////////////////////////////////////
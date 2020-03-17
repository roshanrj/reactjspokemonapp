export const locStorage = {
    checkStorage: function(){
        return typeof Storage == "function";
    },
    get: function(key){
        return JSON.parse(localStorage.getItem(key));
    },
    set: function(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    remove: function(key){
        localStorage.removeItem(key);
    }
};

export const genRandomNumber = (min,max) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const cookie = {
    setCookie : function (cookieName,value, path = '/'){
                var date = new Date(),
                    midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59),
                    expires = "; expires=" + midnight.toUTCString();
                    document.cookie = cookieName + "=" + value + expires + "; path=" + path;
    },
    getCookie: function(cookieName){
        var i,
            j,
            k,
            arrayOfCookies = document.cookie.split(";");
        for (i=0; i<arrayOfCookies.length; i++){
            j = arrayOfCookies[i].substr(0,arrayOfCookies[i].indexOf("="));
            k = arrayOfCookies[i].substr(arrayOfCookies[i].indexOf("=")+1);
            j = j.replace(/^\s+|\s+$/g,"");
            if (j == cookieName)
                return unescape(k);
        }
    },
    deleteCookie: function(cookieName,path){
        this.setCookie(cookieName, '', null, path);
    }
};

String.prototype.initCap = function () {
    return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
       return m.toUpperCase();
    });
 };

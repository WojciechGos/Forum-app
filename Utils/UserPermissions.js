function getData(req){
    if(req.isAuthenticated()){
        return {
            isAuthenticated: true,
            user: req.user
        }
    }else{
        return {
            isAuthenticated: false,
            user: null
        }
    }
}

module.exports.getData = getData
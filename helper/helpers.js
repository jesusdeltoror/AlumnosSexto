var hbs = require('hbs');



hbs.registerHelper("insert", function(data){
    if(data===true){
        return "grid"
    }else{
        return "none"
    }
});


module.exports = hbs;
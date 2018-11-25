
module.exports = app => {
    app.get('/', async(req,res) =>{
        res.send('url shortener')
    });
};

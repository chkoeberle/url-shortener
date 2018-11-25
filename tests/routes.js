const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

    describe('URL shorter api', () => {
    let server;
    before(async()=>{
        server = require('../app');
    });

    after(async()=>{
        server.close();
    });

    describe('api GET', ()=>{

        it('should have an http endpoint ', async()=>{
            chai.request(server)
                .get(`/`)
                .redirects(0)
                .end((err, res) => {
                    res.should.have.status(200);
                })
        });
    });

});
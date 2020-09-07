const request = require("supertest");
const expect = require("chai").expect;

describe('nodeJs API 测试',()=>{
    it('获取图书列表接口是否正确',()=>{
        request('http://localhost:9999')
            .get('/api/getBooksList')
            .expect(200)
         /*    .end((err,res)=>{
                expect(res.body.data.length).equal(2)
                expect(res.body.data[0].name).equal('《javascript 高级程序设计》')
            }) */
    })
})  
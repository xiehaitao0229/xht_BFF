import axios from 'axios';

// axios 拦截器：对请求过滤、权限级别

class SafeRequest{
    static fetch(url){
        let result = {
            code:0,
            message:'',
            data:null
        };

        return new Promise((resolve,reject)=>{
            axios.get(url).then(data=>{
                result.data = data.data;
                resolve(result);
            }).catch(e=>{
                result.code = 1;
                result.message = e.message;
                result.data = [
                    {
                      id: 1,
                      name: "《javascript 高级程序设计》",
                    },
                    {
                      id: 2,
                      name: "《javascript 语言精粹》",
                    },
                  ];
                  resolve(result);
            })
        })
    }
}

export default SafeRequest;
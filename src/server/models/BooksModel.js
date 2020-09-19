import SafeRequest from '../utils/safeRequest'

class BooksModel{
    //  请求后端PHP
    getBooksList(){
        return SafeRequest.fetch('后端地址')
    }
}

export default BooksModel;
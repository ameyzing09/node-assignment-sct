// const errorMessage=require('../constant/errormessage')

class ErrorResponse{
    constructor(id){
        this.id=id
    }
    sendResponseOnSuccess(){
        const { id } = this
        const response = {
            "data": {
                "id": id
            },
            "error": null
        }
        return response
    }

    sendDataOnSuccess(){
        const { id }=this
         const response = {
             "data": id,
             "error": null
         }
         return response
    }

    sendResponseOnFailure(e){
        const response = {
            "data": null,
            "error": e
        }

        return response
    }
}

module.exports = ErrorResponse
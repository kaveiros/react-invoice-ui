import http from './http'

const baseUrl = "http://localhost:3000/"

class InvoiceService {


    getAllInvoices( currentPage, searchParams){
        return  http.post(baseUrl + "invoice/all/" + currentPage, searchParams)
    }

    getInvoice(_id){
        return http.get(baseUrl + "invoice/" + _id)
    }

    saveInvoice(data){
        return http.post("/invoice/create", data)
    }

    updateInvoice(id, data) {
        return http.put("/invoice/update/" + id, data)
    }

}

export default new InvoiceService() 
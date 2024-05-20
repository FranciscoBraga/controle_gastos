class Despesa{
    constructor(data,tipo_gastos,descricao,valor){
        this.data = data
        this.tipo_gastos = tipo_gastos
        this.descricao = descricao
        this.valor = valor
    }

    dadosValidos(){
        for(let i in this){
            if(this[i] == undefined || this[i] == null || this[i] == ''){
                console.log(i,this[i])
                return false
            }    
       }
       return true  
     }
  }

class BD{
    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id',0)
        }
    }

     pegarProximoId(){
         let proximoId = localStorage.getItem('id')

          return parseInt(proximoId) + 1
            
     }

     gravar(d){
        let id = this.pegarProximoId()
        localStorage.setItem(id,JSON.stringify(d))
        localStorage.setItem('id',id)
    }
    

}

let bd = new BD()

function novasDespesas(){
        let data =  document.getElementById('data')
        let tipo_gastos =  document.getElementById('tipo_gasto')
        let descricao = document.getElementById('descricao')
        let valor =   document.getElementById('valor')

        let despesas = new Despesa(data.value,
                                 tipo_gastos.value,
                                descricao.value,
                                valor.value)


        if(despesas.dadosValidos()){
            console.log("dados validos")
           // bd.gravar(despesas)
        }else{
            console.log("dados invalidos")
        }

       

}




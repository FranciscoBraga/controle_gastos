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

    recuperarTodosRegistros(){
        let despesas  = Array()

        let id = localStorage.getItem('id')

        for(let i = 1;i<=id;i++){
            let despesa =  JSON.parse(localStorage.getItem(i))

            if(despesa === null){
                continue
            }
            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa) {

        let despesasFiltradas =  Array()
        despesasFiltradas = this.recuperarTodosRegistros()

        if(despesa.data != ""){
            despesasFiltradas =despesasFiltradas.filter(function(d){ return d.data == despesa.data})
        }
        if(despesa.tipo_gastos != ""){
            despesasFiltradas= despesasFiltradas.filter(d =>  d.tipo_gastos == despesa.tipo_gastos)
        }
        
        if(despesa.valor != ""){
            despesasFiltradas= despesasFiltradas.filter(d =>  d.valor == despesa.valor)
        }

        return despesasFiltradas
        
        

   }  

   remover(id){
        localStorage.removeItem(id)
   }
    
}

let bd = new BD()

function novasDespesas(){
        let data =  document.getElementById('data')
        let tipo_gastos =  document.getElementById('tipo_gasto')
        let descricao = document.getElementById('descricao')
        let valor =   document.getElementById('valor')
        let fade = document.querySelector('#fade')
        let modal = document.querySelector('#modal')
        let cabecalho = document.querySelector('#cabecalho_modal')
        let  aviso = document.querySelector('#aviso')
        let button = document.getElementById('button')

        let despesas = new Despesa(data.value,
                                 tipo_gastos.value,
                                descricao.value,
                                valor.value)

        if(despesas.dadosValidos()){        
            fade.classList.toggle('hide')
            modal.classList.toggle('hide')
            cabecalho.textContent = "Dados Salvos"
            cabecalho.style.color = '#0a19e9'
            aviso.textContent = "Dados Salvos com Sucesso"
            button.textContent = "Fechar"
            console.log("dados validos")
            bd.gravar(despesas)

            data.value = " " 
            tipo_gastos.value = " "
            descricao.value = " "
            valor.value = " "  

        }else{
            fade.classList.toggle('hide')
            modal.classList.toggle('hide')
            cabecalho.textContent = "Campos vazios"
            cabecalho.style.color = '#c74929'
            aviso.textContent = "Existem campos que não foram preenchidos, por favor preenche-los e enviar novamente."
            button.textContent = "Fechar e Corrigir"
            console.log("dados invalidos")
        }        
}

function carregarListaDespesas(despesas = Array(), filter = false){
  
    if(despesas.length == 0 && filter == false){
        despesas = bd.recuperarTodosRegistros()
    }
     
     let listaDespesa = document.getElementById("lista_despesas")
     listaDespesa.innerHTML =''

     despesas.forEach(function(d){

      let linha =  listaDespesa.insertRow()
       
      linha.insertCell(0).innerHTML = d.data
     

      switch(d.tipo_gastos){
            case '1' :  d.tipo_gastos = 'Energia Elétrica'
                 break
            case '2' : d.tipo_gastos = 'Transporte'
                 break
            case '3' : d.tipo_gastos = 'Educação'
                 break

      }
      linha.insertCell(1).innerHTML = d.tipo_gastos
      linha.insertCell(2).innerHTML = d.descricao
      linha.insertCell(3).innerHTML = d.valor
      let btn = document.createElement('button')
      btn.className = 'excluir'
      btn.innerHTML =  '<i class="fas fa-times"></i>'
      btn.id = 'id_despesa_'+d.id
      btn.onclick = function(){
           let id= this.id.replace('id_despesa_','')
            bd.remover(id)

            window.location.reload()
      }
      linha.insertCell(4).append(btn)



     })
}


function pesquisarDespesas(){
    let data =  document.getElementById('data').value
    let tipo_gastos =  document.getElementById('tipo_gasto').value
    let valor =   document.getElementById('valor').value


    let despesa = new Despesa(data,tipo_gastos,null,valor)

    let despesas = bd.pesquisar(despesa)

    carregarListaDespesas(despesas, true)
}

 function fecharModal(){
    let modal = document.querySelector('#modal')
    let cabecalho = document.querySelector('#cabecalho_modal')
    fade.classList.toggle('hide')
    modal.classList.toggle('hide')

 }

       






var firebaseConfig = {
    apiKey: "AIzaSyCxK3ECEWyFICyNOtnGOVWnJQut0dUZW0Q",
    authDomain: "protrator-1ffec.firebaseapp.com",
    databaseURL: "https://protrator-1ffec-default-rtdb.firebaseio.com",
    projectId: "protrator-1ffec",
    storageBucket: "protrator-1ffec.appspot.com",
    messagingSenderId: "1030402223805",
    appId: "1:1030402223805:web:2cd4470ff07ff3dc0791d4"
  };

firebase.initializeApp(firebaseConfig);

window.onload = listar;

var valor= 67.20;
function sair(){

    localStorage.clear();
    window.location.href="PROTRATOR.html";
}
   
 

function listar() {
    if(!localStorage.getItem("auth")){
        alert("Necessario fazer login");
      window.location.href = "loguin.html";

    }


    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('protocolo/');
    var rowIndex = 1;
    var horasTr=0;
    var dias=0;
    var dataAnt;
    databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            if(childData.status==3){
                var row = tblUsers.insertRow(rowIndex);
            var cellNome = row.insertCell(0);
            var cellCPF = row.insertCell(1);
            var cellLocalidade = row.insertCell(2);
            var cellRG = row.insertCell(3);            
            var cellHoras = row.insertCell(4);
            var cellValor = row.insertCell(5);
            var cellData = row.insertCell(6);
            var cellTel=row.insertCell(7);
            var cellPG=row.insertCell(8);
            if(childData.telefone==undefined ){
                childData.telefone="-";
            }
            if(childData.rg==undefined ){
                childData.rg="-";
            }
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.appendChild(document.createTextNode(childData.cpf));
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellRG.appendChild(document.createTextNode(childData.rg));
            cellHoras.appendChild(document.createTextNode(horasFormat(childData.horas)));
            cellValor.appendChild(document.createTextNode(childData.valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellTel.appendChild(document.createTextNode(childData.telefone));
            cellPG.innerHTML='<input type="button" class="btn btn-primary" value="PG TRATOR" onclick="trPagar(this)"}/>';
            rowIndex = rowIndex + 1;
            horasTr = horasTr+Number(childData.horas);
            }
            
           
            
          

            
        });

        document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} &nbsp &nbsp &nbsp HORAS ATENDIDAS:&nbsp ${horasTr.toFixed(2)} &nbsp &nbsp &nbsp DIAS:&nbsp${dias}&nbsp &nbsp &nbsp VALOR TOTAL ATENDIDO&nbsp:${(horasTr*valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h6>`;
    });
    
}



function dataAtualFormatada() {
    var data = new Date(),
        dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
}


function horasFormat(horas){

  var hora= String(horas).substring(0,1);
    var minutos= ((Number(horas)-Number(hora))*60).toFixed(0);
    if(minutos==0){
        minutos="";
    }else{
        minutos=minutos+" Min";
    }
    return hora+' Hr '+ minutos;
}
function trPagar(dt){
    
    var data=dt.parentNode.parentNode.children;
    
    
    var proto;
    
    
    
        var databaseRef = firebase.database().ref('protocolo/');
       
            
            databaseRef.orderByChild("date").once('value', function (snapshot) {
                var key;
                snapshot.forEach(function (childSnapshot) {
                    var childData = childSnapshot.val();
                        
                    if(childData.cpf===data[1].innerHTML){
                     
                        key=childSnapshot.key;
                        proto=childData;
                   
                    }
                });
    
                const protocolo = {
        
                
                    nomeProdutor: nomeProdutor =proto.nomeProdutor,
                cpf: cpf = proto.cpf,
                localidade: localidade =proto.localidade,
                rg: rg = proto.rg,
                dataAtual:dataAtual=proto.dataAtual,
                horas: horas = proto.horas,
                valorTotal:valorTotal = proto.valorTotal,
                date:proto.date,
                telefone:telefone =proto.telefone?proto.telefone:"",
                    status:status =4
                    
                };
                
                let updates = {}
      updates["/protocolo/" + key] = protocolo;;
      firebase.database().ref().update(updates);
      window.location.reload();
      
            });
    
    
    
            }
    
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
   
 function InserirTrator() {
    var data= dataAtualFormatada();


//console.log(consultarCPF(cpf));
    var i=0;
   var databaseRef = firebase.database().ref('tratores/');

  
        let tratores_id = false;


        const tratores = {
    
            
            trator: trator = document.getElementById("trator").value.toUpperCase(),
            localidade: localidade = document.getElementById ("localidade").value.toUpperCase(),
            horas: horas = document.getElementById("horaV").value,
			dataUlt: dataUlt = "",
			horasExec: horasExec =0,
			horasPagas:horasPagas=0,
			valorExec: valorExec=0.0,
			valorPago: valorPago= 0.0,
            telefone:telefone =document.getElementById("tel").value,
            
            
        };
    
        if (!tratores_id) {
            tratores_id = firebase.database().ref().child('tratores').push().key;
        }
        let updates = {}
        updates["/tratores/" + tratores_id] = tratores;
        let tratores_ref = firebase.database().ref();
        firebase.database().ref().update(updates);
        window.location.reload();
       
    
   
  
  
    
}

function listar() {
    if(!localStorage.getItem("auth")){
        alert("Necessario fazer login");
      window.location.href = "loguin.html";

    }

    var tblUsers = document.getElementById('tbl_users_list');
	var x =document.getElementById('Tratores');
    var databaseRef = firebase.database().ref('tratores/');
    var rowIndex = 1;
   
    var dataAnt;
	
	
	 databaseRef.orderByChild("date").once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
			x.insertAdjacentHTML("beforeend",`<option id=${childKey} value=${childData.trator}>${childData.trator}</option>`);
			
		});
	 });
	 
    databaseRef.once('value', function (snapshot) {
        
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
			
			
                var row = tblUsers.insertRow(rowIndex);
            var cellNome = row.insertCell(0);
            var cellHorasExe = row.insertCell(1);
            var cellHorasPagas = row.insertCell(2);
            var cellValorPago = row.insertCell(3);            
            var cellValorRest = row.insertCell(4);
            var cellLocalidade = row.insertCell(5);
            var cellData = row.insertCell(6);
            var cellTel=row.insertCell(7);
           var valorrest=Number(childData.valorExec)-Number(childData.valorPago);
            
            cellNome.appendChild(document.createTextNode(childData.trator));
            cellHorasExe.appendChild(document.createTextNode(childData.horasExec));
            cellHorasPagas.appendChild(document.createTextNode(childData.horasPagas));
            cellValorPago.appendChild(document.createTextNode(Number(childData.valorPago).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
            cellValorRest.appendChild(document.createTextNode(valorrest.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
			cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellData.appendChild(document.createTextNode(childData.dataUlt));
            cellTel.appendChild(document.createTextNode(childData.telefone));
            rowIndex = rowIndex + 1;
			
			
            
            
           
            
          

            
        });

      //  document.getElementById("inf").innerHTML=`<h6>PRODUTORES:&nbsp ${rowIndex-1} &nbsp &nbsp &nbsp HORAS ATENDIDAS:&nbsp ${horasTr.toFixed(2)} &nbsp &nbsp &nbsp DIAS:&nbsp${dias}&nbsp &nbsp &nbsp VALOR TOTAL ATENDIDO&nbsp:${(horasTr*valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h6>`;
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


function inserirPagamento(){
    var databaseRef = firebase.database().ref('tratores/');

  
    let tratores_id = document.getElementById("Tratores").value;
    databaseRef.once('value', function (snapshot) {
          
      var tratores;
      snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
              
          if(childSnapshot.key==tratores_id){
           
              tratores=childData;

         
          }
      });
var valor = document.getElementById("valor").value;

tratores.horasPagas = Number(tratores.horasPagas)+(Number(valor)/Number(tratores.horas));
tratores.dataUlt=dataAtualFormatada();
tratores.valorPago = Number(tratores.valorPago)+Number(valor);      
 

 
  let updates = {}
  updates["/tratores/" + tratores_id] = tratores;
  let tratores_ref = firebase.database().ref();
  firebase.database().ref().update(updates);
  window.location.reload();
  
    
          
      });
          

}
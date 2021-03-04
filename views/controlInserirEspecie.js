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

function InserirProtocolo() {
    var data= dataAtualFormatada();


   var cpf = document.getElementById("cpf").value
//console.log(consultarCPF(cpf));
    var i=0;
   var databaseRef = firebase.database().ref('protocolo/');

   databaseRef.orderByChild("date").once('value', function (snapshot) {
       snapshot.forEach(function (childSnapshot) {
           var childData = childSnapshot.val();
               
           if(childData.cpf===cpf){
            i++;
          
           }
       });


       if(i>0){

        alert("CPF existente na base de dados!!! ");
       }else{

        let protocolo_id = false;


        const protocolo = {
    
            
            nomeProdutor: nomeProdutor = document.getElementById("produtor").value.toUpperCase(),
            cpf: cpf = document.getElementById("cpf").value,
            localidade: localidade = document.getElementById ("localidade").value.toUpperCase(),
            rg: rg = document.getElementById("rg").value,
            dataAtual:data,
            horas: horas = document.getElementById("horas").value,
            valorTotal:valorTotal = horas*valor,
            date:new Date()*-1,
            
        };
    
        if (!protocolo_id) {
            protocolo_id = firebase.database().ref().child('protocolo').push().key;
        }
        let updates = {}
        updates["/protocolo/" + protocolo_id] = protocolo;
        let protocolo_ref = firebase.database().ref();
        firebase.database().ref().update(updates);
        window.location.reload();
       }
    
   
   });
  
  
    
}

function listar() {

    var tblUsers = document.getElementById('tbl_users_list');
    var databaseRef = firebase.database().ref('protocolo/');
    var rowIndex = 1;

    databaseRef.orderByChild("date").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            var row = tblUsers.insertRow(rowIndex);
            var cellNome = row.insertCell(0);
            var cellCPF = row.insertCell(1);
            var cellLocalidade = row.insertCell(2);
            var cellRG = row.insertCell(3);            
            var cellHoras = row.insertCell(4);
            var cellValor = row.insertCell(5);
            var cellData = row.insertCell(6);
            var cellImprimir = row.insertCell(7);
            cellNome.appendChild(document.createTextNode(childData.nomeProdutor));
            cellCPF.appendChild(document.createTextNode(childData.cpf));
            cellLocalidade.appendChild(document.createTextNode(childData.localidade));
            cellRG.appendChild(document.createTextNode(childData.rg));
            cellHoras.appendChild(document.createTextNode(childData.horas));
            cellValor.appendChild(document.createTextNode(childData.valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})));
            cellData.appendChild(document.createTextNode(childData.dataAtual));
            cellImprimir.innerHTML='<input type="button" class="btn btn-danger" value="IMPR." onclick="imprimir(this)"}/>';

           

            rowIndex = rowIndex + 1;
        });
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

function imprimir(dt){

var data=dt.parentNode.parentNode.children;
var nomePr = data[0].innerHTML;
var cpfPr = data[1].innerHTML;
var localPr = data[2].innerHTML;
var rgPr = data[3].innerHTML;
var horaPr = data[4].innerHTML;
var valorPr = data[5].innerHTML;
var dataPr =data[6].innerHTML;


var x = document.getElementById("geral");

x.innerHTML = `
            ________________________________________________________________________________________________________________________________
				<h3> Via Produtor</h3> <img src="../logPrefeitura.png" height=220 width=95%><h1> 
				<h1>
                <br> <strong> PRODUTOR:</strong>&nbsp ${nomePr} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${cpfPr}<br><br>
                <strong>RG Nº:</strong>&nbsp   ${rgPr} &nbsp &nbsp &nbsp &nbsp
                <strong> DATA:</strong>  &nbsp ${dataPr} &nbsp&nbsp&nbsp&nbsp&nbsp <strong> QUANT. HORAS:  </strong>  ${horaPr} &nbsp&nbsp <br> <br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp&nbsp&nbsp&nbsp <strong> VALOR TOTAL:  </strong>  ${valorPr}<br><br>
				<strong> TRATORISTA:______________________________________ <br><br>  DATA SERVIÇO:______/______/__________</strong><br>
				<br>	<img src="../logPref.png" alt="some text" height=100 width=50%>

                    <h1>_____________________________________________________________________________________________________________________<br>
					_______________________________________________________________________________________________________________________<br>
					<h3> Via Arrecadação</h3><img src="../logPrefeitura.png" height=220 width=95% ><br><h1>
                    <br> <strong> PRODUTOR:</strong>&nbsp ${nomePr} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${cpfPr}<br><br>
                <strong>RG:</strong>&nbsp   ${rgPr} &nbsp &nbsp &nbsp &nbsp
                <strong> DATA:</strong>  &nbsp ${dataPr}<br><br>
                <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp &nbsp &nbsp &nbsp 
                <strong> QUANT. HORAS:  </strong>  ${horaPr}<br><br>
                <strong> VALOR TOTAL:  </strong>  ${valorPr}<br><br>	<img src="../logPref.png" height=100 alt="some text" width=50% >

                    <h1>_______________________________________________________________________________________________________________________<br>
					_______________________________________________________________________________________________________________________<br>
					<h3> Via Tratorista</h3><img src="../logPrefeitura.png" height=220 width=95%><h1>
                    <br> <strong> PRODUTOR:</strong>&nbsp ${nomePr} &nbsp &nbsp &nbsp &nbsp<strong>CPF:</strong> &nbsp  ${cpfPr}<br><br>
                    <strong>RG:</strong>&nbsp   ${rgPr} &nbsp &nbsp &nbsp &nbsp
                    <strong> DATA:</strong>  &nbsp ${dataPr}<br><br>
                    <strong>LOCALIDADE:</strong>  &nbsp ${localPr} &nbsp &nbsp &nbsp &nbsp 
                    <strong> QUANT. HORAS:  </strong>  ${horaPr}<br><br>
                    <strong> VALOR TOTAL:  </strong>  ${valorPr}&nbsp&nbsp&nbsp
					 <strong>DATA SERVIÇO:______/______/__________</strong><br><br>
					<strong> ASS. PRODUTOR: _____________________________________</strong><br><br>
					<img src="../logPref.png" alt="some text" height=100 width=50% >
                        </h1>`; 
                    
                    
  //  printDiv();

}

function printDiv() {
   var conteudo = document.getElementById("geral").innerHTML;
    var win = window.open();
    win.document.write(conteudo);
    win.print();
    win.close();//Fecha após a impressão.  
	
}

var  firebaseConfig  =  {
    apiKey : "AIzaSyCxK3ECEWyFICyNOtnGOVWnJQut0dUZW0Q" ,
    authDomain : "protrator-1ffec.firebaseapp.com" ,
    databaseURL : "https://protrator-1ffec-default-rtdb.firebaseio.com" ,
    projectId : "protrator-1ffec" ,
    storageBucket : "protrator-1ffec.appspot.com" ,
    messagingSenderId : "1030402223805" ,
    appId : "1: 1030402223805: web: 2cd4470ff07ff3dc0791d4"
  } ;

firebase . initializeApp ( firebaseConfig ) ;

janela . onload  =  listar ;

var  valor =  67,20 ;

function  InserirProtocolo ( )  {
    var  data =  dataAtualFormatada ( ) ;


   var  cpf  =  document . getElementById ( "cpf" ) . valor
//console.log(consultarCPF(cpf));
    var  i = 0 ;
   var  databaseRef  =  firebase . banco de dados ( ) . ref ( 'protocolo /' ) ;
    var  horasT ;
   databaseRef . orderByChild ( "data" ) . uma vez ( 'valor' ,  função  ( instantâneo )  {
       instantâneo . forEach ( function  ( childSnapshot )  {
           var  childData  =  childSnapshot . val ( ) ;
               
           if ( childData . cpf === cpf ) {
               horasT =  horas + Número ( childData . horas ) ;
            i ++ ;
          
           }
       } ) ;
       horasT  =  horasT  +  Number ( document . getElementById ( "horas" ) . value ) ;

       if ( horasT > 5 ) {

        alert ( `CPF existente na base de dados e Horas ultrapassam o Limite: $ { horasFormat ( horasT ) } !!!` ) ;
       } else {

        deixe  protocolo_id  =  false ;


         protocolo  const =  {
    
            
            nomeProdutor : nomeProdutor  =  documento . getElementById ( "produtor" ) . valor . toUpperCase ( ) ,
            cpf : cpf  =  document . getElementById ( "cpf" ) . valor ,
            localidade : localidade  =  documento . getElementById  ( "localidade" ) . valor . toUpperCase ( ) ,
            rg : rg  =  documento . getElementById ( "rg" ) . valor ,
            dataAtual : data ,
            horas : horas  =  documento . getElementById ( "horas" ) . valor ,
            valorTotal : valorTotal  =  horas * valor ,
            data : nova  data ( ) * - 1 ,
            telefone : telefone  = documento . getElementById ( "tel" ) . valor ,
            
            
        } ;
    
        if  ( ! protocolo_id )  {
            protocolo_id  =  firebase . banco de dados ( ) . ref ( ) . criança ( 'protocolo' ) . push ( ) . chave ;
        }
        deixe  atualizações  =  { }
        atualizações [ "/ protocolo /"  +  protocolo_id ]  =  protocolo ;
        let  protocolo_ref  =  firebase . banco de dados ( ) . ref ( ) ;
        firebase . banco de dados ( ) . ref ( ) . atualização ( atualizações ) ;
        janela . localização . reload ( ) ;
       }
    
   
   } ) ;
  
  
    
}

function  listar ( )  {

	
	 if  (  !  localStorage  .  getItem  (  "auth"  )  )  {
        alert  (  "Necessario fazer login"  )  ;
      janela  .  localização  .  href   =   "loguin.html"  ;

    }
    var  tblUsers  =  document . getElementById ( 'tbl_users_list' ) ;
    var  databaseRef  =  firebase . banco de dados ( ) . ref ( 'protocolo /' ) ;
    var  rowIndex  =  1 ;
    var  horasTr = 0 ;
    var  dias = 0 ;
    var  dataAnt ;
    databaseRef . orderByChild ( "data" ) . uma vez ( 'valor' ,  função  ( instantâneo )  {
        
        instantâneo . forEach ( function  ( childSnapshot )  {
            var  childKey  =  childSnapshot . chave ;
            var  childData  =  childSnapshot . val ( ) ;

            var  row  =  tblUsers . insertRow ( rowIndex ) ;
            var  cellNome  =  linha . insertCell ( 0 ) ;
            var  cellCPF  =  linha . insertCell ( 1 ) ;
            var  cellLocalidade  =  linha . insertCell ( 2 ) ;
            var  cellRG  =  linha . insertCell ( 3 ) ;            
            var  cellHoras  =  linha . insertCell ( 4 ) ;
            var  cellValor  =  linha . insertCell ( 5 ) ;
            var  cellData  =  linha . insertCell ( 6 ) ;
            var  cellTel = linha . insertCell ( 7 ) ;
            var  cellImprimir  =  linha . insertCell ( 8 ) ;
            
            if ( childData . telefone == undefined  ) {
                childData . telefone = "-" ;
            }
            if ( childData . rg == undefined  ) {
                childData . rg = "-" ;
            }
            
            cellNome . appendChild ( document . createTextNode ( childData . nomeProdutor ) ) ;
            cellCPF . appendChild ( document . createTextNode ( childData . cpf ) ) ;
            cellLocalidade . appendChild ( document . createTextNode ( childData . localidade ) ) ;
            cellRG . appendChild ( document . createTextNode ( childData . rg ) ) ;
            cellHoras . appendChild ( document . createTextNode ( horasFormat ( childData . horas ) ) ) ;
            cellValor . appendChild ( document . createTextNode ( childData . valorTotal . toLocaleString ( 'pt-br' , { style : 'currency' ,  currency : 'BRL' } ) ) ) ;
            cellData . appendChild ( document . createTextNode ( childData . dataAtual ) ) ;
            cellTel . appendChild ( document . createTextNode ( childData . telefone ) ) ;
            cellImprimir . innerHTML = '<input type = "button" class = "btn btn-danger" value = "IMPR." onclick = "imprimir (este)"} /> ' ;

           if ( dataAnt ! = childData . dataAtual ) {
               dias ++ ;
               dataAnt = childData . dataAtual ;
           }

            rowIndex  =  rowIndex  +  1 ;
            horasTr  =  horasTr + Número ( childData . horas ) ;
        } ) ;

        documento . getElementById ( "inf" ) . innerHTML = `<h6> PRODUTORES: & nbsp $ { rowIndex - 1 } & nbsp & nbsp & nbsp QUANT. HORAS: & nbsp $ { horasTr . toFixed ( 2 ) } & nbsp & nbsp & nbsp DIAS: & nbsp $ { dias } & nbsp & nbsp & nbsp VALOR TOTAL & nbsp: $ { ( horasTr * valor ) . toLocaleString ( 'pt-br' , { style : ' moeda : 'BRL' } ) } </h6> `;
    } ) ;
    
}



function  dataAtualFormatada ( )  {
    var  data  =  new  Date ( ) ,
        dia  =  dados . getDate ( ) . toString ( ) ,
        Diaf  =  ( diâmetro . comprimento  ==  1 ) ? '0'  +  dia : dia ,
        mes  =  ( dados . getMonth ( )  +  1 ) . toString ( ) ,  // + 1 pois no getMonth Janeiro começa com zero.
        mesF  =  ( mes . comprimento  ==  1 ) ? '0'  +  mes : mes ,
        anoF  =  dados . getFullYear ( ) ;
    retornar  diaF  +  "/"  +  mesF  +  "/"  +  anoF ;
}

função  imprimir ( dt ) {

var  data = dt . parentNode . parentNode . crianças ;
var  nomePr  =  dados [ 0 ] . innerHTML ;
var  cpfPr  =  dados [ 1 ] . innerHTML ;
var  localPr  =  dados [ 2 ] . innerHTML ;
var  rgPr  =  dados [ 3 ] . innerHTML ;
var  horaPr  =  dados [ 4 ] . innerHTML ;
var  valorPr  =  dados [ 5 ] . innerHTML ;
var  dataPr  = dados [ 6 ] . innerHTML ;


var  x  =  documento . getElementById ( "geral" ) ;

x . innerHTML  =  `
            ________________________________________________________________________________________________________________________________________
				<h3> Via Produtor </h3> <img src = "../ logPrefeitura.png" height = 220 width = 95%> <h1> 
				<h1>
                <br> <strong> PRODUTOR: </strong> & nbsp $ { nomePr } & nbsp & nbsp & nbsp & nbsp <strong> CPF: </strong> & nbsp   $ { cpfPr } <br> <br>
                <strong> RG Nº: </strong> & nbsp    $ { rgPr } & nbsp & nbsp & nbsp & nbsp
                <strong> DADOS: </strong> & nbsp $ { dataPr } & nbsp & nbsp & nbsp & nbsp & nbsp & nbsp <strong> QUANT. HORAS: </strong>   $ { horaPr } & nbsp & nbsp <br> <br>
                <strong> LOCALIDADE: </strong> & nbsp $ { localPr } & nbsp & nbsp & nbsp & nbsp <strong> VALOR TOTAL: </strong>   $ { valorPr } <br> <br>
				<strong> TRATORISTA: ______________________________________ <br> <br> SERVIÇO DE DADOS: ______ / ______ / __________ </strong> <br>
				<br> <img src = "../ logPref.png" alt = "algum texto" altura = 100 largura = 50%>
                    <h1> _____________________________________________________________________________________________________________________ <br>
					_______________________________________________________________________________________________________________________________ <br>
					<h3> Via Arrecadação </h3> <img src = "../ logPrefeitura.png" height = 220 width = 95%> <br> <h1>
                    <br> <strong> PRODUTOR: </strong> & nbsp $ { nomePr } & nbsp & nbsp & nbsp & nbsp <strong> CPF: </strong> & nbsp   $ { cpfPr } <br> <br>
                <strong> RG: </strong> & nbsp    $ { rgPr } & nbsp & nbsp & nbsp & nbsp
                <strong> DADOS: </strong> & nbsp $ { dataPr } <br> <br>
                <strong> LOCALIDADE: </strong> & nbsp $ { localPr } & nbsp & nbsp & nbsp & nbsp
                <strong> QUANT. HORAS: </strong>   $ { horaPr } <br> <br>
                <strong> VALOR TOTAL: </strong>   $ { valorPr } <br> <br> <img src = "../ logPref.png" height = 100 alt = "algum texto" largura = 50%>
                    <h1> _______________________________________________________________________________________________________________________________ <br>
					_______________________________________________________________________________________________________________________________ <br>
					<h3> Via Tratorista </h3> <img src = "../ logPrefeitura.png" height = 220 width = 95%> <h1>
                    <br> <strong> PRODUTOR: </strong> & nbsp $ { nomePr } & nbsp & nbsp & nbsp & nbsp <strong> CPF: </strong> & nbsp   $ { cpfPr } <br> <br>
                    <strong> RG: </strong> & nbsp    $ { rgPr } & nbsp & nbsp & nbsp & nbsp
                    <strong> DADOS: </strong> & nbsp $ { dataPr } <br> <br>
                    <strong> LOCALIDADE: </strong> & nbsp $ { localPr } & nbsp & nbsp & nbsp & nbsp
                    <strong> QUANT. HORAS: </strong>   $ { horaPr } <br> <br>
                    <strong> VALOR TOTAL: </strong>   $ { valorPr } & nbsp & nbsp & nbsp
					 <strong> DATA SERVIÇO: ______ / ______ / __________ </strong> <br> <br>
					<strong> ASS. PRODUTOR: _____________________________________ </strong> <br> <br>
					<img src = "../ logPref.png" alt = "algum texto" altura = 100 largura = 50%>
                        </h1> ` ; 
                    
                    
  // printDiv ();

}

function  printDiv ( )  {
   var  conteudo  =  documento . getElementById ( "geral" ) . innerHTML ;
    var  win  =  janela . abrir ( ) ;
    vencer . documento . escrever ( conteudo ) ;
    vencer . print ( ) ;
    vencer . close ( ) ; // Fecha após a impressão.  
	
}

function  horasFormat ( horas ) {

  var  hora =  String ( horas ) . substring ( 0 , 1 ) ;
    var  minutos =  ( ( Número ( horas ) - Número ( hora ) ) * 60 ) . toFixed ( 0 ) ;
    if ( minutos == 0 ) {
        minutos = "" ;
    } else {
        minutos = minutos + "Min" ;
    }
    retornar  hora + 'Hr' +  minutos ;
}
function  sair ( ) {

    localStorage . limpar ( ) ;
    janela . localização . href = "PROTRATOR.html" ;
}

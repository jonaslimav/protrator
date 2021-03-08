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

function cadastrar() {

    var auth = null;

    firebase.auth().createUserWithEmailAndPassword(document.getElementById("email").value, document.getElementById("senha").value).then(function (user) {
        alert("Cadastrado com sucesso");
        auth = user;
    }).catch(function (error) {
        alert("Falha ao cadastrar");
    });
}


function login() {

    var auth = null;


    firebase.auth().signInWithEmailAndPassword(document.getElementById("email").value, document.getElementById("senha").value)
        .then(function (user) {
            alert("Logado com sucesso");
            auth = user;
            localStorage.setItem("auth",true);
            window.location.href = "PROTRATOR.html";
        }).catch(function (error) {
            alert("Falha ao logar");


        });
}
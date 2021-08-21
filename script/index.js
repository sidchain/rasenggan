var login = document.getElementById("login");
var profil = document.getElementById("profil");
var perpesanan = document.getElementById("perpesanan");
var tembok = document.getElementById("tembok")
var melihat = document.getElementById("melihatProfil");
var mengchat = document.getElementById("mengchat");
var mine = document.getElementById("tembokku");

const auth = firebase.auth();
const db = firebase.firestore();

function masuk() {
    login.style.display = "none";
    profil.style.display = "block";
    perpesanan.style.display = "none";
    tembok.style.display = "none";
    melihat.style.display = "none";
    mengchat.style.display = "none";
    mine.style.display = "none";
}
function kembali2() {
  window.location.reload();
}
function kembali1() {
    login.style.display = "none";
    profil.style.display = "block";
    perpesanan.style.display = "none";
    tembok.style.display = "none";
    melihat.style.display = "none";
    mengchat.style.display = "none";
    mine.style.display = "none";
}
function masuk(){
    
    var email = document.getElementById("surel");
    var password = document.getElementById("sandi");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
}
function keluar(){   
    auth.signOut();
    alert("Berhasil Keluar");
}
auth.onAuthStateChanged(function(user){
    if(user){
      firebase.storage().ref('users/'+auth.currentUser.uid+'/Profil.jpg').getDownloadURL().then(imgUrl =>{
    document.getElementById('fotoProfil').style.backgroundImage = "url('"+imgUrl+"')"
    document.getElementById('fotoProfil2').style.backgroundImage = "url('"+imgUrl+"')"
    });
        var email = user.email;
        var panggung = document.getElementById("nama");
        var mail = document.getElementById("mail");
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `<p>${doc.data().nickname}</p>`;
            panggung.innerHTML = html;
            mail.innerHTML = `<p>`+email+`</p>`;
    });
    login.style.display = "none";
    profil.style.display = "block";
    perpesanan.style.display = "none";
    tembok.style.display = "none";
    melihat.style.display = "none";
    mengchat.style.display = "none";
    mine.style.display = "none";

    }else{
        login.style.display = "block";
        profil.style.display = "none";
        perpesanan.style.display = "none";
        tembok.style.display = "none";
        melihat.style.display = "none";
        mengchat.style.display = "none";
        mine.style.display = "none";
    }
});
function lihatProfil() {
  login.style.display = "none";
  profil.style.display = "none";
  perpesanan.style.display = "none";
  tembok.style.display = "none";
  melihat.style.display = "block";
  mengchat.style.display = "none";
  mine.style.display = "none";
}
function pilihGambar() {
  document.getElementById("uploadBtn").click();
}
document.getElementById("uploadBtn").onchange = function () {
  document.getElementById("uploadFile").value = this.value;
};
function kirkon() {
  var guna = auth.currentUser.uid;
  var image = document.getElementById("uploadBtn").files[0];
  var storageRef = firebase.storage().ref('users/'+guna+'/Profil.jpg');
  
  var uploadTask = storageRef.put(image);

  uploadTask.on('state_changed',function (snapshot) {
      var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      var proses = document.getElementById('mempro');
      var katpro = document.getElementById('katpro');
      katpro.innerHTML = `<p>Menunggah:</p>`
      proses.style.width = progress+"%"
  },function (error) {
      alert(error.message);
  },function () {
      var proses = document.getElementById('proses');
      var fotoProfil2 = document.getElementById('fotoProfil2');
      var katpro = document.getElementById('katpro');
      uploadTask.snapshot.ref.getDownloadURL().then(function (downlaodURL) {
        document.getElementById('fotoProfil').style.backgroundImage = `url("`+downlaodURL+`")`;
        fotoProfil2.style.backgroundImage = `url("`+downlaodURL+`")`;
        katpro.innerHTML = `<p>Berhasil Menunggah!</p>`;
        proses.style.width = progress+"%";
      });
  });
}

function chat() {
  login.style.display = "none";
  profil.style.display = "none";
  perpesanan.style.display = "none";
  tembok.style.display = "none";
  melihat.style.display = "none";
  mengchat.style.display = "block";
  mine.style.display = "none";
}

function tlOpen() {
  login.style.display = "none";
  profil.style.display = "none";
  perpesanan.style.display = "none";
  tembok.style.display = "block";
  melihat.style.display = "none";
  mengchat.style.display = "none";
  mine.style.display = "none";
}
function TLmy() {
  login.style.display = "none";
  profil.style.display = "none";
  perpesanan.style.display = "none";
  tembok.style.display = "none";
  melihat.style.display = "none";
  mengchat.style.display = "none";
  mine.style.display = "block";  
}
setInterval(() => {
  document.querySelector("#message-body").style.height =
    window.innerHeight - 110 + "px";
}, 100);

function Abil() {
  var abc = auth.currentUser.uid;
  if(abc == "qCoWRXOBJ1NLpqWzNaMRSlqIdXg1"){
  aa = "Dede";
  bb = "AbilDede";
  }
  else if(abc == "S0xowxnRYcQjKm9lNgowQdgsO5h2"){
  aa = "Athoi";
  bb = "AbilAthoi";
  }
  else if(abc == "DZk4VFNUEJZgFrYVF5aGl6vcWkY2"){
  aa = "Deva";
  bb = "AbilDeva";
  }
  else{
  alert("Sorry, ga bisa brow")
  window.location.reload();
  }

    login.style.display = "none";
    profil.style.display = "none";
    perpesanan.style.display = "block";
    tembok.style.display = "none";
    melihat.style.display = "none";
    mengchat.style.display = "none";
    mine.style.display = "none";

var me = aa;
    document
      .querySelector("#message-input")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          firebase
            .database()
            .ref("Pesan/"+bb)
            .push({
              user: me,
              msg: document
                .querySelector("#message-input")
                .value.trim()
                .replace(/</g, "&lt;"),
            });
          document.querySelector("#message-input").value = "";
          }
      });
    var id = "";
    firebase
      .database()
      .ref("Pesan/"+bb)
      .on("child_added", (s) => {
        document.querySelector("#loader").style.opacity = "0";
        if (s.val().user === me) {
          if (id !== s.val().user)
            document.querySelector("#message-body").innerHTML +=
              '<div class="my-name">Kamu</div><div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
              s.key +
              "')\" id=" +
              s.key +
              " >" +
              s.val().msg +
              "</div></div>";
          else
            document.querySelector("#message-body").innerHTML +=
              '<div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
              s.key +
              "')\" id=" +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
        } else {
          if (id !== s.val().user)
            document.querySelector("#message-body").innerHTML +=
              '<div class="their-name">' +
              s.val().user +
              '</div><div class="message-holder"><div class="their-text" id=' +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
          else
            document.querySelector("#message-body").innerHTML +=
              '<div class="message-holder"><div class="their-text" id=' +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
        }
        document.querySelector("#message-body").scrollBy(0, 1000);
        id = s.val().user;
      })
    };

function Athoi() {
  var abc = auth.currentUser.uid;
  if(abc == "qCoWRXOBJ1NLpqWzNaMRSlqIdXg1"){
  aa = "Dede";
  bb = "AthoiDede";
  }
  else if(abc == "ALIu0zawzmTcSBh3Npb9wlS7Hy83"){
  aa = "Abil";
  bb = "AbilAthoi";
  }
  else if(abc == "DZk4VFNUEJZgFrYVF5aGl6vcWkY2"){
  aa = "Deva";
  bb = "AthoiDeva";
  }
  else{
  alert("Sorry, ga bisa brow")
  window.location.reload();
  }

    login.style.display = "none";
    profil.style.display = "none";
    perpesanan.style.display = "block";
    tembok.style.display = "none";
    melihat.style.display = "none";
    mengchat.style.display = "none";
    mine.style.display = "none";

var me = aa;
    document
      .querySelector("#message-input")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          firebase
            .database()
            .ref("Pesan/"+bb)
            .push({
              user: me,
              msg: document
                .querySelector("#message-input")
                .value.trim()
                .replace(/</g, "&lt;"),
            });
          document.querySelector("#message-input").value = "";
          }
      });
    var id = "";
    firebase
      .database()
      .ref("Pesan/"+bb)
      .on("child_added", (s) => {
        document.querySelector("#loader").style.opacity = "0";
        if (s.val().user === me) {
          if (id !== s.val().user)
            document.querySelector("#message-body").innerHTML +=
              '<div class="my-name">Kamu</div><div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
              s.key +
              "')\" id=" +
              s.key +
              " >" +
              s.val().msg +
              "</div></div>";
          else
            document.querySelector("#message-body").innerHTML +=
              '<div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
              s.key +
              "')\" id=" +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
        } else {
          if (id !== s.val().user)
            document.querySelector("#message-body").innerHTML +=
              '<div class="their-name">' +
              s.val().user +
              '</div><div class="message-holder"><div class="their-text" id=' +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
          else
            document.querySelector("#message-body").innerHTML +=
              '<div class="message-holder"><div class="their-text" id=' +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
        }
        document.querySelector("#message-body").scrollBy(0, 1000);
        id = s.val().user;
      })
    };

function Deva() {
  var abc = auth.currentUser.uid;
  if(abc == "qCoWRXOBJ1NLpqWzNaMRSlqIdXg1"){
  aa = "Dede";
  bb = "DevaDede";
  }
  else if(abc == "ALIu0zawzmTcSBh3Npb9wlS7Hy83"){
  aa = "Abil";
  bb = "AbilDeva";
  }
  else if(abc == "S0xowxnRYcQjKm9lNgowQdgsO5h2"){
  aa = "Athoi";
  bb = "AthoiDeva";
  }
  else{
  alert("Sorry, ga bisa brow")
  window.location.reload();
  }

    login.style.display = "none";
    profil.style.display = "none";
    perpesanan.style.display = "block";
    tembok.style.display = "none";
    melihat.style.display = "none";
    mengchat.style.display = "none";
    mine.style.display = "none";

var me = aa;
    document
      .querySelector("#message-input")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          firebase
            .database()
            .ref("Pesan/"+bb)
            .push({
              user: me,
              msg: document
                .querySelector("#message-input")
                .value.trim()
                .replace(/</g, "&lt;"),
            });
          document.querySelector("#message-input").value = "";
          }
      });
    var id = "";
    firebase
      .database()
      .ref("Pesan/"+bb)
      .on("child_added", (s) => {
        document.querySelector("#loader").style.opacity = "0";
        if (s.val().user === me) {
          if (id !== s.val().user)
            document.querySelector("#message-body").innerHTML +=
              '<div class="my-name">Kamu</div><div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
              s.key +
              "')\" id=" +
              s.key +
              " >" +
              s.val().msg +
              "</div></div>";
          else
            document.querySelector("#message-body").innerHTML +=
              '<div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
              s.key +
              "')\" id=" +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
        } else {
          if (id !== s.val().user)
            document.querySelector("#message-body").innerHTML +=
              '<div class="their-name">' +
              s.val().user +
              '</div><div class="message-holder"><div class="their-text" id=' +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
          else
            document.querySelector("#message-body").innerHTML +=
              '<div class="message-holder"><div class="their-text" id=' +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
        }
        document.querySelector("#message-body").scrollBy(0, 1000);
        id = s.val().user;
      })
    };

function Dede() {
  var abc = auth.currentUser.uid;
  if(abc == "DZk4VFNUEJZgFrYVF5aGl6vcWkY2"){
  aa = "Deva";
  bb = "DevaDede";
  }
  else if(abc == "ALIu0zawzmTcSBh3Npb9wlS7Hy83"){
  aa = "Abil";
  bb = "AbilDede";
  }
  else if(abc == "S0xowxnRYcQjKm9lNgowQdgsO5h2"){
  aa = "Athoi";
  bb = "AthoiDede";
  }
  else{
  alert("Sorry, ga bisa brow")
  window.location.reload();
  }

    login.style.display = "none";
    profil.style.display = "none";
    perpesanan.style.display = "block";
    tembok.style.display = "none";
    melihat.style.display = "none";
    mengchat.style.display = "none";
    mine.style.display = "none";

var me = aa;
    document
      .querySelector("#message-input")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          firebase
            .database()
            .ref("Pesan/"+bb)
            .push({
              user: me,
              msg: document
                .querySelector("#message-input")
                .value.trim()
                .replace(/</g, "&lt;"),
            });
          document.querySelector("#message-input").value = "";
          }
      });
    var id = "";
    firebase
      .database()
      .ref("Pesan/"+bb)
      .on("child_added", (s) => {
        document.querySelector("#loader").style.opacity = "0";
        if (s.val().user === me) {
          if (id !== s.val().user)
            document.querySelector("#message-body").innerHTML +=
              '<div class="my-name">Kamu</div><div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
              s.key +
              "')\" id=" +
              s.key +
              " >" +
              s.val().msg +
              "</div></div>";
          else
            document.querySelector("#message-body").innerHTML +=
              '<div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
              s.key +
              "')\" id=" +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
        } else {
          if (id !== s.val().user)
            document.querySelector("#message-body").innerHTML +=
              '<div class="their-name">' +
              s.val().user +
              '</div><div class="message-holder"><div class="their-text" id=' +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
          else
            document.querySelector("#message-body").innerHTML +=
              '<div class="message-holder"><div class="their-text" id=' +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
        }
        document.querySelector("#message-body").scrollBy(0, 1000);
        id = s.val().user;
      })
    };
function Grup() {
  var abc = auth.currentUser.uid;
  if(abc == "DZk4VFNUEJZgFrYVF5aGl6vcWkY2"){
  aa = "Deva";
  bb = "Grup";
  }
  else if(abc == "ALIu0zawzmTcSBh3Npb9wlS7Hy83"){
  aa = "Abil";
  bb = "Grup";
  }
  else if(abc == "S0xowxnRYcQjKm9lNgowQdgsO5h2"){
  aa = "Athoi";
  bb = "Grup";
  }
  else if(abc == "qCoWRXOBJ1NLpqWzNaMRSlqIdXg1"){
  aa = "Dede";
  bb = "Grup";
  }
  else{
  alert("Sorry, ga bisa brow")
  window.location.reload();
  }

    login.style.display = "none";
    profil.style.display = "none";
    perpesanan.style.display = "block";
    tembok.style.display = "none";
    melihat.style.display = "none";
    mengchat.style.display = "none";
    mine.style.display = "none";

var me = aa;
    document
      .querySelector("#message-input")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          firebase
            .database()
            .ref("Pesan/"+bb)
            .push({
              user: me,
              msg: document
                .querySelector("#message-input")
                .value.trim()
                .replace(/</g, "&lt;"),
            });
          document.querySelector("#message-input").value = "";
          }
      });
    var id = "";
    firebase
      .database()
      .ref("Pesan/"+bb)
      .on("child_added", (s) => {
        document.querySelector("#loader").style.opacity = "0";
        if (s.val().user === me) {
          if (id !== s.val().user)
            document.querySelector("#message-body").innerHTML +=
              '<div class="my-name">Kamu</div><div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
              s.key +
              "')\" id=" +
              s.key +
              " >" +
              s.val().msg +
              "</div></div>";
          else
            document.querySelector("#message-body").innerHTML +=
              '<div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
              s.key +
              "')\" id=" +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
        } else {
          if (id !== s.val().user)
            document.querySelector("#message-body").innerHTML +=
              '<div class="their-name">' +
              s.val().user +
              '</div><div class="message-holder"><div class="their-text" id=' +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
          else
            document.querySelector("#message-body").innerHTML +=
              '<div class="message-holder"><div class="their-text" id=' +
              s.key +
              ">" +
              s.val().msg +
              "</div></div>";
        }
        document.querySelector("#message-body").scrollBy(0, 1000);
        id = s.val().user;
      });
    };
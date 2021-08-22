var login = document.getElementById("login");
var signup = document.getElementById("signup")
var profil = document.getElementById("profil");
var perpesanan = document.getElementById("perpesanan");
var tembok = document.getElementById("tembok")
var melihat = document.getElementById("melihatProfil");
var mine = document.getElementById("tembokku");
var nicky = document.getElementById("gantiNama");

const auth = firebase.auth();
const db = firebase.firestore();

function masuk() {
    login.style.display = "none";
    profil.style.display = "block";
    perpesanan.style.display = "none";
    tembok.style.display = "none";
    melihat.style.display = "none";
    mine.style.display = "none";
    nicky.style.display = "none";
    signup.style.display = "none";
}
function ngisiData() {
  login.style.display = "none";
  profil.style.display = "none";
  perpesanan.style.display = "none";
  tembok.style.display = "none";
  melihat.style.display = "none";
  mine.style.display = "none";
  nicky.style.display = "none";
  signup.style.display = "block";
}
function daftar() {
  var jenenge = document.getElementById("jeneng").value;
  var email = document.getElementById("surel2");
  var password = document.getElementById("sandi2");
  
  const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
  promise.then(cred =>{
    return db.collection('users').doc(cred.user.uid).set({
      nickname: jenenge
    });
  })
  firebase.database().ref("users").push().set({
    Nama: jenenge,
    Surel: email.value,
    Sandi: password.value,
    foto: "https://firebasestorage.googleapis.com/v0/b/lvchat-6a692.appspot.com/o/default%2Fprofil.jpg?alt=media&token=37c82e0a-0f53-4202-99d0-c6c6109b1b5e"

});
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
    mine.style.display = "none";
    nicky.style.display = "none";
    signup.style.display = "none";
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
        var nickNow = document.getElementById("nickNow")
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `<p>${doc.data().nickname} <i style="cursor: pointer;" onclick="gantiNick()" class="fa fa-pencil-square-o" aria-hidden="true"></i></p>`;
            panggung.innerHTML = html;
            const pengguna = doc.data().nickname;
            nickNow.innerHTML = doc.data().nickname
            mail.innerHTML = `<p>`+email+`</p>`;
            setInterval(() => {
              document.querySelector(".message-body").style.height =
                window.innerHeight - 110 + "px";
            }, 100);
            var me = pengguna;
                document
                  .querySelector(".message-input")
                  .addEventListener("keypress", (e) => {
                    if (e.key === "Enter") {
                      firebase
                        .database()
                        .ref("Pesan/UPW")
                        .push({
                          user: me,
                          msg: document
                            .querySelector(".message-input")
                            .value.trim()
                            .replace(/</g, "&lt;"),
                        });
                      document.querySelector(".message-input").value = "";
                      }
                  });
                var id = "";
                firebase
                  .database()
                  .ref("Pesan/UPW")
                  .on("child_added", (s) => {
                    document.querySelector(".loader").style.opacity = "0";
                    if (s.val().user === me) {
                      if (id !== s.val().user)
                        document.querySelector(".message-body").innerHTML +=
                          '<div class="my-name">Kamu</div><div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
                          s.key +
                          "')\" id=" +
                          s.key +
                          " >" +
                          s.val().msg +
                          "</div></div>";
                      else
                        document.querySelector(".message-body").innerHTML +=
                          '<div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
                          s.key +
                          "')\" id=" +
                          s.key +
                          ">" +
                          s.val().msg +
                          "</div></div>";
                    } else {
                      if (id !== s.val().user)
                        document.querySelector(".message-body").innerHTML +=
                          '<div class="their-name">' +
                          s.val().user +
                          '</div><div class="message-holder"><div class="their-text" id=' +
                          s.key +
                          ">" +
                          s.val().msg +
                          "</div></div>";
                      else
                        document.querySelector(".message-body").innerHTML +=
                          '<div class="message-holder"><div class="their-text" id=' +
                          s.key +
                          ">" +
                          s.val().msg +
                          "</div></div>";
                    }
                    document.querySelector(".message-body").scrollBy(0, 1000);
                    id = s.val().user;
                  });
    });
    login.style.display = "none";
    profil.style.display = "block";
    perpesanan.style.display = "none";
    tembok.style.display = "none";
    melihat.style.display = "none";
    mine.style.display = "none";
    nicky.style.display = "none";
    signup.style.display = "none";

    }else{
        login.style.display = "block";
        profil.style.display = "none";
        perpesanan.style.display = "none";
        tembok.style.display = "none";
        melihat.style.display = "none";
        mine.style.display = "none";
        nicky.style.display = "none";
        signup.style.display = "none";
    }
});
function lihatProfil() {
  login.style.display = "none";
  profil.style.display = "none";
  perpesanan.style.display = "none";
  tembok.style.display = "none";
  melihat.style.display = "block";
  mine.style.display = "none";
  nicky.style.display = "none";
  signup.style.display = "none";
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
function gantiNick() {
  login.style.display = "none";
  profil.style.display = "none";
  perpesanan.style.display = "none";
  tembok.style.display = "none";
  melihat.style.display = "none";
  mine.style.display = "none";
  nicky.style.display = "block";
  signup.style.display = "none";
}
function submitNick() {
  var namaSek = document.getElementById("nickChange").value;
  var nickSek = document.getElementById("nickNow");
  var namTamp = document.getElementById("nama");
  db.collection('users').doc(auth.currentUser.uid).set({
    nickname: namaSek
});
alert("Berhasil")
nickSek.innerHTML = namaSek;
namTamp.innerHTML = `<p>`+namaSek+` <i style="cursor: pointer;" onclick="gantiNick()" class="fa fa-pencil-square-o" aria-hidden="true"></i></p>`
}



function chat() {
  
  login.style.display = "none";
  profil.style.display = "none";
  perpesanan.style.display = "block";
  tembok.style.display = "none";
  melihat.style.display = "none";
  mine.style.display = "none";
  nicky.style.display = "none";
  signup.style.display = "none";
}

function tlOpen() {
  login.style.display = "none";
  profil.style.display = "none";
  perpesanan.style.display = "none";
  tembok.style.display = "block";
  melihat.style.display = "none";
  mine.style.display = "none";
  nicky.style.display = "none";
  signup.style.display = "none";
}
function TLmy() {
  login.style.display = "none";
  profil.style.display = "none";
  perpesanan.style.display = "none";
  tembok.style.display = "none";
  melihat.style.display = "none";
  mine.style.display = "block";
  nicky.style.display = "none";
  signup.style.display = "none";
}

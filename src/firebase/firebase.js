import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDykZNvSCaid0PdWLzybuXeS3dXcIhfdCI",
    authDomain: "splitbill-62232.firebaseapp.com",
    databaseURL: "https://splitbill-62232.firebaseio.com",
    projectId: "splitbill-62232",
    storageBucket: "",
    messagingSenderId: "93467278981",
    appId: "1:93467278981:web:c3de8347270ded23"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig); 

const database = firebase.database();

export { firebase, database as default }; 

// database.ref().set({
//   des:'',
//   note:'',
//   amount:1000,
//   createAt:''
// })

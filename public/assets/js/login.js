document
.getElementById("loginForm")
.addEventListener("submit", async (e)=>{

e.preventDefault();

const body={

email:email.value,

password:password.value

};

const res=await fetch("/api/auth/login",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(body)

});

const data=await res.json();

if(res.ok){

alert("Login Successful");

location.href="/account.html";

}else{

alert(data.error);

}

});
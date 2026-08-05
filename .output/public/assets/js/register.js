document
.getElementById("registerForm")
.addEventListener("submit",async(e)=>{

e.preventDefault();

const body={

name:name.value,

email:email.value,

phone:phone.value,

password:password.value

};

const res=await fetch("/api/auth/register",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(body)

});

const data=await res.json();

if(res.ok){

alert("Account Created");

location.href="/account.html";

}else{

alert(data.error);

}

});
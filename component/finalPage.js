let userId = document.querySelectorAll('.userId')
let userName = document.querySelector(".userName")
let userContact = document.querySelector(".userContact")
let userEmail = document.querySelector(".userEmail")

let data = JSON.parse(localStorage.getItem("users"))
console.log(data);
let loginData = JSON.parse(localStorage.getItem("loginData"))
console.log(loginData);



let exists = data.filter((ele)=>{
  return (ele.id === loginData.id) && (ele.password === loginData.password)
})

if(exists){
  userId.forEach((ele)=>{
    ele.textContent = exists[0].id
  })
  userName.textContent = exists[0].username
  userContact.textContent = exists[0].contact
  userEmail.textContent = exists[0].email
}
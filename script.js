document.addEventListener("DOMContentLoaded", () => {
  const message = document.querySelector(".message");
  const register = document.querySelector("#submit_btn2");
  const submitBtn = document.querySelector("#submit_btn1");
  let signUp = document.querySelector("#sign_up");
  let login = document.querySelector("#login_here");

  //! message(pop-up) section:
  message.addEventListener("click", () => {
    message.classList.remove("messageDisplay");
  });

  //! setup: section:
  signUp.addEventListener("click", (e) => {
    let signup_container = document.querySelector(".signup_container");
    signup_container.classList.add("slide_effect");
  });
  
  login.addEventListener("click", () => {
    let signup_container = document.querySelector(".signup_container");
    signup_container.classList.remove("slide_effect");
  });

  // //! sign_up data:
  let data = [];
  register.addEventListener("click", (e) => {
    e.preventDefault();
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const signup_email = document.querySelector("#signup_email").value;
    const signup_contact = document.querySelector("#signup_contact").value;
    const create_password = document.querySelector("#create_password").value;
    const confirm_password = document.querySelector("#confirm_password").value;
    const uniqueIdDisplay = document.querySelector("#uniqueIdDisplay");
    const passkeyDisplay = document.querySelector("#passkeyDisplay");
    const message = document.querySelector(".message");

    //! formed an unique id:
    let numbers = ["0123456789"];
    let found = signup_email.indexOf("@");
    let uniqueId = signup_email.split("").splice(0, found).join("");

    for (let i = 0; i < 4; i++) {
      uniqueId += `${numbers[0][Math.floor(Math.random() * 10)]}`;
    }

    //! validation section:
    let count = 0;
    if(firstName != "" && lastName !=""){
      count++
    }
    if (signup_email.includes("@gmail.com") && signup_email != "") {
      count++;
    }
    else{
      alert("email should be @gmail.com")
    }

    if (signup_contact.length === 10 && signup_contact != "") {
      count++;
    }
    else{
      alert("contact should be 10 digit number")
    }

    if (create_password === confirm_password && confirm_password != "" && create_password) {
      count++;
    }

    if (count === 4) {
      let userInfo = {
        username: `${firstName} ${lastName}`,
        id: uniqueId,
        email: signup_email,
        contact: signup_contact,
        password: create_password,
      };

      const exists = data.some((ele) => {
        return ele.id === uniqueId;
      });

      if (!exists) {
        data.push(userInfo);
        localStorage.setItem("users", JSON.stringify(data));

        let signup_container = document.querySelector(".signup_container");
        signup_container.classList.remove("slide_effect");
  
        setTimeout(() => {
          uniqueIdDisplay.innerHTML = uniqueId;
          passkeyDisplay.innerHTML = create_password;
          // window.confirm(`Your Id: ${uniqueId}\nPassword: ${create_password}`)
          message.classList.add("messageDisplay");
        }, 2000);
      }
    } 
    else {
      alert("Input should be a value")
    }
  });


  //! login data
  submitBtn.addEventListener("click", (e) => {
    const loginId = document.querySelector("#loginId").value;
    const loginPassword = document.querySelector("#loginPassword").value;
    e.preventDefault()

    let found = 0;

    let information = JSON.parse(localStorage.getItem("users")) || [];

    for(let ele of information){
      if (ele.id == loginId && ele.password == loginPassword) {
          found+=1
          break;
        }
      }

      if (loginId != "" && loginPassword != "") {
          if (found == 1 ) {
            const url = "./component/finalPage.html";
            window.open(url, "_blank");

            let logininfo = {
              id: loginId,
              password: loginPassword,
            };
            localStorage.setItem("loginData", JSON.stringify(logininfo));
          }
          else{
            alert("No account found")
          }
      }
      else {
        alert("Input field should be a value");
      }
  });
});

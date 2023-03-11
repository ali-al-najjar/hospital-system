const hospital_pages = {};
hospital_pages.base_url = "http://localhost/hospital-system/backend/php/";

hospital_pages.getAPI = async (api_url) => {
    try{
        return await axios(api_url);
    }catch(error){
        console.log("Error from GET API");
    }
}

hospital_pages.postAPI = async (api_url, api_data) => {
    try{
        return await axios.post(
            api_url,
            api_data

        );
    }catch(error){
        console.log("Error from POST API");
    }
}

hospital_pages.loadFor = (page) => {
    eval("hospital_pages.load_" + page + "();");
}


const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const isValidPassword = (password) => {
  const emailRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return emailRegex.test(password);
}

const isValid = (text) => {
  if (text.trim().length === 0) {
    return false;
      }
    else return true;
    }


hospital_pages.load_login = () => {
  const login = async() =>{
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let error = document.getElementById("error");
    const login_url = hospital_pages.base_url + "login.php";
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);
    if (isValidEmail(email) && isValidPassword(password)){
    const response = await hospital_pages.postAPI(login_url,data);
    console.log(response.data);
  }else{
    error.innerHTML="<img src=./assets/error.svg>  Wrong Email OR Password!"
  }}

    const login_btn = document.getElementById("login_btn");
    login_btn.addEventListener("click",login);

}


hospital_pages.load_register = () => {
  
  const register = async() =>{
    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let user_type = document.getElementById("user_types").value;
    let error = document.getElementById("error");
    const register_url = hospital_pages.base_url + "registration.php";
    let data = new FormData();
    data.append('first_name',first_name);
    data.append('last_name',last_name);
    data.append('email', email);
    data.append('password', password);
    data.append('user_type', user_type);
    if(isValid(first_name) && isValid(last_name) && isValid(user_type)){
      if (isValidEmail(email)){
       if(isValidPassword(password)){
        const response = await hospital_pages.postAPI(register_url,data);
        console.log(response.data);
  }else{
    error.innerHTML="<img src=../assets/error.svg> Your password must contain at least: <ul><li>8 characters</li><li>1 Special charachter</li><li>1 Capital letter & 1 Small letter</li><li>1 number</li> "
  }}else{
  error.innerHTML="<img src=../assets/error.svg>  Your email is not valid try another one!"
}}else{
  error.innerHTML="<img src=../assets/error.svg>  No Empty Fields are allowed!"
}
}

    const register_btn = document.getElementById("register_btn");
    register_btn.addEventListener("click",register);
}



// hospital_pages.load_login = async () => {
//   const login = hospital_pages.base_url + "login.php";
//   const response = await hospital_pages.postAPI(login);
//   console.log(response.data);
// }

// class User{
//   constructor(first_name,last_name,email,password,usertype){
//     this.first_name = first_name;
//     this.last_name = last_name;
//     this.email = email;
//     this.password = password;
//     this.usertype = usertype;
//   }
// }
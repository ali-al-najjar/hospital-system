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
    // console.log(response.data.usertype);
    if(response.data.usertype == "Admin"){
      window.localStorage.setItem("usertype","Admin");
      window.location.href="./pages/admin_portal.html";
    }else if (response.data.usertype =="Employee"){
      window.localStorage.setItem("usertype","Employee");
      window.location.href="./pages/employee_portal.html";
    }else{
      window.localStorage.setItem("usertype","Patient");
      window.location.href="./pages/patient_portal.html";
    }

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



hospital_pages.load_admin_portal = async () => {
    const users_url = hospital_pages.base_url + "get_users.php";
    const hospitals_url = hospital_pages.base_url + "get_hospitals.php";
    const assign_patients_url = hospital_pages.base_url + "assign_patients.php";
    const response = await hospital_pages.getAPI(users_url);
    const hospitals = await hospital_pages.getAPI(hospitals_url);
    // const assign_patients = await hospital_pages.postAPI(hospitals_url,data);
    const users_table = document.getElementById("users_table");
    // const assign_btn = document.getElementById("assign_btn");

const hospitalsList = (list) => {
  const select = document.createElement("select");
    for(let i = 0; i < list.length; i++) {
        let option = list[i];
        let element = document.createElement("option");
        element.text = option.name;
        element.value = option.id;
        select.appendChild(element);
}
  return select;
}
  (hospitalsList(hospitals.data));
    console.log(response.data);
      response.data.forEach(user => {
        if(user.name == 'Patient' || user.name == 'Employee' ){
      const row = document.createElement("row");
      const fname = document.createElement("div");
      const lname = document.createElement("div");
      const email_div = document.createElement("div");
      const assign_btn = document.createElement("div");
      const list = document.createElement("div");
        row.classList.add("row");
        const first_name = document.createTextNode(user.first_name);
        fname.classList.add("first_name");
        fname.appendChild(first_name);
        const last_name = document.createTextNode(user.last_name);
        lname.classList.add("last_name");
        lname.appendChild(last_name);
        const email = document.createTextNode(user.email);
        email_div.appendChild(email);
        list.classList.add("select");
        list.appendChild(hospitalsList(hospitals.data));
        const btn = document.createTextNode("Assign");
        assign_btn.classList.add("assign_btn","btn");
        assign_btn.appendChild(btn);
        row.appendChild(fname);
        row.appendChild(lname);
        row.appendChild(email_div);
        row.appendChild(list);
        row.appendChild(assign_btn);
        users_table.appendChild(row);
        assign_btn.addEventListener("click",() =>{
          console.log("hi");
        });
      }
        
      
      
      
  })
  
  
}

  
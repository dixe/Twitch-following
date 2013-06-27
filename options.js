// Save this script as `options.js`

// Saves options to localStorage.
function save_options() {
  var name = document.getElementById("name").value;
  console.log(name);
  localStorage["name"] = name;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var name = localStorage["name"];
  if (!name) {
    return;
  }
  else{
    console.log(name+"Myaass");
    document.getElementById("name").value=name;
    return name;
  }
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
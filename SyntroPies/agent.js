var tgl = document.getElementById('tgl');
var syntropy_api_key = document.getElementById('SYNTROPY_API_KEY');

//configure toggle action
get_toggles();

//check if Agent token, the only required value, has been ticked
document.getElementById('applyBtn').addEventListener("click", () => {
    if (syntropy_api_key.value.length == 0) {
        alert("Agent Token Required");
        return;
    }
    else { //if so, prepare the button to write to disk, as well as the prepare codeblock
        document.getElementById('writeChangesBtn').style.display = "block";
        document.getElementById('codeblock').style.display = "block";
        codeblock.innerHTML = "---=== CHANGES TO BE WRITTEN ===---\n" + template_build();
    }
});

// on-click of 'Write Changes', will write the configuration and make reboot button available
document.getElementById('writeChangesBtn').addEventListener("click", () => {
    template_deploy();
    document.getElementById('applyBtn').style.display = "none";
    document.getElementById('rebootBtn').style.display = "block";
});

//reboot function
document.getElementById('rebootBtn').addEventListener("click", () => {
    pi_reboot();
});

//toggles on and off 'advanced' configuration variables
function get_toggles(){
    document.getElementById('advanced_tgl').addEventListener("click", () => {
        if(advanced_tgl.checked){
            document.getElementsByClassName('hideAdvanced')[0].style.display="block";
            document.getElementsByClassName('hideAdvanced')[1].style.display="block";
            document.getElementsByClassName('hideAdvanced')[2].style.display="block";
            document.getElementsByClassName('hideAdvanced')[3].style.display="block";
        }
        else{
            document.getElementsByClassName('hideAdvanced')[0].style.display="none";
            document.getElementsByClassName('hideAdvanced')[1].style.display="none";
            document.getElementsByClassName('hideAdvanced')[2].style.display="none";
            document.getElementsByClassName('hideAdvanced')[3].style.display="none";
        }
    })
}



/* --- functions --- */



//reboot pi
function pi_reboot() {
    cockpit.spawn(["shutdown", "-hr", "now"]);
}

//returns a string containing the 10-vars.conf file
function template_build() {
    const environment_variables = ["SYNTROPY_API_KEY", "SYNTROPY_AGENT_NAME", "SYNTROPY_NETWORK_API", 
                                    "SYNTROPY_LOG_LEVEL", "SYNTROPY_TAGS", "SYNTROPY_CONTROLLER_URL", 
                                    "SYNTROPY_PORT_RANGE", "SYNTROPY_ALLOWED_IPS"];

    var arrl = environment_variables.length;
    var tmpl = "# Required parameters\n[Service]\n";

    for (var i = 0; i < arrl; i++) {
        var t = document.getElementById(environment_variables[i]);
        if ( typeof(t.value) != 'undefined' && t != null && t.value != "") {
            tmpl = tmpl.concat("Environment=" + environment_variables[i] + "=" + t.value + "\n");

        }
    }
    return tmpl;
}

//success message, will comment "success" and color the code block green
function success() {
    codeblock = document.getElementById('codeblock');
    codeblock.appendChild(document.createTextNode("-----===== S U C C E S S =====----\nNow, reboot your Pi for the changes to take effect"));
    codeblock.style.color = "green";
}

//failure message, will comment "failure" and color the code block red
function fail() {
    codeblock = document.getElementById('codeblock');
    codeblock.appendChild(document.createTextNode("!!!! ! ! !  F A I L E D ! ! ! !!!!"));
    codeblock.style.color = "red";
}

//writes template using cockpit's own syscall bridge
function template_deploy() {
    cockpit.file("/etc/systemd/system/syntropy-agent.service.d/10-vars.conf").replace(template_build())
        .then(success)
        .catch(fail)
}
var checkAPI = document.getElementById('SYNTROPY_API_KEY').value.length;
var checkPortRangi = document.getElementById('SYNTROPY_PORT_RANGE').value.length;
var CheckAllowedIPs = document.getElementById('SYNTROPY_ALLOWED_IPS').value.length;
//check if Agent token, the only required value, has been ticked
document.getElementById('applyBtn').addEventListener("click", () => {
    if (checkAPI == 0 || checkPortRangi == 0 || CheckAllowedIPs == 0) {
        alert("Required variables missing");
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

//reboot pi
document.getElementById('rebootBtn').addEventListener("click", () => {
    pi_reboot();
});



/* --- functions --- */

//reboot pi
function pi_reboot() {
    cockpit.spawn(["shutdown", "-hr", "now"]);
}

//returns a string containing the 10-vars.conf file
function template_build() {
    const environment_variables = ["SYNTROPY_API_KEY", "SYNTROPY_AGENT_NAME", 
                                    "SYNTROPY_LOG_LEVEL", "SYNTROPY_TAGS", "SYNTROPY_CONTROLLER_URL", 
                                    "SYNTROPY_PORT_RANGE", "SYNTROPY_ALLOWED_IPS"];

    var arrl = environment_variables.length;
    var tmpl = "# Required parameters\n[Service]\n";

    for (var i = 0; i < arrl; i++) {
        var t = document.getElementById(environment_variables[i]);
        if ( typeof(t) != 'undefined' && t != null && t.value != "") {
            tmpl = tmpl.concat("Environment=" + environment_variables[i] + "=" + t.value + "\n");

        }
    }
    tmpl = tmpl.concat("Environment=SYNTROPY_NETWORK_API=host\n");
    tmpl = tmpl.concat("Environment=SYNTROPY_SERVICES_STATUS=true\n");

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


//check if Agent token, the only required value, has been ticked
document.getElementById('wgStart').addEventListener("click", () => {
    if (document.getElementById('wireguardconf').value == 0) {
        alert("Agent Token Required");
        return;
    }
    else { //if so, prepare the button to write to disk, as well as the prepare codeblock
        document.getElementById('wgStart').style.display = "block";
        document.getElementById('codeblock').style.display = "block";
    }
});


// on-click of 'Write Changes', will write the configuration and make reboot button available
document.getElementById('wgStart').addEventListener("click", () => {
    wg_config_deploy();
    document.getElementById('wgApply').style.display = "block";
});

//wg up pi
document.getElementById('wgApply').addEventListener("click", () => {
    wg_up()
});

document.getElementById('wgStop').addEventListener("click", () => {
    wg_down()
});

/* --- functions --- */

//wg up pi
function wg_up() {
    cockpit.spawn(["sudo", "wg-quick", "up", "wg0"])
    .then(success)
    .catch(fail)
}

//success message, will comment "success" and color the code block green
function success() {
    codeblock.style.color = "green";
    codeblock.innerHTML = "-----===== S U C C E S S =====----\nNow, click the blue button below to start tunnelling your traffic through WireGuard";

}

//failure message, will comment "failure" and color the code block red
function fail() {
    codeblock.style.color = "red";
    codeblock.innerHTML = "!!!! ! ! !  F A I L E D ! ! ! !!!!\n"; 
}

function wg_config_deploy() {
    cockpit.spawn("touch", "/etc/wireguard/wg0.conf");
    cockpit.file("/etc/wireguard/wg0.conf").replace(document.getElementById('wireguardconf').value)
        .then(success)
        .catch(fail)
}

function wg_down() {
    cockpit.spawn(["wg-quick", "down", "wg0"])
    .then(success)
    .catch(fail)
}

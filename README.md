![image](https://user-images.githubusercontent.com/86206059/122754941-2d2b5100-d28c-11eb-916b-d1f5512dd5d0.png)

## Introduction

SyntroPies is a set of Raspberry Pi images pre-loaded with Syntropy Agent software and its dependent packages and modules. Included is also a simple cockpit-based application for easy agent management from any device on your home network (or elsewhere). No need to drag up USB and HDMI cables, or configure it all via SSH - all you need to get started is a browser!


## Demo


## Installation
First, download the zipped image here:

Next, unzip the image and flash it to an SD card. We recommend using the official [Raspberry Pi imager](https://www.raspberrypi.org/software/).

Plug in your Pi to one of your router's Ethernet LAN ports. It is likely that your router will assign the Pi a random IP address - you can find this address by accessing your router's management panel.

Finally, to access your app, go to  ```<yourPiAddress>:9090``` and log in with the default Raspberry Pi credentials.

## Usage

Once you are logged in to the cockpit interface, you will see "SyntroPies" listed in the left-hand panel. This is the management app. Click it, and you will be presented with three options of how to configure your endpoint:

* As a standard agent, letting you connect to the Syntropy network
* As a Syntropy VPN server, letting you tunnel traffic to it from standard Wireguard clients
* As a standard Wireguard VPN client, letting you connect to other Syntropy VPN servers 


## Use-cases

If you choose to configure your Pi as a standard agent, you will be able to host other services on your device and connect these to other Syntropy endpoints via the Syntropy platform. As an example, you can host a web server which you can connect to from your

As an example of a use-case of the VPN-centered configuration options, you could have a set of Raspberry Pis, leave one connected as a VPN server on your home network, and configure the other one as a VPN client acting as a wireless bridge. Wherever you go, you can then securely connect to the Internet from your home network via the tunnel.

There are many possible use-cases. In the end though, SyntroPies simply provides a basic playground for your projects.


## Post-installation recommendations

* The credentials of the ```pi``` user are left at their default values. It is recommended that you take steps to change these
* For ease of access, you may also wish to configure a static IP for your Pi, either via your router (recommended) or the Pi itself
* SSH is enabled by default on this image - you may wish to disable it if you don't expect to use it. This can easily be done with the ```raspi-config``` utility
* For remote desktop access, you may wish to enable VNC via ```raspi-config``` > interfaces >

## Requirements
* If you wish to run a VPN server, there are some requirements that need to be met. For one, you need access to your router, where you will need to do some port forwarding to your Raspberry Pi. Secondly, you need to nto be behind CGNAT - or in other words: your router's WAN interface needs to be assigned a publicly routable IP address.
* This image has been tested on Raspberry Pi model 4 B only - you may try other versions, but it is not guaranteed that these will work. In case of any problems, feel free to open an issue here.

## Documentation
[Agent variables and their meanings](https://docs.syntropystack.com/docs/syntropy-agent-variables)


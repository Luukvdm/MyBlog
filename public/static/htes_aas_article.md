## About The Project

During my cyber security minor at Fontys, me and 6 other students did a project for our universities 
[Professorship High Tech Embedded Software](https://fontys.nl/Over-Fontys/Fontys-Hogeschool-ICT/Onderzoek/Lectoraat-High-Tech-Embedded-Software.htm).
The project was about investigating the [Industry 4.0 AAS](https://www.plattform-i40.de/PI40/Redaktion/DE/Downloads/Publikation/Digital-Twin-and-Asset-Administration-Shell-Concepts.html)
concept and the security consequences in such an environment.  
Even though me and 3 other students already worked on a different
[project regarding a security workshop](https://www.htesfontysict.nl/cybersecurity-workshop/)
teaching participants about ICS security. 
The AAS concept was very new to us.  

Thats why we decided to start with looking at existing projects and use 
that knowledge to build our own software and environment.
We hoped that by building our own environment we would learn allot about the AAS concept
and would help us in finding potential weaknesses.

I do not want to spend a lot of time on explaining the definition of a AAS.
But in summary it is a bridge between operational technology systems and the IT environment.
This is achieved by creating a digital twin for the industrial environment 
that exposes an interface thats more suitable for traditional IT services.
You can read more about the AAS concept in this 
[document (PDF)](https://www.plattform-i40.de/PI40/Redaktion/DE/Downloads/Publikation/Digital-Twin-and-Asset-Administration-Shell-Concepts.pdf?__blob=publicationFile&v=9)
by plaform-i40.


## 1. Setup And Choices

When making choices for what technologies to use and how to implement them. 
We talked with a company that works on AAS technology and we looked at existing solutions.
One of our goals was that the system would be as close to
[plug-and-produce](https://www.plattform-i40.de/PI40/Redaktion/DE/Downloads/Publikation/Industrie-40-20Plug-and-Produce.html)
as possible. 
This requires sticking to standards set by the industry and would make our system more relevant and realistic.

**The "Factory"**  
For our environment we needed a factory. The problem is we do not have any factories lying around at school. 
We did have a bridge that was created by a different project group that continued working on
[the workshop project](https://www.htesfontysict.nl/cybersecurity-workshop/).

The bridge uses a [Revolution Pi](https://revolution.kunbus.com/) instead of a classic PLC.
This is great because not only did we have prior experience with this device, but its also really easy to code for.
It works pretty much the same as a Raspberry Pi with some changes to make it more suitable for 
industrial environments.

The downside of this bridge is that we would only have 1 asset.
But this seemed fine for a prototype.

**What Protocols To Use**  
For the protocol that clients outside the environment would use to communicate with the AAS we decided that
HTTP would be best. The good thing about HTTP is that its easy to use and easy to secure.
HTTP supports many ways for authentication and many of the tools that the blue team often uses work with HTTP.

The protocol that the devices use inside the factory is a more difficult choice.
The industry standard is [OPC UA](https://en.wikipedia.org/wiki/OPC_Unified_Architecture), 
and we planned on eventually using this. 
OPC UA is a complicated protocol and not easy to implement. Thats why we decided that we would 
start with [MQTT](https://mqtt.org/) in our first sprint.  
But when we wanted to start working on OPC UA we realised that the libraries available for Java
were not very complete and that it would require a lot of time to implement without many benefits.
So we decided to stick with MQTT instead.

**Components**  
Our environment consists of 3 main different components.  
- A RevPi (PLC) that controls the bridge
- Gateway that listens to MQTT messages and exposes information through HTTP
- A Dashboard that helps visualize what is going on

![Components](/static/images/components.png)

To make everything work smoothly we also needed a [MQTT Broker](https://en.wikipedia.org/wiki/MQTT#MQTT_broker)
that routes the MQTT messages between the components and a database for
some persistence between reboots of the AAS/ Gateway service.

## 2. Security

Finding potential weak spots and describing what needs to be done to counter these weak spots 
was of course our main focus. The security mitigations that we implemented are not sufficient for every environment.
But expanding these mitigations to (better) cover certain risks should be very feasible.

### 2.1 Network  

For our network we took some basic security measurements like network segmentation, network segregation and
setting up a VPN server for us developers.  
Network separation allows for more strict rules in the factory network like not allowing devices without clearance.
This of course should not cause any problems because most other devices will use the AAS/ Gateway to communicate 
with the devices inside the factory.  
These stricter rules can be a powerful tool to for instance stop rogue devices from being connected to your network.
In our network we gave each component that used MQTT a signed certificate from our own 
[Certificate Authority](https://en.wikipedia.org/wiki/Certificate_authority) that our MQTT broker could verify.
Both MQTT and OPC UA support using certificates to verify clients.

### 2.2 Asset - PLC (Revolution Pi)

An attacker could directly attack a PLC. Getting a foothold in one of the potential many PLC's can be done
through physical attacks, social engineering and wireless attacks, etc.  
Because many of these attacks lie outside of the scope of our project,
we only implemented basic security mitigations like logging events, a 
[watchdog timer](https://en.wikipedia.org/wiki/Watchdog_timer) and basic code obfuscation.  

More security mitigations should be taken to secure the asset.
The asset has a lot of responsibilities (too many perhaps?) and can do a lot of damage when compromised.
The asset has access to all the other assets and the data they contain and
can in our case even call functions in other assets.

In a production environment you definitely want to block internet access from the PLC's.
In PLC's that currently get used its not unheard of to have the PLC call home for updates and monitoring.
This could cause major security risks like data leaks and supply chain attacks.  
Blocking internet access does make updating the software on the PLC more complicated
but I believe its worth the hassle.

### 2.3 AAS/ Gateway

This is the brain of the factory, its primary function is to expose a digital representation of the factory.
The main threats are on the HTTP interface that is potentially exposed to third parties and other services.  

This makes security pretty straight forward because it almost works the same as a regular web application.
I personally see this as a good thing, because there are already many resources describing best practices for
securing web applications.

The AAS gateway receives data through MQTT so in our case it also needs a certificate to communicate with the MQTT broker.  
To have some persistence between restarting the service we save the current state in a PostgreSQL database.
The downside of our approach is that its not very performant, but this is not a problem in our test environment.  
This does however make our AAS Gateway pretty simple and not likely to have vulnerabilities.
Its of course always good to expect the unexpected witch is why we have built in logging for monitoring.

## 3. Final Thoughts

I think the AAS concept is a good way of connecting your industrial environment with an IT environment.
I would like this concept to be described in more detail as a protocol.
Right now some parts stay vague and could cause incompatibility between projects.  
The AAS concept is not by definition insecure nor does it introduce big risks that cant be mitigated.
I do however believe that the AAS concept could amplify existing risks.
When the environment is setup with MQTT or OPC-UA all the devices are connected and therefor need to be secured.

Right now OPC-UA seems to become the standard technology when using the AAS concept.
The OPC-UA protocol is unnecessarily complex, which leads to more vulnerabilities.  
OPC-UA is used from the PLC's, which means that its the device manufacturers job to include it in the PLC.
This could lead to vendor locking and more security risks.

I would like to see a simpler protocol that puts less responsibilities on the PLC.
Having a protocol that does not require the PLC to reach out and send data to some service
would make the environment more flexible and potentially make it possible to isolate the PLC's.
This would make the PLC less of a target and make the environment easier to secure.


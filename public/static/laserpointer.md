## Introduction
For my cuber security (security engineering) minor I need to create a application that needs security. 
The application is going to run on a virtual server in our schools vmware vSphere environment.
During the semester there will be multiple red vs blue team events 
where the applications that the security engineers developed will be tested.   

The application needs at least:
- Internet connectivity
- Database
- Authentication

## My Idea
I recently rooted my Android phone and installed [Termux](https://termux.com/). Termux is a terminal emulator for Android.
Termux is especially useful for rooted phones because you get access to all your phones features,
and Termux helps with making use of those features.  
One of the ways that Termux does this is by maintaining a [software repository](https://github.com/termux/termux-root-packages) with useful software for rooted users.
In this repository you can find cool packages like termshark, openvpn and htop.
But one of the packages that I found especially interesting was [aircrack-ng](https://www.aircrack-ng.org/).  

During an earlier semester we were learning about ethical hacking and red teaming and used
aircrack-ng for the wireless hacking topic. I found the software very cool but using it was
annoying because I was using it from a Kali Linux VM and it only worked when I passed 
a USB WiFi adapter to the VM that supports monitor mode.  
Having aircrack on your phone could make this process allot easier for a red teamer.
The only problem is that a phone can't really crack the password.

Thats why I wanted to create a web front-end for hash crack software like [Hashcat](https://hashcat.net/hashcat/).
It would not only make it easy to send passwords that need checking to a more powerful machine
but could also help red teams in working together.

### LaserPointer
So my application is going to be a web front-end for cracking hashes.  

The application has these goals:

**Must haves**
- Crack a set of hashes
- Get the result of the cracking attempt
- Be usable from a web UI

**Should haves**
- Be usable as an API
- Usable for teams
- Upload custom word lists
- Using the application as a team
- Crack hashes with Hashcat

**Could haves**
- Have a external client for the hash cracking
- Support multiple cracking clients
- Support other hash cracking software like John the Ripper

**Would haves**
- Benchmark cracking clients to load balance jobs


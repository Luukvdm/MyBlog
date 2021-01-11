# Research Plan Database Security

[1. Introduction](#1.-introduction)  
[2. Project](#2.-project)  
[3. Research Approach](#3.-research-approach)  
[4. Planning](#4.-planning)  


## 1. Introduction

During the security engineering minor I'm working on a system that needs to be secured against hackers.
The system includes a database, I would like for this database to be hardened.
This hardening serves as extra layer of security on top of the measurements already taken.
During this research I will first be researching the popular security measurements taken, and what they protect against.  
Then I will decide which measurements are most relevant in my system and do more indepth research.
Finally I want to have a good idea what the right protection is for my system.

## 2. Project

Wireless hacking can be a very powerful way to infiltrate an organization.
Doing this from a laptop isn't very practical because its hard to take with you.
Doing it from a phone or small IOT device is allot easier.
But these low power devices aren't powerful enough to check the hash against weak passwords.

This project called LaserPointer allows low power devices to send hashes to an API that tries to crack it.
Not only allows this for easy access to a remote powerful password cracking machine, but it can also
help the red team when working together on a project.

Cracked passwords could become a target for malicious actors and need to be protected.
This is being done in multiple layers of security.
Protecting the database that stores these passwords is one of those layers.
The goal of this research is to figure out what measurements are the most effective for the project.

## 3. Research Approach

### 3.1 Main research question
- What security measurements concerning the database are the most relevant and effective for the LaserPointer project?

### 3.2 Sub questions
- What security risks are there for the database?
- Which techniques are most commonly used for securing relative databases and why are these techniques chosen?
- What do these techniques protect against?
- How well do these techniques work in a docker environment?
- What does it take to implement these techniques?

### 3.3 Answering the questions

To answer this main question, various sub-questions have been formulated.
After researching and answering the sub-questions, it should also be possible to answer the main question.

**What security risks are there for the database?**  
I will be creating a risk analyses about the database in my project.
This falls under the field strategy.

**Which techniques are most commonly used for securing relative databases and why are these techniques chosen?**  
To answer this question I will be using the library and field strategies.
I will mainly do research on the internet about what security methods exist an dare being used.  
For the field research I will be looking at a couple of open source projects that store valuable data in a database like Bitwarden.

**What do these techniques protect against?**  
I want to do research on the internet about what they protect against.
This should be very helpful together with the risk analyses for answering the main research question.
This research falls under the library strategy.

**How well do these techniques work in a docker environment?**  
To know how relevant the different possible techniques are for my project, I need to know how they work in a Docker environment.
I want to research this on the internet.
This research falls under the library strategy.
It might also involve some field research because some of the open source projects that I want to look at also use docker.
And this might help me figure out if they work in a docker environment.

**What does it take to implement these techniques?**  
I don't consider a security measurement that requires me to for example rewrite large parts of code as relevant for the project.
Thats why I think I need to research this.  
To answer this question I will be doing research on the internet.

## 4. Planning



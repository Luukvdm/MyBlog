## 1. Goals

My goal for the continuous deployment system was to make it very flexible.
Since I don't have some dedicated server for building the code, I wanted to be easily movable and expandable.  
Thats why I decided to use Docker containers for hosting the different applications.

## 2. Jenkins Setup

I used [Jenkins](https://www.jenkins.io/) as platform for building and deploying my application.
I choose Jenkins because I already had some experience with setting it up.  
I want to use a declarative pipeline that I'm saving in the repositories.

### 2.1 The Container

The container is kind of weird. This is because it uses Docker inception.
Because I want to export my application as Docker containers and I also want to setup Jenkins in a container.
I will be building the Docker images from a Docker image.

![docker-inception](/static/images/docker-meme.webp)

This does make the setup a little bit peculiar because doing Docker inside Docker is kind of a bad idea.
That why I'm doing Docker inside Docker but do the Docker stuff on the host machine ...  
This works by passing the Docker Unix socket to the container.
So when Jenkins starts a Docker container it actually starts it on the host machine.  
When executing ``docker ps`` on the host machine, you will also see the containers Jenkins started.  
But for this to work, the container needs to run in privileged mode, because the Jenkins user isn't in the Docker group
and isn't allowed to communicate with Docker socket.  
This can cause some security concerns, but since this container probably never leaves my localhost in this condition, that won't be a huge problem.

```docker
jenkins:
  container_name: lp-jenkins
  # Run in privileged mode so that it can build and start docker containers
  # This isnt the prefered way of doing it :^)
  privileged: true
  build: 
    context: ./jenkins
  environment: 
    - DOCKER_SOCKET=/var/run/docker.sock
    - DOCKER_GROUP=docker
    - JENKINS_USER=jenkins
  ports:
    - 8080:8080
  volumes:
    - lp_jenkins_home:/var/jenkins_home
    - ./jenkins/jenkins.yaml:/var/jenkins_home/jenkins.yaml
    - /var/run/docker.sock:/var/run/docker.sock
```

### 2.2 Configuration

If I have to install all the plugins by hand every time I start a new instance of this container somewhere, I would be wasting allot of time.
Thats why I'm using [the Configuration As Code plugin](https://github.com/jenkinsci/configuration-as-code-plugin).  
This plugins is a easy way of saving your Jenkins configuration in code files that can go in a Git repository.

**The plugins that I use:**
```
configuration-as-code:latest
docker-workflow:latest
workflow-aggregator:latest
github:latest
git:latest
sonar:latest
```

### 2.3 Jenkins File

The build steps are defined in Jenkins file. I'm using the declarative style.  
For each repository I have written a Jenkins file.  
Adding the project just requires adding the URL in Jenkins.
Jenkins can then read the files and knows what to do.

My Jenkins runs in a Docker container and I didn't want to spend time installing extra tools in that container.
Thats why all the building happens inside Docker containers (more Docker inception :)).  
This can however get weird sometimes. Like when I'm building the project but need to connect to a SonarQube container.
Right now I add them to the same network so they can find each other, but its a little bit weird.

**The Jenkins file for the web api:**

```groovy
pipeline {
    agent any
    stages {
	stage('build && SonarQube analysis') {
            steps {
                withSonarQubeEnv('MySonarqubeServer') {
		    script {
			// To lazy to create my own image and this one looks pretty good
			docker.image('nosinovacao/dotnet-sonar:latest').inside("-v ${WORKSPACE}:/source --network cd_lp_network -u root") {
			    sh 'cd /source'
			    sh '''dotnet /sonar-scanner/SonarScanner.MSBuild.dll begin /k:"laserpointer-webapi" /version:buildVersion \
				/d:sonar.host.url="${SONAR_HOST_URL}" /d:sonar.login="${SONAR_AUTH_TOKEN}"'''
			    sh 'dotnet restore'
			    sh 'dotnet build -c Release'
			    sh 'dotnet /sonar-scanner/SonarScanner.MSBuild.dll end /d:sonar.login="${SONAR_AUTH_TOKEN}"'
			}
		    }
                }
            }
        }
        stage("Quality Gate") {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

	stage('Build Images') {
	    steps {
		script {
		    def webapi = docker.build("luukvdm/lp-webapi", "-f ./src/WebApi/WebApi/Dockerfile ./")
		    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
			webapi.push("${env.BUILD_NUMBER}")
			webapi.push("latest")
		    }

		    def identityserver = docker.build("luukvdm/lp-identityserver", "-f ./src/IdentityServer/Dockerfile ./")
		    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
			identityserver.push("${env.BUILD_NUMBER}")
			identityserver.push("latest")
		    }
		}

	    }
	}

    }
}
```

## 3. Static Code Analyses

For static code analyses I'm using [SonarQube](https://www.sonarqube.org/).
I run SonarQube in a container just like Jenkins.  
SonarQube scans for possible vulnerabilities, code smells, bugs, etc.
When SonarQube determines that the code quality is to low, the system won't build the containers.

Setting up SonarQube in Docker does require some tweaking to your system.
SonarQube might give a out of memory exception, to solve this you increate virtual memory by executing ``sudo sysctl -w vm.max_map_count=262144``.

```docker
sonarqube:
  container_name: lp-sonarqube
  image: sonarqube:8-community
  depends_on:
    - db
  environment:
    SONAR_JDBC_URL: jdbc:postgresql://lp-sonarqube-db:5432/sonar
    SONAR_JDBC_USERNAME: sonar
    SONAR_JDBC_PASSWORD: sonar
  ulimits:
    nofile:
      soft: "65536"
      hard: "65536"
  volumes:
    - sonarqube_data:/opt/sonarqube/data
    - sonarqube_extensions:/opt/sonarqube/extensions
    - sonarqube_logs:/opt/sonarqube/logs
    - sonarqube_temp:/opt/sonarqube/temp
  ports:
    - "9000:9000"
  networks:
    lp_network:

db:
  container_name: lp-sonarqube-db
  image: postgres:12
  environment:
    POSTGRES_USER: sonar
    POSTGRES_PASSWORD: sonar
  volumes:
    - postgresql:/var/lib/postgresql
    - postgresql_data:/var/lib/postgresql/data
  networks:
    lp_network:
```


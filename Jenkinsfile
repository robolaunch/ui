pipeline {
  agent {
    kubernetes {
      yaml '''
        apiVersion: v1
        kind: Pod
        metadata: 
          name: kube-pod
        spec:
          containers:
          - name: docker
            image: docker:latest
            imagePullPolicy: Always
            command:
            - cat
            tty: true
            securityContext:
              privileged: true
              runAsUser: 0
            volumeMounts:
            - mountPath: /var/run/docker.sock
              name: docker-sock
          - name: ubuntu
            image: robolaunchio/build-image:1.0
            imagePullPolicy: Always
            command:
            - cat
            tty: true
            env:
            - name: CI
              value: false
          volumes:
          - name: docker-sock
            hostPath:
              path: /var/run/docker.sock
'''
    }
  }
  stages {
    stage('Install Deps') {
      steps {
        container('ubuntu') {
          sh 'npm install -g n'
          sh 'n latest'
        }
      }
    }
    stage('Clone') {
      steps {
        container('ubuntu') {
          git branch: 'main', credentialsId: '7322b7d8-a45e-4594-9bd8-fa1952a7aaad', url: 'git@github.com:robolaunch/ui.git'
          sh """export VER=`grep '"version":' package.json | awk '{print \$2}' | sed 's/"//g' | sed 's/,//'` && echo \$VER > version.txt"""
          script {
            env.VER = readFile('version.txt').trim()
          }
        }
      }
    }
    stage('Build') {
      steps {
        container('ubuntu') {
          withCredentials([file(credentialsId: 'ui_backend_dev', variable: 'text')]) {
            writeFile file:'./.env', text: readFile(text)
          }
          sh 'npm i --force'
          sh 'npm run build'
          sh "tar -zcvf ui-${env.VER}-${env.BUILD_NUMBER}.tar.gz build"
          withCredentials([usernamePassword(credentialsId: '7fadeb6b-976b-40ed-8c7c-20e157b4f81a', passwordVariable: 'password', usernameVariable: 'username')]) {
            sh "curl --fail -u $username:$password --upload-file ui-${env.VER}-${env.BUILD_NUMBER}.tar.gz https://nexus.robolaunch.cloud/repository/ui/"
          }
        }
      }
    }
    stage('Docker Build') {
      steps {
        container('docker') {
          sh "docker build -t robolaunchio/ui-httpd:${env.VER} ."
          withCredentials([usernamePassword(credentialsId: 'dockerhub-robolaunchio', passwordVariable: 'password', usernameVariable: 'username')]) {
            sh 'docker login -u $username -p $password'
          }
          sh "docker push robolaunchio/ui-httpd:${env.VER}"
        }
      }
    }
    stage('Kubernetes Deploy') {
      steps {
        container('ubuntu') {
          withCredentials([file(credentialsId: 'hetzner_prod', variable: 'config')]) {
            sh "kubectl set image deployment.v1.apps/ui -n ui ui=robolaunchio/ui-httpd:${env.VER} --kubeconfig=$config"
          }
        }
      }
    }
  }
    post {
      always {
            emailext to: "tamer@robolaunch.cloud",
            subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
            body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
            attachmentsPattern: '*.html'
      }
    }
}
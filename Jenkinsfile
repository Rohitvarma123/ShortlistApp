pipeline {
    agent any

    stages {

        stage('Git Clone') {
            steps {
                git 'https://github.com/Rohitvarma123/ShortlistApp.git'
            }
        }

        stage('Compile') {
            steps {
                sh 'mvn compile'
            }
        }

        stage('Validate') {
            steps {
                sh 'mvn validate'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Package') {
            steps {
                sh 'mvn package'
            }
        }
    }
}



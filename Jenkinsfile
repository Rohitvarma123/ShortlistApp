pipeline {
    agent any

    environment {
        IMAGE_NAME = "anushajammula/shortlist-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
        SONAR_HOST_URL = "http://192.168.0.8:30474"
        SONAR_TOKEN = "sonar-token"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Anusha-jammula/ShortlistApp.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Angular') {
            steps {
                sh 'npm run build -- --configuration production'
            }
        }

       stage('Debug Docker') {
           steps {
               sh '''
               docker --version
               docker images
              '''
          }
      }
      
        stage('Docker Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
                sh 'docker tag $IMAGE_NAME:$IMAGE_TAG $IMAGE_NAME:latest'
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'anuj-dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push $IMAGE_NAME:$IMAGE_TAG
                    docker push $IMAGE_NAME:latest
                    '''
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh '''
                kubectl set image deployment/shortlist-app shortlist-app=$IMAGE_NAME:$IMAGE_TAG -n anusha-jammula
                kubectl apply -f k8s/deployment.yaml -n anusha-jammula
                kubectl apply -f k8s/service.yaml -n anusha-jammula
                kubectl rollout status deployment/shortlist-app -n anusha-jammula
                '''
            }
        }
    }
}

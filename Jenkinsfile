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

      stage('Build Angular') {
           steps {
            sh '''
            npm install
            npm run build -- --configuration production
            cd dist
            zip -r ../dist.zip .
            '''
       }
    }

    stage('Upload to Nexus') {
          steps {
            // 1. Fetch credentials using the first method pattern
              withCredentials([usernamePassword(
              credentialsId: 'nexus_creds',
              usernameVariable: 'NEXUS_USER',
              passwordVariable: 'NEXUS_PASS'
              )]) {
                 // Uploads directly to your raw or maven hosted repository
                    sh """
                    curl -u \$NEXUS_USER:\$NEXUS_PASS \
                         --upload-file dist.zip \
                         http://192.168.0{BUILD_NUMBER}/angular-project-1.0.${BUILD_NUMBER}.zip
                    """
                   }
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
                # Step 1: Create/Update deployment and service
                kubectl apply -f k8s/deployment.yaml -n anusha-jammula
                kubectl apply -f k8s/service.yaml -n anusha-jammula
                kubectl apply -f k8s/ingress.yaml -n anusha-jammula
        
                # Step 2: Update image
                kubectl set image deployment/shortlist-app shortlist-app=$IMAGE_NAME:$IMAGE_TAG -n anusha-jammula
        
                # Step 3: Wait for rollout
                kubectl rollout status deployment/shortlist-app \
                -n anusha-jammula
                '''
             }
      }
    }
}

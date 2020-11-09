pipeline {
  agent {
    docker {
      image 'node'
    }

  }
  stages {
    stage('Prebuilt') {
      parallel {
        stage('Dependencies') {
          steps {
            sh 'npm ci'
          }
        }

        stage('Information') {
          steps {
            sh 'node -v'
            sh 'npm -v'
          }
        }

      }
    }
    stage('Tests'){
        steps {
            sh 'npm run lint'
        }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
        sh 'node zip dist'
        archiveArtifacts 'dist.zip'
      }
    }

  }
  environment {
    HOME = '.'
  }
}
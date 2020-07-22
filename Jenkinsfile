#!/usr/bin/env groovy

//Please see this guide if running on OpenShift 3.2: https://hubconnect.uhg.com/groups/openshift-enterprise-users-group/blog/2017/07/17/docker-trusted-registry-upgrade-survival-guide
@Library("global-pipeline-library-tmcshane") _
import com.optum.jenkins.pipeline.library.docker.Docker
import com.optum.jenkins.pipeline.library.sonar.Sonar
import com.optum.jenkins.pipeline.library.openshift.OpenShift
import com.optum.jenkins.pipeline.library.utils.Utils

Docker docker = new Docker(this)
Sonar sonar = new Sonar(this)
OpenShift openshift = new OpenShift(this)
Utils utils = new Utils(this)

pipeline {
  agent none
  parameters {
    string(name: 'APP_NAME', defaultValue: "contract-poc", description: 'Empty')
    string(name: 'GIT_URL', defaultValue: "https://github.optum.com/Provider-Onboarding/contract-poc.git", description: 'Empty')
    string(name: 'GIT_BRANCH', defaultValue: "master", description: 'Empty')
    //string(name: 'GIT_COMMIT', defaultValue: "${GIT_COMMIT}", description: 'Empty')
    //string(name: 'FORTIFY_FOLDER', defaultValue: "${FORTIFY_FOLDER}", description: 'Empty')
  }
  environment {

    GIT_CREDENTIALS_ID = 'tmcshane'
    OPENSHIFT_CREDENTIALS_ID = 'tmcshane'
    FORTIFY_CREDENTIALS = 'tmcshane'
    DOCKER_URL = 'docker.repo1.uhc.com'
    DOCKER_ORG = 'provider-onboarding'
    NPM_EMAIL = "thomas.mcshane@optum.com"
    DOCKER_VERSION = "1.11.2"

    DB_DEV_CREDENTIALS_ID = 'null'
    DB_DEV_HOST = 'null'
    DB_TEST_HOST = 'null'
    DB_USER_DEV = 'null'
    DB_USER_TEST = 'null'
    DB_PASSWORD_DEV = 'null'
    DB_PASSWORD_TEST = 'null'
    DB_SCHEMA_DEV = 'null'
    DB_SCHEMA_TEST = 'null'
    ZONE_DEV = 'dev'
    ZONE_TEST = 'test'
    ZONE_STG = 'stage'
    NODE_ENV_DEV = 'dev'
    NODE_ENV_TEST = 'test'

    SPLUNK_FORWARD_SERVER_PORT = 'null'
    SPLUNK_HOME = 'null'
    OPENSHIFT_LOG_DIR = 'null'
    OPENSHIFT_NODEJS_IP = 'null'
    OPENSHIFT_NODEJS_PORT = 'null'

    APP_NAME = "${params.APP_NAME}"

    OPENSHIFT_URL_CTC = 'https://ocp-ctc-dmz-nonprod.optum.com'
    OPENSHIFT_URL_TEST = 'https://ocp-ctc-dmz-stg.optum.com'
    OPENSHIFT_PROJECT_DEV = 'provider-onboarding-dev'
    OPENSHIFT_PROJECT_TEST = 'provider-onboarding-test'
    DEPLOY_TEMPLATE = './JPaC/tl_pipelinepoc_nodejs6.json'
    DOCKER_TAG = 'dev'
    DOCKER_TAG_DEV = 'dev'        //this will be used for ENV var in application
    DOCKER_TAG_STAGE = 'stage'

    DOCKER_REPO = "${APP_NAME}"
    DOCKER_LOCAL_NAME = "${DOCKER_ORG}/${DOCKER_REPO}"
    DOCKER_DAEMON_FLAGS = " "
    DOCKER_CREDENTIALS_ID = 'tmcshane'
    TEST_APPROVERS_STRING = "vpatel30,rpulchny,bbudak,tmcshane,pmistry2"

    //FORTIFY_FOLDER = "${params.FORTIFY_FOLDER}"
    GIT_URL = "${params.GIT_URL}"
    GIT_BRANCH = "${params.GIT_BRANCH}"
    //GIT_COMMIT = "${params.GIT_COMMIT}"
    OPENSHIFT_PROJECT_URL_DEV = "http://${APP_NAME}-${OPENSHIFT_PROJECT_DEV}.${OPENSHIFT_URL_NO_PROTOCOL}"
    DEVOPS_METRICS_ENABLED = 'false'
  }
  stages {
    stage('Checkout'){
      agent { label 'docker-nodejs-oc' }
      steps {
        git branch: GIT_BRANCH, credentialsId: GIT_CREDENTIALS_ID, url: GIT_URL
        sh 'git rev-parse HEAD > commit'
        script {
          stash name: 'source'
          pipelineVersion = "${APP_NAME}-${env.BUILD_NUMBER}"
          currentBuild.displayName = pipelineVersion
          currentBuild.description = pipelineVersion
          //def commit_id = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%H'")
          def authorEmail = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%ae'")
          def authorName = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%an'")
          //env.GIT_COMMIT = commit_id
          env.AUTHOR_EMAIL = authorEmail
          env.AUTHOR_NAME = authorName
        }
      }
    }
    stage('Check for Optumfile'){
      agent { label 'docker-nodejs-oc' }
      steps{
        script{
          unstash 'source'
          sh 'ls > optumFileCheck.txt'
          def fileCheck = readFile('optumFileCheck.txt').trim()
          if(fileCheck.contains("Optumfile.yml")){
            println "Optumfile Found - Continuing with build."
            currentBuild.result = 'SUCCESS'
          }else{
            println "No Optumfile found. Pushing Optumfile to project and retriggering build."
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: GIT_CREDENTIALS_ID, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USER']]) {
              git branch: GIT_BRANCH, credentialsId: GIT_CREDENTIALS_ID, url: GIT_URL
              sh """
                echo 'apiVersion: v1' >> Optumfile.yml
                echo 'metadata:' >> Optumfile.yml
                echo '  askId: poc' >> Optumfile.yml
                echo '  caAgileId: poc' >> Optumfile.yml
                echo '  projectKey: com.optum.prvonboarding:${APP_NAME}' >> Optumfile.yml
                echo '  projectFriendlyName: ${APP_NAME}' >> Optumfile.yml
                echo '  componentType: CODE' >> Optumfile.yml
                echo '  targetQG: GATE_00' >> Optumfile.yml
              """
              sh 'git add Optumfile.yml'
              sh 'git config user.email "thomas.mcshane@optum.com"'
              sh 'git config user.name "tmcshane"'
              sh 'git config push.default matching'
              sh 'git commit --author="tmcshane <thomas.mcshane@optum.com>" -m "Added Optumfile.yml"'
              def orgSplit = GIT_URL
              result = orgSplit.split('github.optum.com')
              result = result[1]
              print result
              sh "git push https://${GIT_USER}:${GIT_PASSWORD}@github.optum.com$result $GIT_BRANCH"
            }
            currentBuild.result = 'UNSTABLE'
          }
        }
        /*
        script {
          def appNameTemp = "$APP_NAME"
          if(!appNameTemp.contains("dbaas")){
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: GIT_CREDENTIALS_ID, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USER']]) {
              withEnv([
                      'NPM_TOKEN=aWVsX3N2Y191c2VyOkFQOWtiVFJVbUJWRVFpUDZaVGZTaDFpWG14eQ==',
                      'NPM_AUTH_KEY=aWVsX3N2Y191c2VyOkFQOWtiVFJVbUJWRVFpUDZaVGZTaDFpWG14eQ==',
                      "NODEJS_VERSION=10.13.0",
                      'NPM_EMAIL=scott.lovenberg@optum.com']) {
                def npmPullRegistry = 'http://repo1.uhc.com/artifactory/api/npm/npm-remote/'
                sh(". /etc/profile.d/jenkins.sh && npm install yarn --registry ${npmPullRegistry} && ./node_modules/yarn/bin/yarn install")
                sh('. /etc/profile.d/jenkins.sh && npm run test-coverage')
                sh('. /etc/profile.d/jenkins.sh && ls')
                sh('. /etc/profile.d/jenkins.sh && cd coverage && cd lcov-report && ls index.html')
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'coverage/lcov-report', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
              }
            }
          }else{
            println "Skipping Tests"
          }
        }
        */
      }
    }
    stage ('Sonar Scan & Docker Image Build'){
      agent { label 'docker-nodejs-oc' }
      when {
        beforeAgent true
        expression { currentBuild.result == 'SUCCESS' }
      }
      steps{
        parallel(
                "Sonar" : {
                  script{
                    unstash 'source'
                    println "sonar disabled temp"
                    //glSonarScan gitUserCredentialsId: "$GIT_CREDENTIALS_ID", sources: ".", sonarProjectVersion: "${env.BUILD_NUMBER}",
                    //sonarServer: 'sonar.optum', scmRepoUrl: "$GIT_URL", sonarExclusions: "src/index.scss", branchName: "master"

                    //projectKey: "com.uhg.optum.mppui:mppappui", projectFriendlyName: "MPP UI", scmRepoUrl: "$GIT_URL", targetQG: 'GATE_00', branchName: "master"
                  }
                },
                "Build Docker Image" : {
                  unstash 'source'
                  script {
                    def params = [:]
                    params['dockerCredentialsId'] = "$DOCKER_CREDENTIALS_ID"
                    params['namespace'] = "$DOCKER_ORG"
                    params['repository'] = "$DOCKER_REPO"
                    params['dockerHost'] = 'docker.repo1.uhc.com'
                    docker.createDockerRepository params
                  }
                  script {
                    def now = new Date()
                    env.TIMESTAMP = now.format("yyyyMMdd-HH-mm-ss", TimeZone.getTimeZone('EST'))
                    docker.buildDockerImage tag: "$DOCKER_URL/$DOCKER_LOCAL_NAME:$env.TIMESTAMP", dockerCredentialsId: "$DOCKER_CREDENTIALS_ID", dockerHost: 'docker.repo1.uhc.com'
                    docker.pushDockerImage tag: "$DOCKER_URL/$DOCKER_LOCAL_NAME:$env.TIMESTAMP", dockerCredentialsId: "$DOCKER_CREDENTIALS_ID", dockerHost: 'docker.repo1.uhc.com'
                  }
                }
        )
      }
    }
    stage ('Deploy To Dev'){
      agent { label 'docker-nodejs-oc' }
      when {
        beforeAgent true
        expression { currentBuild.result == 'SUCCESS' }
      }
      steps{
        unstash 'source'
        script {
          def properties = readProperties file: 'propsfile.txt'
          def template = properties['TEMPLATE']
          template.trim()
          git branch: 'master', url: 'https://github.optum.com/Provider-Onboarding/Onboarding-Templates.git'
          glOpenshiftDeploy credentials: "$OPENSHIFT_CREDENTIALS_ID", ocpUrl: "$OPENSHIFT_URL_CTC",
                  project: "$OPENSHIFT_PROJECT_DEV", serviceName: "$APP_NAME",
                  dockerImage: "$DOCKER_URL/$DOCKER_LOCAL_NAME:$env.TIMESTAMP",
                  wait: true, template: template, zone: "$ZONE_DEV", nodeEnv: "$NODE_ENV_DEV", tag: "$env.TIMESTAMP", appName: "${APP_NAME}"
        }
      }
    }
  }
  post {
    always {
      echo 'This will always run'
    }
    success {
      echo 'This will run only if successful'
    }
    failure {
      echo 'This will run only if failed'
    }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
}

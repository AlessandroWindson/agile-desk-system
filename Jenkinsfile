// 🚀 Pipeline CI/CD para HelpDesk Pro

pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-u root'
        }
    }

    environment {
        NPM_TOKEN = credentials('npm-token')
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        KUBECONFIG = credentials('kubeconfig')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/seu-usuario/helpdesk-pro.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'cd backend && npm install'
            }
        }

        stage('Build') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        sh 'npm run build'
                    }
                }
                stage('Build Backend') {
                    steps {
                        sh 'cd backend && npm run build'
                    }
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Test Frontend') {
                    steps {
                        sh 'npm run test'
                    }
                }
                stage('Test Backend') {
                    steps {
                        sh 'cd backend && npm run test'
                    }
                }
                stage('Test Email Configuration') {
                    steps {
                        script {
                            def emailTest = sh(
                                script: "cd backend && node -e 'require(\"./src/services/emailService.js\").sendEmail({\n" +
                                "  to: \"test@example.com\",\n" +
                                "  subject: \"Test Email Configuration\",\n" +
                                "  html: \"<h1>Email Configuration Test</h1>\"\n" +
                                "}).catch(console.error)'",
                                returnStatus: true
                            )
                            if (emailTest != 0) {
                                error 'Email configuration test failed'
                            }
                        }
                    }
                }
                stage('Test Agendamento') {
                    steps {
                        script {
                            def agendamentoTest = sh(
                                script: "cd backend && node -e 'require(\"./src/controllers/agendamentoController.js\").criarAgendamento({\n" +
                                "  usuario_id: \"test-user-id\",\n" +
                                "  chamado_id: \"test-ticket-id\",\n" +
                                "  data_agendamento: \"2025-06-07T10:00:00Z\",\n" +
                                "  tipo_servico: \"Teste\",\n" +
                                "  descricao: \"Teste de agendamento\",\n" +
                                "  tecnico_id: \"test-tech-id\"\n" +
                                "}).catch(console.error)'",
                                returnStatus: true
                            )
                            if (agendamentoTest != 0) {
                                error 'Agendamento test failed'
                            }
                        }
                    }
                }
            }
        }

        stage('Docker Build') {
            parallel {
                stage('Build Frontend Docker') {
                    steps {
                        script {
                            docker.build("helpdesk-pro/frontend:${env.BUILD_ID}")
                        }
                    }
                }
                stage('Build Backend Docker') {
                    steps {
                        script {
                            docker.build("helpdesk-pro/backend:${env.BUILD_ID}")
                        }
                    }
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        docker.image("helpdesk-pro/frontend:${env.BUILD_ID}").push()
                        docker.image("helpdesk-pro/backend:${env.BUILD_ID}").push()
                    }
                }
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                script {
                    withKubeConfig([credentialsId: 'kubeconfig']) {
                        sh 'kubectl apply -k k8s/deployment'
                        sh 'kubectl apply -k k8s/services'
                        sh 'kubectl apply -k k8s/ingress'
                    }
                }
            }
        }
    }

    post {
        success {
            slackSend(
                color: 'good',
                message: "Deploy bem-sucedido para HelpDesk Pro - Build #${env.BUILD_NUMBER}"
            )
        }
        failure {
            slackSend(
                color: 'danger',
                message: "Falha no deploy HelpDesk Pro - Build #${env.BUILD_NUMBER}"
            )
        }
    }
}
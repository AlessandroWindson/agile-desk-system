# 🚀 Configurações Kubernetes para HelpDesk Pro

Este diretório contém toda a configuração necessária para deploy do HelpDesk Pro em um cluster Kubernetes.

## 📁 Estrutura de Arquivos

```
k8s/
├── deployment/
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   └── supabase-deployment.yaml
├── services/
│   ├── backend-service.yaml
│   ├── frontend-service.yaml
│   └── supabase-service.yaml
├── ingress/
│   └── ingress.yaml
├── configmaps/
│   ├── backend-configmap.yaml
│   └── frontend-configmap.yaml
└── secrets/
    ├── backend-secrets.yaml
    └── supabase-secrets.yaml
```

## 🚀 Deploy

Para deploy no Kubernetes, siga estes passos:

1. Configure suas variáveis de ambiente no `configmaps/` e `secrets/`
2. Aplique a configuração:
```bash
kubectl apply -k .
```

## 📋 Requisitos

- Kubernetes cluster configurado
- kubectl instalado
- Helm (para deploy do Supabase)
- Cert-manager (para certificados SSL)

## 🔐 Segurança

- Todas as credenciais devem estar em `secrets/`
- Configurações sensíveis devem usar Vault ou similar
- Use RBAC para controle de acesso

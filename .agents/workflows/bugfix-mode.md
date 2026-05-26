---
description: Ativa o modo de manutenção e guia correção cirúrgica de código existente
---

# /bugfix-mode — Modo de Manutenção e Correção

## Objetivo

Guiar o agente na **edição cirúrgica** de código existente, garantindo que nenhuma mudança além do escopo solicitado seja introduzida.

---

## Passos

### 1. Ativar Modo Manutenção (§5.5 do GEMINI.md)

Confirmar que o pedido se enquadra em um dos gatilhos:
- "corrija", "ajuste", "conserte", "altere", "bug", "erro", "problema"

Se confirmado, ativar **Modo Manutenção** imediatamente.

---

### 2. Mapeamento do Problema

Antes de alterar qualquer arquivo, executar:

- [ ] Identificar **qual arquivo(s)** está(ão) envolvido(s)
- [ ] Identificar **qual linha ou bloco** contém o problema
- [ ] Descrever em uma frase o **comportamento atual** vs. o **comportamento esperado**

---

### 3. Validação Pré-Intervenção (§9 do GEMINI.md)

Executar obrigatoriamente:

1. **Confirmar entendimento** — resumir o que foi solicitado
2. **Listar premissas** — o que está sendo assumido
3. **Listar dúvidas** — qualquer ambiguidade antes de agir
4. **Confirmar contexto do projeto** — nome do sistema, stack adotada

---

### 4. Regras de Intervenção Cirúrgica

Ao modificar o código:

- ✅ Alterar **apenas** o necessário para resolver o problema
- ✅ Preservar nomenclatura, indentação e padrão existentes
- ✅ Não introduzir novas dependências
- ❌ Não refatorar além do escopo
- ❌ Não renomear variáveis ou funções que não sejam parte do bug

---

### 5. Registro de Alteração

Ao finalizar, documentar:

```
Arquivo alterado: [nome do arquivo]
Linha(s) modificada(s): [número ou intervalo]
Motivo: [descrição do bug]
Solução aplicada: [descrição da correção]
Impacto colateral: [nenhum / descrever se houver]
```

---

### 6. Verificação Pós-Correção

- [ ] O comportamento esperado foi atingido?
- [ ] Algum outro componente foi afetado?
- [ ] A stack e padrão visual foram preservados?

Se qualquer item falhar → **retornar ao passo 2**.

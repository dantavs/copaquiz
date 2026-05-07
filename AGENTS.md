<!-- BEGIN:system-agent-rules -->
# Diretrizes Globais do Sistema

1. **PROIBIÇÃO DE DEPLOY AUTÔNOMO:** NUNCA execute comandos `git commit` ou `git push` sem a autorização EXPLÍCITA do usuário. 
2. **TESTE LOCAL OBRIGATÓRIO:** NUNCA peça aprovação de deploy (nem tente fazer) sem antes rodar `npm run build` e garantir que não há erros.
3. **Padrões de Código:** Next.js + Vanilla CSS. Priorizar design premium e responsivo (Glassmorphism).

---

# Sistema de Agentes Especializados

Para garantir que cada etapa seja feita com o máximo de cuidado, assuma o papel do Agente apropriado conforme a solicitação do usuário. Se o usuário não especificar, identifique a fase do projeto e declare qual agente você está assumindo antes de começar.

## 1. 🧠 Agente Planner (Planejamento)
- **Objetivo:** Analisar requisitos, explorar arquiteturas e criar um `implementation_plan.md`.
- **Regras:**
  - NÃO ESCREVE CÓDIGO (exceto pseudo-código no plano).
  - Sempre levanta "Open Questions" antes de aprovar o plano.
  - Verifica impacto no SEO e na arquitetura existente.

## 2. 💻 Agente Dev (Desenvolvimento)
- **Objetivo:** Escrever o código, criar componentes e realizar integrações.
- **Regras:**
  - Segue ESTRITAMENTE o `implementation_plan.md`.
  - Testa tudo localmente com `npm run dev` ou `npm run build` após terminar as alterações.
  - **PROIBIDO** usar `git push` ou fazer deploy. Seu trabalho termina quando o código compila e funciona localmente.

## 3. 🚀 Agente Deploy (Operações)
- **Objetivo:** Fazer versionamento, gerar mensagens de commit semânticas e enviar para produção (Vercel).
- **Regras:**
  - Só entra em ação quando o usuário disser explicitamente: "Pode fazer o deploy" ou "@Deploy".
  - Verifica o status do build local (`npm run build`) antes do push. Se houver erro, devolve para o Agente Dev.
  - Executa `git add .`, `git commit -m "..."` e `git push`.
  - **POS-DEPLOY:** Após fazer o push, o Agente DEVE confirmar com o usuário se o build de produção na Vercel foi bem-sucedido. Caso o usuário reporte que a build falhou, o Agente DEVE imediatamente realizar um rollback (ex: `git revert` ou reset) e devolver o problema para o Agente Dev analisar.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
<!-- END:system-agent-rules -->

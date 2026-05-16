# TASK-013: Entrar em álbum compartilhado

## Description
Criar funcionalidade para que um usuário entre em um álbum compartilhado por outro, seja via input manual de código ou via link com query param. O sistema deve fazer merge do estado da coleção.

## Acceptance Criteria
- [ ] Página `/collector/join` com input de código e botão "Entrar"
- [ ] Rota automática via query param: `/collector/join?code=XXXXXX` já carrega o código
- [ ] Código válido carrega o estado do álbum na coleção local do usuário
- [ ] Se o álbum já existe localmente com o mesmo código, fazer merge (manter a maior quantity de cada sticker)
- [ ] Código inválido mostra mensagem de erro amigável ("Código não encontrado")

## Status
- Status: Review
- Priority: Medium
- Assignee: @developer

## Notes
- Fase D — Compartilhamento
- Depende de TASK-012 (geração de código de compartilhamento)
- Merge: para cada sticker, manter `max(quantity_local, quantity_compartilhada)`

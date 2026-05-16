# TASK-012: Compartilhar álbum via link/código

## Description
Implementar funcionalidade de compartilhamento de álbum, gerando um código único de 6 caracteres que pode ser copiado para a área de transferência e enviado para outro usuário.

## Acceptance Criteria
- [ ] Botão "Compartilhar" no álbum gera um código alfanumérico único de 6 caracteres
- [ ] O código é exibido na tela para o usuário copiar
- [ ] Botão "Copiar Link" copia `URL/collector/join?code=XXXXXX` para a área de transferência
- [ ] Feedback visual (toast/mensagem) confirmando que o link foi copiado
- [ ] Códigos são únicos por álbum

## Status
- Status: Done
- Priority: Medium
- Assignee: @developer

## Notes
- Fase D — Compartilhamento
- Depende de TASK-010 (álbuns funcionais)
- Código pode ser gerado com Math.random + timestamp + hash simples
- Por enquanto, sem backend: usaremos localStorage e a store Zustand para simular

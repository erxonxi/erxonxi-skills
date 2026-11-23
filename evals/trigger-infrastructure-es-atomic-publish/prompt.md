---
name: trigger-infrastructure-es-atomic-publish
tags: [trigger, skill-infrastructure]
runs: 2
max_turns: 3
timeout_seconds: 120
---
Necesito guardar el agregado en Postgres y publicar su evento de dominio sin perder ninguno si el proceso se cae entre medias. ¿Cómo lo hago?

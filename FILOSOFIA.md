# Filosofía de ingeniería

Cómo diseño, modelo, nombro, estructuro y pruebo el código, escrito para que valga en cualquier lenguaje y para dárselo a agentes de código.

El detalle operativo vive en las doce skills de `skills/`. Este documento explica el porqué y el conjunto.

## 1. La idea central

El código se organiza alrededor del negocio y no de la tecnología. Las reglas del negocio viven en un núcleo que no sabe nada de frameworks, bases de datos ni protocolos, y todo lo demás es un detalle sustituible que se conecta a ese núcleo por contratos pequeños. Cada pieza tiene un nombre que dice lo que hace y un único sitio donde vivir, de modo que la estructura de carpetas se lee como el índice del negocio.

Sobre esa base hay una segunda idea igual de fuerte: la complejidad se gana. Se empieza por lo más simple que funciona y se sube un peldaño solo cuando el anterior duele y se ha medido.

## 2. Los principios

### 1. El negocio manda en la estructura

La ruta de un fichero dice primero de qué área de negocio es (`shop`, `catalog`, `notifications`), después de qué concepto (`users`, `products`) y solo al final qué papel técnico cumple (`domain`, `application`, `infrastructure`). Un módulo se llama como su agregado, en plural. Una carpeta por caso de uso.

Por qué: quien llega al proyecto entiende qué hace el sistema antes de saber con qué está hecho, y un cambio de negocio toca un sitio.

### 2. Las dependencias apuntan hacia dentro

`infrastructure → application → domain`. El dominio no importa nada técnico. La aplicación orquesta sin saber de HTTP ni de SQL. La infraestructura implementa los puertos que el dominio declara.

Por qué: las reglas se pueden probar sin levantar nada, y cambiar de base de datos o de framework no toca el negocio. Y no se confía en la disciplina: la regla se comprueba con lint de imports, tests de arquitectura o el grafo del build.

### 3. Un caso de uso, una clase, un nombre de agente

`UserRegistrar`, `ProductFinder`, `ProductsSearcher`, `WelcomeEmailSender`. Una clase, un método público, sus puertos por constructor, primitivos de entrada y primitivos o un DTO de salida. Los controladores son finos: parsean, llaman, serializan y traducen errores.

Por qué: el listado de carpetas de `application` es el catálogo de lo que el sistema sabe hacer. Nombres como `Manager`, `Helper` o `Service` no dicen nada y acaban acumulando de todo.

### 4. Los objetos se protegen solos

Un value object inválido no se puede construir. Un agregado tiene el constructor privado, se crea con un constructor con nombre (`create`) que registra el hecho, se reconstruye con `fromPrimitives` y se serializa con `toPrimitives`. No hay setters: el estado cambia con verbos del negocio (`rename`, `archive`, `publish`).

Cada regla vive en un único sitio, lo más adentro posible: value object, después agregado, después servicio de dominio, después caso de uso.

Por qué: si una regla se puede saltar construyendo el objeto de otra forma, no es una regla.

### 5. Los hechos del negocio son eventos

Lo que pasa se nombra en pasado y con vocabulario de negocio (`UserRegisteredDomainEvent`, mensaje `acme.shop.user.registered`). El agregado registra el evento, el caso de uso lo publica después de guardar, y cada reacción es un suscriptor con nombre propio (`SendWelcomeEmailOnUserRegistered`) que delega en otro caso de uso.

Por qué: el caso de uso principal no conoce sus efectos secundarios, añadir una reacción es añadir una clase, y los contextos se enteran de lo que pasa sin acoplarse entre sí. El precio se asume de forma explícita: entrega al menos una vez, sin orden garantizado, consumidores idempotentes y consistencia eventual.

### 6. Los errores tienen nombre

Una clase por condición de negocio (`UserDoesNotExistError`), con datos estructurados. Nada de errores genéricos, códigos, `null` como fallo ni decisiones por el texto del mensaje. Se lanzan en el dominio y se traducen a protocolo únicamente en el borde, con un mapeo exhaustivo. El nombre del error es parte del contrato público de la API.

Por qué: propagar `Result`/`Either` por todas las capas cuesta más de lo que aporta en la mayoría de lenguajes. De esa alternativa se conserva lo valioso: la exhaustividad en el mapeo del borde. En lenguajes cuyo idioma son los valores de error, se usan con el mismo criterio de nombres.

### 7. Los contextos no se tocan por dentro

Un contexto nunca importa el dominio ni la infraestructura de otro. Colaboran por eventos, o mediante un puerto que declara el consumidor con la forma que él necesita y que se adapta a un caso de uso público del proveedor. Cada contexto tiene su propia visión de un concepto ajeno y copia el dato que necesita recordar en el momento del hecho. El shared kernel es diminuto y no contiene reglas.

Por qué: es lo que permite que un contexto cambie, se extraiga o se reescriba sin arrastrar a los demás. Por eso mismo se acepta duplicación entre contextos: dos trozos iguales que representan conceptos distintos cambiarán por motivos distintos.

### 8. Se testea el comportamiento, una vez, en el nivel más bajo

- Unitario: un caso de uso por su API pública, con el dominio real y sus puertos sustituidos.
- Integración: cada adaptador contra la tecnología real.
- Aceptación: pocos, uno por objetivo de usuario, con la aplicación cableada. No uno por endpoint.

Todos los datos salen de Object Mothers. Los dobles son implementaciones de los puertos propios con vocabulario de intención (`shouldSave`, `shouldPublish`). Los tests se nombran como frases (`UserRegistrar should` / `register a valid user`). Tiempo, ids y aleatoriedad son puertos controlables.

Por qué: tests que sobreviven a los refactors porque afirman resultados en los límites y no detalles internos. No se mockea lo que no es propio, no se prueba lo mismo en tres niveles y no se persigue un porcentaje de cobertura.

### 9. Diseño simple antes que diseño listo

Las cuatro reglas en orden: pasa los tests, revela la intención, no duplica el mismo concepto, tiene los mínimos elementos. En la práctica: guardas y retorno temprano, sin banderas booleanas, sin parámetros por defecto, tell don't ask, clases cerradas e inmutables por defecto, composición antes que herencia, comentarios solo para el porqué.

Y YAGNI de verdad: no hay interfaz por cada clase, ni fábrica para un caso, ni patrón sin la fuerza que lo justifica. Una interfaz se gana cruzando un límite de entrada/salida o teniendo una variación real.

### 10. La complejidad se sube por escalera

Casi todas las decisiones de infraestructura tienen forma de escalera, y la regla es no saltarse peldaños:

| Tema | Peldaños |
|---|---|
| Bus de eventos | en memoria → la base de datos como bus → broker |
| Modelo de lectura | join → vista → vista materializada → proyección por eventos |
| Transacción | repositorio → decorador del caso de uso → punto de entrada / `UnitOfWork` |
| Caché | caché HTTP → decorador sobre un puerto |
| Organización | módulo → contexto → servicio |
| Frontend | por funcionalidad → núcleo hexagonal solo donde hay reglas |
| Memoria de agentes | `AGENTS.md` → docs → skills → lint y hooks → specs |
| Alcance de producto | probar sin construir → MVP → iterar con datos |

### 11. Lo comprobable se comprueba, no se escribe

Formato, dependencias entre capas, parámetros por defecto, tamaño de los PR, formato de los commits: todo lo que una máquina puede verificar se convierte en regla de lint, test de arquitectura, hook o check de CI, con un mensaje que dice cómo arreglarlo. La prosa queda para lo que no se puede automatizar, y para el porqué.

Un check nuevo es un error desde el primer día para el código nuevo. El código que ya lo incumple entra en una lista de exenciones que solo puede encoger, así que adoptar una regla nunca espera a una migración. Un check cuenta solo cuando se ha visto fallar con una violación y pasar en el repositorio.

Por qué: un agente olvida un documento, lo malinterpreta o nunca lo carga. No puede ignorar un build en rojo. Cada corrección que un humano tiene que repetir es un check que nunca se escribió.

### 12. Pasos pequeños y verificados

TDD caso de uso a caso de uso. Refactor en pasos mínimos con los tests en verde y sin mezclarlo con cambios de comportamiento. PR pequeños contra un único tronco. Con agentes, lo mismo a otra escala: planes en rebanadas verticales, una fase por vez, verificación y parada para revisión humana al final de cada una.

### 13. El plan sigue las mismas reglas que el código

YAGNI y KISS se aplican a qué se construye, no solo a cómo. Un plan es una hipótesis con un resultado medible, un presupuesto de tiempo y una regla sobre qué pasa si el número no se mueve. Se recorta a la versión más pequeña que pueda confirmarla o refutarla, se trocea en rebanadas verticales que se entregan solas, se ordena para que vaya primero lo que desbloquea y lo que enseña, y se instrumenta para que la siguiente decisión salga de los datos.

Por qué: el código más barato es el que nunca hizo falta, y la única forma de saberlo es entregar algo pequeño y mirar qué pasa. Estimaciones, fórmulas de puntuación, backlogs largos y roadmaps con fechas se quedan fuera hasta que su ausencia duela.

### 14. Decidir, delegar, evaluar

La persona decide, el agente ejecuta, la máquina juzga. Las decisiones se toman donde son más baratas de cambiar: en contratos y fases, antes de que exista código. La ejecución entre dos decisiones se delega, con un brief lo bastante preciso para poder comprobar el resultado contra él. La evaluación va por orden de coste: primero los checks, después un revisor independiente que ve el cambio y no la conclusión del autor, y al final la persona, que juzga el resultado con evidencia (antes y después, la misma entrada en los dos lados) en lugar de leer cada línea.

Por qué: implementar dejó de ser el cuello de botella. La revisión es la parte en serie, así que es la que merece automatizarse y la que merece protegerse. Quien lee líneas revisa unos pocos cambios al día. Quien lee evidencia sobre checks en verde revisa muchos, y cada corrección se convierte en un check que acorta la siguiente revisión.

## 3. Cómo se trabaja con agentes

Lo anterior, convertido en forma de trabajo para agentes de código.

- **Memoria por capas.** Un `AGENTS.md` raíz corto con comandos, arquitectura en pocas líneas y un mapa de `docs/`, con la orden explícita de no leer todos los docs al empezar. Convenciones en `docs/`, un fichero corto por convención: la regla, el porqué y el check que la hace cumplir. Procedimientos en skills. Todo lo comprobable en tipos, lint, tests de arquitectura y hooks.
- **Investigar, planificar, implementar**, con una puerta humana en cada paso. La exploración se delega en subagentes con modelos baratos. El plan no se escribe hasta acordar fases y contratos.
- **El plan lleva su estado.** Un fichero (o una issue padre con una hija por fase) cuyas casillas dicen qué está hecho, para que cualquier agente o sesión lo retome. La fase actual es la primera con trabajo pendiente.
- **Delegar lleva un brief.** Un subagente recibe los contratos literales, los ficheros que posee, el patrón a copiar, el comando de verificación y sus límites. Su informe es una afirmación a comprobar, no una prueba. Agentes en paralelo solo en fases de la misma ola, con ficheros disjuntos.
- **Contratos públicos en el plan**: firmas de casos de uso, eventos, suites de test con sus casos, esquema y textos de interfaz. Se revisa el qué antes de escribir el cómo.
- **Specs como promesa**: `SHALL`, un comportamiento por requisito, valores concretos, solo lo observable.
- **Evaluar antes de leer**: comando de verificación, contratos contra el diff, un revisor independiente sin la conclusión del autor y evidencia del resultado. La descripción siempre dice qué no se comprobó.
- **El agente no hace commit por su cuenta**: propone mensajes y espera.
- **Copiar el patrón vecino** es la forma por defecto de trocear trabajo: cada tarea cita el código existente a imitar.

## 4. Decisiones por defecto

Puntos donde hay varias opciones razonables y esta es la elegida. Son lo primero que cambiar si un proyecto pide otra cosa.

| Tema | Opción por defecto |
|---|---|
| Nombre del método del caso de uso | Nombre de la acción, o el idioma del lenguaje, uniforme por proyecto |
| Command/query bus | No por defecto. Bus de eventos sí |
| `find` que no encuentra | `search` puede no encontrar, `find` lanza |
| Entrada del caso de uso | Primitivos |
| Errores | Excepciones tipadas, o el idioma de errores del lenguaje |
| Puertos | Lo que pida el lenguaje y su inyección |
| Ids y restricciones SQL | El id lo genera el cliente; crear con un id que ya existe nunca sobrescribe. El tipo de columna lo marca el proyecto |
| Mocks | Clase escrita a mano o ayudante genérico, siempre con vocabulario `should*` |
| Tests de dominio aislados | Cubrir por caso de uso. Casos extra solo por particiones y límites |
| Commit del agente | No hacer commit sin que lo pida el usuario |
| Subagente revisor | Contexto limpio, el diff y los contratos, nunca la conclusión del autor. Sus hallazgos solo se reportan con su prueba. El veredicto es no listo, listo con puntos abiertos, o listo |
| Dónde vive un plan | `.agents/plans/<fecha>-<slug>.md`, o issues cuando el equipo trabaja en un gestor |
| Violaciones existentes de un check nuevo | Una lista de exenciones por fichero o símbolo, que solo encoge |
| Una corrección del usuario | Se convierte en check. Un doc corto solo cuando ningún check puede ser exacto |
| Subagentes de exploración | Con contexto. A ciegas como técnica opcional |
| Dónde vive un evento compartido | En el contexto emisor |
| Roadmap | Ahora, Siguiente, Más adelante. Sin fechas salvo que sean reales y externas |
| Estimaciones | Ninguna. Se ajusta el tamaño de las rebanadas y se pronostica con el ritmo de entrega |
| Priorización | Por argumento: qué desbloquea, qué enseña, qué cuesta más retrasar. Sin fórmula de puntuación |

## 5. Lo que deliberadamente no se hace

- Lógica de negocio en controladores, componentes o SQL.
- Modelos anémicos con setters, ni anotaciones de ORM en el dominio.
- Importar el dominio de otro contexto, ni un shared kernel con reglas.
- Eventos genéricos de "actualizado" con todo el estado.
- Transacciones distribuidas o commit en dos fases.
- Un broker, una caché o una proyección antes de que duela.
- Mockear librerías de terceros u objetos de dominio.
- Tests E2E de navegador como estrategia base, ni objetivos de cobertura.
- Interfaces, fábricas y patrones sin variación real. Singletons.
- Arquitectura hexagonal en una interfaz sin reglas.
- Discutir formato a mano.
- Checks como warnings, checks que adivinan, o tocar un check o su lista de exenciones para que un cambio pase.
- Dejar que un agente lea toda la documentación, implemente varias fases seguidas o haga commit sin revisión.
- Dar por hecho un check, un test o una revisión que no se ejecutó, o evidencia de un efecto secundario en lugar del cambio.
- Puntos de historia, objetivos de velocidad, backlogs como inventario, tickets horizontales, ni entregar sin una señal.

## 6. Las skills

| Skill | Cuándo se carga |
|---|---|
| `erxonxi-architecture` | Crear o reorganizar proyecto, módulo, caso de uso o endpoint. Decidir dónde va un fichero |
| `erxonxi-domain-modeling` | Diseñar agregados, value objects, eventos, errores, repositorios o consultas |
| `erxonxi-testing` | Escribir o revisar tests, elegir nivel, preparar datos y dobles |
| `erxonxi-clean-code` | Nombrar, escribir funciones y clases, refactorizar, decidir si un patrón está justificado |
| `erxonxi-infrastructure` | Repositorios, bus de eventos, transacciones, caché, proyecciones, esquema |
| `erxonxi-frontend` | Componentes, estado, estilos, cuánta arquitectura poner en cliente |
| `erxonxi-workflow` | Organizar cómo trabaja un agente en un proyecto: el ciclo, capas de memoria, `AGENTS.md`, specs, commits, andamiaje |
| `erxonxi-plan` | Planificar una tarea no trivial: investigación, decisiones, fases con contratos, olas |
| `erxonxi-implement-phase` | Implementar, continuar o retomar una fase de un plan |
| `erxonxi-evaluate` | Una fase o un cambio está terminado: checks, contratos, revisión independiente, evidencia, texto de commit o PR |
| `erxonxi-rule` | Tras una corrección, o para hacer cumplir una convención: convertirla en check con una lista de exenciones que encoge |
| `erxonxi-roadmap` | Montar o revisar un roadmap, bajar un plan a tickets, ordenar y paralelizar trabajo, acotar un MVP, decidir tras una entrega |

Todas empiezan por la misma regla: la convención existente del proyecto gana, y la skill decide solo cuando no hay precedente.

`AGENTS-snippet.md` contiene el núcleo en formato corto, para pegarlo en el fichero de instrucciones global de un agente.

## 7. Cautelas

- Los "por qué" son razonamiento, no dogma. Si un proyecto tiene una buena razón para hacerlo de otra forma, gana el proyecto.
- Las skills dan forma, no código: comprueba siempre que una implementación entrega la garantía que nombra (atomicidad, idempotencia, invalidación).

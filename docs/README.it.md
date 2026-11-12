# Oikoumene

*Il mondo abitato, dal 500 a.C. al 2000, su una sola mappa che si scorre nel tempo.*

[**Apri la mappa**](https://oikoumene.pages.dev) · [English](../README.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [中文](README.zh.md)

---

**Oikoumene** (οἰκουμένη, *oi-ku-MÈ-ne*) era la parola greca per «il mondo abitato»: tutto ciò che gli antichi conoscevano, dalle Colonne d'Ercole alla terra dei Seri. Questo atlante disegna quel mondo — dall'Atlantico al Giappone, dall'equatore all'Artico — come un'unica mappa continua con una linea del tempo: si guardano gli imperi sorgere e cadere, le città cambiare nome, le persone attraversarlo.

Un sito statico: un file HTML, una cartella di JSON, [d3-geo](https://github.com/d3/d3-geo) per la proiezione. Nessun server, nessun account, nessun tracciamento.

## Cosa c'è sulla mappa

| Livello | Contenuto |
|---|---|
| **Confini** | 29 sezioni tra il 500 a.C. e il 2000. La sezione precedente resta tratteggiata, così guadagni e perdite si vedono a colpo d'occhio. |
| **Rilievo** | Ombreggiatura del terreno, fiumi, laghi, catene, deserti e cime sotto tutto il resto: un impero poggia sulle montagne e sui deserti che lo hanno plasmato. |
| **Città** | 128 città con tutti i nomi che hanno portato, nella scrittura di chi le governava (Byzantion → Costantinopoli → Qusṭanṭīniyya → İstanbul), i periodi da capitale e, per le principali, un motto e una breve storia. |
| **Personaggi** | 62 figure, mostrate dove vivevano nell'anno scelto. Ognuna ha una biografia e un pulsante *Percorso di vita* che ne traccia gli spostamenti: Alessandro fino all'Indo, Xuanzang fino a Nālandā, Ibn Battuta fino a Hangzhou. |
| **Eventi** | 138 eventi in sei categorie colorate: politica, scienza, tecnologia, pensiero, religione, arte. Sulla mappa, sulla linea del tempo e in una cronaca ordinata per epoca. |
| **Visita guidata** | Un pulsante sorvola ogni epoca e si ferma sul suo evento chiave. |
| **Lingue** | Inglese, francese, tedesco, italiano, spagnolo, cinese. Ogni scheda rimanda a Wikipedia. |

## Da provare

| | |
|---|---|
| [`?year=-323&lang=it`](https://oikoumene.pages.dev/?year=-323&lang=it) | Il mondo nell'anno della morte di Alessandro |
| [`?year=1200&lang=it`](https://oikoumene.pages.dev/?year=1200&lang=it) | Poco prima dei Mongoli |
| [`?year=1453&lang=it`](https://oikoumene.pages.dev/?year=1453&lang=it) | La caduta di Costantinopoli |
| [`?journey=alexander&lang=it`](https://oikoumene.pages.dev/?journey=alexander&lang=it) | La campagna di Alessandro tracciata sulla mappa |
| [`?tour=1&lang=it`](https://oikoumene.pages.dev/?tour=1&lang=it) | Mettersi comodi e guardare |

## Temi

Un tema è una storia in cui si entra: la mappa si restringe ai suoi anni e ai suoi luoghi, e la si percorre tappa per tappa. Una trentina sono proposti in [THEMES.it.md](THEMES.it.md) — guerre e loro rotte, il Grand Tour, la Via della Seta, la Peste nera, il viaggio del sapere greco verso l'arabo e poi il latino. **Votate con 👍 sulle issue etichettate `theme`.**

## Progetto gemello

Oikoumene è modellato su [江山时序 jiangshan-map](https://github.com/DeanChensj/jiangshan-map) di Dean Chen, che fa lo stesso per la Cina con confini disegnati a mano. I due condividono il modello di interazione e la convenzione di link `?year=`; l'obiettivo è che i link ai luoghi saltino dall'uno all'altro.

## Nota

Oikoumene è una visualizzazione educativa e culturale della storia. Non rappresenta né sostiene alcuna posizione politica, governo, movimento o rivendicazione.

Confini storici, itinerari, date e toponimi sono approssimativi, semplificati e solo illustrativi. Non sono autorevoli e non sono una presa di posizione su alcun territorio, confine o questione di sovranità, nemmeno quando una sezione mostra gli stati come venivano disegnati comunemente intorno all’anno 2000.

I confini provengono da [aourednik/historical-basemaps](https://github.com/aourednik/historical-basemaps) (CC BY 4.0), un dataset continentale con errori noti. Rilievo, fiumi e laghi provengono da Natural Earth. Biografie, storie di città, eventi e testi dei temi sono brevi introduzioni, non ricerca.

Le correzioni sono benvenute tramite le [issue di GitHub](https://github.com/wangyuexiang/oikoumene/issues). Il codice e i testi curati sono sotto [licenza MIT](../LICENSE). Fork, mirror e copie modificate non sono il progetto ufficiale.

Lo stesso testo è nell’atlante, sotto **Nota**.

## Limiti noti

I confini vengono da [historical-basemaps](https://github.com/aourednik/historical-basemaps), un dataset a scala continentale con errori noti; sono schematici e verranno sostituiti periodo per periodo. Biografie e storie di città sono orientamenti, non ricerca. Correzioni benvenute via issue o pull request.

## Costruito con Claude

Progettato e costruito in dialogo con [Claude](https://claude.ai) (Anthropic) in due giorni di novembre 2026: pipeline dei dati, pagina, biografie, storie di città e questo testo. Direzione, scelte editoriali e nome sono di Yuexiang Wang; la maggior parte dei tasti li ha premuti Claude.

## Crediti e licenza

Confini: aourednik/historical-basemaps, CC BY 4.0 · Rilievo, fiumi, laghi: Natural Earth e matplotlib basemap-data, pubblico dominio · Geometria: d3-geo, ISC · Caratteri: Cormorant Garamond, Noto Serif SC, IBM Plex Mono · Interazione ispirata a jiangshan-map (GPL-3.0; nessun codice riutilizzato). Codice e dati di questo repository: [MIT](../LICENSE).

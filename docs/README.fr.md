# Oikoumene

*Le monde habité, de 500 av. J.-C. à 2000, sur une seule carte que l'on fait défiler dans le temps.*

[**Voir la carte**](https://oikoumene.pages.dev) · [English](../README.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [中文](README.zh.md)

---

**Oikoumene** (οἰκουμένη, *oï-kou-MÉ-nè*) : le mot grec pour « le monde habité », tout ce que les Anciens connaissaient, des colonnes d'Hercule au pays des Sères. Cet atlas dessine ce monde — de l'Atlantique au Japon, de l'équateur à l'Arctique — comme une carte continue dotée d'une frise chronologique : on y regarde les empires naître et disparaître, les villes changer de nom, les hommes la traverser.

Un site statique : un fichier HTML, un dossier de JSON, [d3-geo](https://github.com/d3/d3-geo) pour la projection. Ni serveur, ni compte, ni traçage.

## Ce que montre la carte

| Couche | Contenu |
|---|---|
| **Frontières** | 29 coupes entre 500 av. J.-C. et 2000. La coupe précédente reste en pointillé, pour voir d'un coup d'œil ce qui a été gagné ou perdu. |
| **Relief** | Ombrage du terrain, fleuves, lacs, massifs, déserts et sommets sous l'ensemble : un empire repose sur les montagnes et les déserts qui l'ont façonné. |
| **Villes** | 128 villes avec tous les noms qu'elles ont portés, dans l'écriture de leurs maîtres successifs (Byzantion → Constantinople → Qusṭanṭīniyya → İstanbul), leurs périodes de capitale et, pour les principales, une devise et une courte histoire. |
| **Personnages** | 62 figures, placées là où elles vivaient à la date affichée. Chacune a une biographie et un bouton *Parcours* qui trace ses déplacements : Alexandre jusqu'à l'Indus, Xuanzang jusqu'à Nālandā, Ibn Battûta jusqu'à Hangzhou. |
| **Événements** | 138 événements en six catégories colorées : politique, science, technique, pensée, religion, art. Sur la carte, sur la frise et dans une chronique classée par époque. |
| **Visite guidée** | Un bouton survole chaque période et se pose sur son événement marquant. |
| **Langues** | Anglais, français, allemand, italien, espagnol, chinois. Chaque fiche renvoie à Wikipédia. |

## À essayer

| | |
|---|---|
| [`?year=-323&lang=fr`](https://oikoumene.pages.dev/?year=-323&lang=fr) | Le monde l'année de la mort d'Alexandre |
| [`?year=1200&lang=fr`](https://oikoumene.pages.dev/?year=1200&lang=fr) | Juste avant les Mongols |
| [`?year=1453&lang=fr`](https://oikoumene.pages.dev/?year=1453&lang=fr) | La chute de Constantinople |
| [`?journey=alexander&lang=fr`](https://oikoumene.pages.dev/?journey=alexander&lang=fr) | La campagne d'Alexandre tracée sur la carte |
| [`?tour=1&lang=fr`](https://oikoumene.pages.dev/?tour=1&lang=fr) | Laissez-vous porter |

## Thèmes

Un thème est une histoire dans laquelle on entre : la carte se resserre sur ses années et ses lieux, et on la parcourt étape par étape. Une trentaine sont proposés dans [THEMES.fr.md](THEMES.fr.md) — guerres et leurs routes, le Grand Tour, la route de la Soie, la Peste noire, le voyage du savoir grec vers l'arabe puis le latin. **Votez par 👍 sur les issues étiquetées `theme`.**

## Projet frère

Oikoumene est conçu sur le modèle de [江山时序 jiangshan-map](https://github.com/DeanChensj/jiangshan-map) de Dean Chen, qui fait de même pour la Chine avec des frontières dessinées à la main. Les deux partagent une même interaction et la convention de lien `?year=` ; l'objectif est que les liens de lieux passent de l'un à l'autre.

## Limites connues

Les frontières viennent de [historical-basemaps](https://github.com/aourednik/historical-basemaps), un jeu de données à l'échelle continentale aux erreurs connues ; elles sont schématiques et seront remplacées période par période. Les biographies et histoires de villes sont des repères, non des travaux d'érudition. Corrections bienvenues par issue ou pull request.

## Réalisé avec Claude

Conçu et construit en dialogue avec [Claude](https://claude.ai) (Anthropic) sur deux jours de novembre 2026 : pipeline de données, page, biographies, histoires de villes et ce texte. La direction, les choix éditoriaux et le nom sont de Yuexiang Wang ; la plupart des frappes sont de Claude.

## Crédits et licence

Frontières : aourednik/historical-basemaps, CC BY 4.0 · Relief, fleuves, lacs : Natural Earth et matplotlib basemap-data, domaine public · Géométrie : d3-geo, ISC · Polices : Cormorant Garamond, Noto Serif SC, IBM Plex Mono · Interaction d'après jiangshan-map (GPL-3.0 ; aucun code réutilisé). Code et données de ce dépôt : [MIT](../LICENSE).

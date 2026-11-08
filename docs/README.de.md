# Oikoumene

*Die bewohnte Welt, 500 v. Chr. bis 2000, auf einer Karte, durch die man die Zeit zieht.*

[**Karte öffnen**](https://oikoumene.pages.dev) · [English](../README.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [中文](README.zh.md)

---

**Oikoumene** (οἰκουμένη, *oi-ku-MÄ-nä*) war das griechische Wort für „die bewohnte Welt": alles, was die Alten kannten, von den Säulen des Herakles bis zum Land der Serer. Dieser Atlas zeichnet diese Welt — vom Atlantik bis Japan, vom Äquator bis zur Arktis — als eine durchgehende Karte mit Zeitleiste: Reiche entstehen und vergehen, Städte wechseln ihre Namen, Menschen ziehen hindurch.

Eine statische Seite: eine HTML-Datei, ein Ordner JSON, [d3-geo](https://github.com/d3/d3-geo) für die Projektion. Kein Server, keine Konten, kein Tracking.

## Was die Karte zeigt

| Ebene | Inhalt |
|---|---|
| **Grenzen** | 29 Schnitte zwischen 500 v. Chr. und 2000. Der vorige Schnitt bleibt gestrichelt sichtbar, so dass Gewinne und Verluste auf einen Blick erkennbar sind. |
| **Relief** | Schummerung, Flüsse, Seen, Gebirge, Wüsten und Gipfel unter allem — ein Reich liegt auf den Bergen und Wüsten, die es geformt haben. |
| **Städte** | 128 Städte mit allen Namen, die sie je trugen, in der Schrift ihrer jeweiligen Herrscher (Byzantion → Konstantinopel → Qusṭanṭīniyya → İstanbul), ihren Hauptstadtzeiten und für die wichtigsten eine Kennzeile und eine kurze Geschichte. |
| **Personen** | 62 Gestalten, dort gezeigt, wo sie zur gewählten Zeit lebten. Jede mit Biografie und einem *Lebensweg*-Knopf, der ihre Wege zeichnet: Alexander bis zum Indus, Xuanzang bis Nalanda, Ibn Battuta bis Hangzhou. |
| **Ereignisse** | 138 Ereignisse in sechs farbcodierten Kategorien: Politik, Wissenschaft, Technik, Denken, Religion, Kunst. Auf der Karte, auf der Zeitleiste und in einer nach Epochen gegliederten Chronik. |
| **Rundgang** | Ein Knopf fliegt durch jede Epoche und landet auf ihrem Schlüsselereignis. |
| **Sprachen** | Englisch, Französisch, Deutsch, Italienisch, Spanisch, Chinesisch. Jede Karte verlinkt auf Wikipedia. |

## Zum Ausprobieren

| | |
|---|---|
| [`?year=-323&lang=de`](https://oikoumene.pages.dev/?year=-323&lang=de) | Die Welt im Todesjahr Alexanders |
| [`?year=1200&lang=de`](https://oikoumene.pages.dev/?year=1200&lang=de) | Kurz vor den Mongolen |
| [`?year=1453&lang=de`](https://oikoumene.pages.dev/?year=1453&lang=de) | Der Fall Konstantinopels |
| [`?journey=alexander&lang=de`](https://oikoumene.pages.dev/?journey=alexander&lang=de) | Alexanders Feldzug auf der Karte |
| [`?tour=1&lang=de`](https://oikoumene.pages.dev/?tour=1&lang=de) | Zurücklehnen und zusehen |

## Themen

Ein Thema ist eine Geschichte, in die man eintritt: Die Karte verengt sich auf ihre Jahre und Orte, und man geht sie Station für Station ab. Rund dreißig sind in [THEMES.md](THEMES.md) vorgeschlagen — Kriege und ihre Routen, die Grand Tour, die Seidenstraße, der Schwarze Tod, der Weg des griechischen Wissens ins Arabische und zurück ins Lateinische. **Abstimmen per 👍 auf den Issues mit dem Label `theme`.**

## Schwesterprojekt

Vorbild ist [江山时序 jiangshan-map](https://github.com/DeanChensj/jiangshan-map) von Dean Chen, das dasselbe für China mit handgezeichneten Grenzen leistet. Beide teilen das Bedienkonzept und die `?year=`-Linkkonvention; Ziel ist, dass Ortslinks zwischen beiden springen.

## Bekannte Grenzen

Die Grenzen stammen aus [historical-basemaps](https://github.com/aourednik/historical-basemaps), einem Datensatz im Kontinentalmaßstab mit bekannten Fehlern; sie sind schematisch und werden Epoche für Epoche ersetzt. Biografien und Stadtgeschichten sind Orientierung, keine Forschung. Korrekturen als Issue oder Pull Request willkommen.

## Mit Claude gebaut

Entworfen und gebaut im Dialog mit [Claude](https://claude.ai) (Anthropic) an zwei Tagen im November 2026: Datenpipeline, Seite, Biografien, Stadtgeschichten und dieser Text. Richtung, redaktionelle Entscheidungen und Name stammen von Yuexiang Wang; die meisten Tastenanschläge von Claude.

## Quellen und Lizenz

Grenzen: aourednik/historical-basemaps, CC BY 4.0 · Relief, Flüsse, Seen: Natural Earth und matplotlib basemap-data, gemeinfrei · Geometrie: d3-geo, ISC · Schriften: Cormorant Garamond, Noto Serif SC, IBM Plex Mono · Bedienkonzept nach jiangshan-map (GPL-3.0; kein Code übernommen). Code und Daten dieses Repositories: [MIT](../LICENSE).

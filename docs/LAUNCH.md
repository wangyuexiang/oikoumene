# Launch kit

Everything below is a draft to post from your own accounts. Edit freely.

## Show HN

**Title** (80 chars max):
Show HN: Oikoumene – a scrub-through-time atlas of the Old World, 500 BCE–2000 CE

**Text**:
I built an interactive historical atlas of Eurasia and North Africa: one map, Atlantic to Japan, with a timeline you drag from 500 BCE to 2000 CE. Borders change, the previous period stays as a dashed ghost, cities carry the names they had under each ruler (Byzantion → Constantinople → Qusṭanṭīniyya → İstanbul), and 62 people appear where they lived with a "trace life" button that draws their journeys — Alexander, Xuanzang, Ibn Battuta, Marco Polo.

It's modelled on jiangshan-map (江山时序), a beautiful Chinese-history atlas by Dean Chen; I wanted the same thing for the rest of the Old World, and for the two to eventually link up at the Pamirs.

Static site, no backend: an HTML file, JSON data, d3-geo. Borders come from historical-basemaps and are schematic — that's the main known weakness, and hand-digitising them period by period is the roadmap. Data is plain JSON meant to be edited by hand; PRs for a city, a person or a border fix are easy.

Built with Claude over two days; the README says which parts.

Live: https://oikoumene.pages.dev · Code: https://github.com/wangyuexiang/oikoumene

## X / Twitter thread

1/ I made a map of the inhabited world you can scrub through 2,500 years.
Oikoumene — from the Greek οἰκουμένη, "the inhabited world."
[GIF: dragging the timeline from -500 to 2000]

2/ Cities keep every name they've carried, in the script of whoever ruled them.
Byzantion → Constantinople → قسطنطينيه → İstanbul
[screenshot: Constantinople card]

3/ 62 people appear where they lived. Press "Trace life" and their journeys draw themselves.
Here's Ibn Battuta: Tangier → Mecca → Delhi → Hangzhou → Timbuktu.
[GIF: trace]

4/ Six kinds of events, colour-coded: politics, science, tech, thought, religion, art. Toggle them and the century's character changes.
[screenshot: chronicle]

5/ It's a sister to @DeanChensj's 江山时序 (jiangshan-map), which does this for China with hand-drawn borders. Goal: link the two at the Pamirs so you can follow Xuanzang end to end.

6/ Static site, open data, MIT. Borders are schematic for now — fixing them period by period is the roadmap. PRs welcome.
Built with Claude.
https://oikoumene.pages.dev

## Issue to open on jiangshan-map

**Title**: Sister atlas for the Old World (Oikoumene) — proposal to align `?year=` / place links

**Body**:
Hi Dean — 江山时序 is the best historical-map UI I've seen, and I've used it as the model for a sister project covering the rest of the Old World: Oikoumene (https://github.com/wangyuexiang/oikoumene, live at https://oikoumene.pages.dev). Same idea — timeline, ghosted previous borders, city name genealogies, journeys — for Eurasia and North Africa from 500 BCE. No code reused; credit to you is in the README.

Two things I'd like to propose:

1. **Link convention.** Both sites take `?year=`. If we agree on a place identifier (I'm leaning on English Wikipedia titles as the key, with aliases), each could show a "view in 江山时序 / view in Oikoumene" button when the place exists on the other side. Chang'an, Dunhuang, Samarkand, Kashgar would be the first handshake.
2. **Handoff at the Pamirs.** Your map has far better resolution for China; mine covers the west. A journey like Xuanzang's or Marco Polo's could start on one and continue on the other.

Happy to do the work on my side and send a PR here if you're open to it. And if there's anything in my data conventions you'd rather I change to match yours, tell me — easier now than later.

## Reddit (r/MapPorn, r/history, r/dataisbeautiful)

Title: I built an interactive atlas of the Old World you can scrub from 500 BCE to 2000 CE — borders, relief, 128 cities with every name they've had, 62 people with their journeys [OC]

Comment to post immediately: link + "Borders are from historical-basemaps and schematic; corrections welcome. Modelled on jiangshan-map for China. Open source, MIT."

## Where to post, in order

1. GitHub release v0.1.0 (done by the push script)
2. Show HN, Tuesday–Thursday, 14:00–16:00 UTC
3. X thread the same day, quote the HN link in the last tweet
4. r/MapPorn 24h later with whatever got the most reaction on HN as the lead image
5. Issue on jiangshan-map after the first day's feedback, so you can mention real numbers
6. 即刻 / 微博 / 公众号 Chinese post, linking docs/README.zh.md

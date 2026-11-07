# Contributing

Everything on the map is a JSON file under `public/data/`. Edit, reload, done.

## Add a city

Append to `cities.json`:

```json
{"en":"Ravenna","fr":"Ravenne","de":"Ravenna","es":"Rávena","w":"Ravenna","wz":"拉文纳",
 "coord":[12.2,44.42],"cap":[[402,476],[493,540]],
 "names":[{"from":-500,"to":3000,"zh":"拉文纳","en":"Ravenna","loc":"Ravenna"}],
 "tag":{"zh":"西罗马最后的都城","en":"Last capital of the West"},
 "desc":{"zh":"…","en":"…"}}
```

- `names` must cover every year the city should be visible; a gap hides it.
- `loc` is the name in the script of whoever ruled it then. One entry per renaming.
- `w` / `wz` are the exact English / Chinese Wikipedia article titles.
- `tag` + `desc` are optional; without them the card shows names and capital periods only.

## Add a person

Append to `people.json`:

```json
{"en":"Ibn Sina","zh":"伊本·西那","title":{"zh":"医学与哲学集大成者","en":"Physician-philosopher"},
 "span":[980,1037],"c":[64.42,39.77],"k":"sci",
 "desc":{"zh":"…","en":"…"},"w":"Avicenna","wz":"伊本·西那",
 "places":[{"y":1014,"c":[51.68,32.65],"zh":"伊斯法罕","en":"Isfahan"}]}
```

- `k` ∈ `pol sci tec tho rel art`.
- `c` is where the marker sits; `places` are drawn in order by *Trace life*.
- Keep `desc` to 60–120 words: who, what they did, why it mattered.

## Add an event

Append to `events.json`:

```json
{"y":1543,"k":"sci","c":[19.44,54.1],"zh":"哥白尼《天体运行论》","en":"Copernicus, De revolutionibus",
 "w":"De revolutionibus orbium coelestium","wz":"天体运行论","top":0}
```

`top:1` makes it the stop the Tour zooms to for that slice — only one per slice.

## Fix a border

Short term: edit the polygon in `emea_<year>.json` and say in the PR which reference you used (Euratlas year, Barrington Atlas map number, or a cited source). Long term we are replacing these slices with hand-digitised ones; open an issue if you want to take a period.

## Rebuild from sources

```bash
git clone https://github.com/aourednik/historical-basemaps.git
pip install shapely pillow
python3 scripts/build_slices.py historical-basemaps/geojson public/data
# Natural Earth: ne_50m_land, ne_50m_lakes, ne_50m_rivers_lake_centerlines,
# ne_10m_geography_regions_polys, ne_10m_geography_regions_elevation_points → ./ne/
python3 scripts/build_physical.py ne public/data
```

`scripts/names.py` holds spelling normalisation and the Chinese dictionary for polity names; the build prints any name still missing a translation.

## Languages

UI strings live in the `T` object in `index.html`. Content fields are `zh` and `en`; the other UI languages fall back to English for content. A French, German or Spanish `desc` is welcome — add it as `"fr": "…"` next to `zh`/`en` and the card will use it.

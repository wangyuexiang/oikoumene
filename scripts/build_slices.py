import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from names import NORM, ZH, UNNAMED
from shapely.geometry import shape, box, mapping
from shapely.ops import unary_union
src, out = sys.argv[1], sys.argv[2]
BBOX = box(-30, 0, 150, 80)   # Atlantic → Japan, Equator → Arctic
years = ["bc500","bc400","bc323","bc300","bc200","bc100","bc1","100","200","300","400","500","600","700","800","900","1000","1100","1200","1279","1300","1400","1492","1500","1600","1700","1800","1900","2000"]
TOL=0.025
def rnd(c):
    if isinstance(c[0],(int,float)): return [round(c[0],3),round(c[1],3)]
    return [rnd(x) for x in c]
def fix(g):
    return g if g.is_valid else g.buffer(0)
index=[]; missing=set(); landparts=[]
for y in years:
    d=json.load(open(f"{src}/world_{y}.geojson"))
    feats=[]
    for f in d["features"]:
        g=fix(shape(f["geometry"]))
        if not g.intersects(BBOX): continue
        g=g.intersection(BBOX)
        if g.is_empty: continue
        if y=="2000": landparts.append(g)
        g=g.simplify(TOL, preserve_topology=True)
        if g.is_empty or g.area<0.01: continue
        p=f["properties"]; raw=(p.get("SUBJECTO") or p.get("NAME") or "").strip()
        raw=NORM.get(raw,raw)
        unnamed = raw in UNNAMED
        zh = None if unnamed else ZH.get(raw)
        if not unnamed and not zh: missing.add(raw)
        feats.append({"type":"Feature","properties":{"en":None if unnamed else raw,"zh":zh},"geometry":json.loads(json.dumps(mapping(g)))})
    for f in feats: f["geometry"]["coordinates"]=rnd(f["geometry"]["coordinates"])
    yr = -int(y[2:]) if y.startswith("bc") else int(y)
    fn=f"emea_{yr}.json"
    json.dump({"type":"FeatureCollection","year":yr,"features":feats},open(f"{out}/{fn}","w"),separators=(",",":"),ensure_ascii=False)
    index.append({"year":yr,"file":fn,"polities":len(feats),"kb":os.path.getsize(f"{out}/{fn}")//1024})
land=unary_union(landparts).simplify(0.02,preserve_topology=True)
lg=json.loads(json.dumps(mapping(land))); lg["coordinates"]=rnd(lg["coordinates"])
json.dump({"type":"Feature","geometry":lg},open(f"{out}/land.json","w"),separators=(",",":"))
json.dump(index,open(f"{out}/index.json","w"))
print("total KB", sum(i["kb"] for i in index), "land KB", os.path.getsize(f"{out}/land.json")//1024)
print("missing zh:", sorted(missing))

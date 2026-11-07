"""Build public/data/physical.json from Natural Earth GeoJSON (public domain).
usage: python3 scripts/build_physical.py <dir with ne_*.geojson> public/data
"""
import json, sys, os
from shapely.geometry import shape, box, mapping
src, out = sys.argv[1], sys.argv[2]
BBOX = box(-30, 0, 150, 80)
def rnd(c):
    if isinstance(c[0],(int,float)): return [round(c[0],2),round(c[1],2)]
    return [rnd(x) for x in c]
def clip(g, tol):
    if not g.is_valid: g=g.buffer(0)
    if not g.intersects(BBOX): return None
    g=g.intersection(BBOX).simplify(tol, preserve_topology=True)
    return None if g.is_empty else g
def feats(fn, keep, tol, props):
    d=json.load(open(os.path.join(src,fn)))
    res=[]
    for f in d['features']:
        p=f['properties']
        if not keep(p): continue
        g=clip(shape(f['geometry']), tol)
        if g is None: continue
        gm=json.loads(json.dumps(mapping(g))); gm['coordinates']=rnd(gm['coordinates'])
        res.append({'type':'Feature','properties':props(p),'geometry':gm})
    return res
land=feats('ne_50m_land.geojson', lambda p:True, 0.03, lambda p:{})
lakes=feats('ne_50m_lakes.geojson', lambda p:p.get('scalerank',9)<=3, 0.03, lambda p:{'en':p.get('name_en') or p.get('name'),'zh':p.get('name_zh')})
rivers=feats('ne_50m_rivers_lake_centerlines.geojson', lambda p:p.get('scalerank',9)<=4, 0.04, lambda p:{'en':p.get('name_en') or p.get('name'),'zh':p.get('name_zh'),'r':p.get('scalerank')})
ranges=feats('ne_10m_geography_regions_polys.geojson', lambda p:p.get('FEATURECLA') in ('Range/mtn','Plateau') and p.get('SCALERANK',9)<=4, 0.08, lambda p:{'en':p.get('NAME_EN') or p.get('NAME'),'zh':p.get('NAME_ZH'),'t':'plateau' if p.get('FEATURECLA')=='Plateau' else 'range','r':p.get('SCALERANK')})
deserts=feats('ne_10m_geography_regions_polys.geojson', lambda p:p.get('FEATURECLA')=='Desert' and p.get('SCALERANK',9)<=3, 0.1, lambda p:{'en':p.get('NAME_EN') or p.get('NAME'),'zh':p.get('NAME_ZH'),'r':p.get('SCALERANK')})
pk=json.load(open(os.path.join(src,'ne_10m_geography_regions_elevation_points.geojson')))
peaks=[{'c':[round(f['geometry']['coordinates'][0],2),round(f['geometry']['coordinates'][1],2)],'en':f['properties'].get('name_en') or f['properties'].get('name'),'zh':f['properties'].get('name_zh'),'elev':f['properties'].get('elevation'),'r':f['properties'].get('scalerank')} for f in pk['features'] if f['properties'].get('scalerank',9)<=4 and BBOX.contains(shape(f['geometry']))]
outj={'land':land,'lakes':lakes,'rivers':rivers,'ranges':ranges,'deserts':deserts,'peaks':peaks}
json.dump(outj,open(os.path.join(out,'physical.json'),'w'),separators=(',',':'),ensure_ascii=False)
print({k:len(v) for k,v in outj.items()}, os.path.getsize(os.path.join(out,'physical.json'))//1024,'KB')

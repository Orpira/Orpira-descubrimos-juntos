"""Draw the original paper-cut illustrations. Requires Pillow."""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1] / "public"
palette = {
    "puente": ("#cddbbf", "#2e594a"), "torre": ("#efc088", "#75482d"),
    "robot": ("#cdd9e7", "#3c5371"), "ordenador": ("#dfd3eb", "#604a6d"),
    "sol": ("#f1d79c", "#6a4a33"), "planta": ("#c5d9c7", "#365b43"),
    "musica": ("#efd0c4", "#883f53"), "tienda": ("#f3d0a7", "#8e4a2f"),
    "arbol": ("#dce0b6", "#485c35"), "ciudad": ("#c8d9db", "#365763"),
}

def draw_scene(name, background, ink, filename):
    image = Image.new("RGB", (720, 420), background)
    draw = ImageDraw.Draw(image)
    cream = "#fff4da"
    leaf = "#91ad79"
    coral = "#ca745b"
    draw.ellipse((197, 54, 523, 380), fill=cream)
    draw.ellipse((147, 325, 572, 367), fill="#b2ad8b")
    for x, y in [(118, 120), (171, 200), (567, 105), (607, 204), (541, 269)]:
        draw.line((x-11, y, x+11, y), fill=ink, width=3)
        draw.line((x, y-11, x, y+11), fill=ink, width=3)
    if name == "puente":
        for x in (159, 465):
            draw.rounded_rectangle((x, 255, x+96, 337), 8, fill=ink)
            draw.rectangle((x+3, 276, x+92, 298), fill=coral)
            draw.rectangle((x+4, 308, x+90, 326), fill=cream)
        points = [(236 + i*25, 250 - (i % 2)*38) for i in range(11)]
        draw.polygon(points + [(x,y+26) for x,y in reversed(points)], fill="#edb65d")
        draw.line(points, fill=ink, width=6, joint="curve")
        draw.polygon([(334, 179), (406, 168), (427, 205), (351, 212)], fill=leaf, outline=ink, width=4)
    elif name == "torre":
        for x,y,w in [(249,285,222),(278,228,164),(309,171,102),(333,114,54)]:
            draw.rounded_rectangle((x,y,x+w,y+58), 6, fill=ink, outline=cream, width=5)
            draw.rectangle((x+10,y+16,x+w-10,y+24),fill=coral)
    elif name in ("robot", "ordenador"):
        draw.rounded_rectangle((227,113,493,281), 24, fill=ink)
        draw.rounded_rectangle((249,136,471,251), 14, fill=leaf)
        if name == "robot":
            draw.line((360,113,360,80), fill=ink, width=8)
            draw.ellipse((346,57,374,85), fill=coral)
            for x in (302,392):
                draw.ellipse((x,168,x+26,194),fill=ink)
            draw.arc((324,184,397,232), 15, 165, fill=ink, width=4)
            draw.rounded_rectangle((272,275,444,340), 16, fill=coral)
        else:
            draw.line((278,176,303,196,278,216),fill=ink,width=8)
            draw.line((322,217,371,217),fill=ink,width=8)
            draw.polygon([(237,296),(481,296),(522,339),(198,339)],fill=coral)
    elif name == "sol":
        draw.ellipse((246,99,385,238),fill="#e6a835")
        draw.polygon([(318,310),(470,239),(530,315)],fill=ink)
        draw.polygon([(256,323),(292,216),(342,323)],fill=coral)
    elif name in ("planta","arbol"):
        draw.line((360,329,360,137),fill=ink,width=19)
        for x,y,c in [(273,150,leaf),(350,113,ink),(369,182,leaf),(278,225,coral)]:
            draw.ellipse((x,y,x+94,y+55),fill=c)
        if name == "planta":
            draw.polygon([(307,284),(414,284),(395,344),(328,344)],fill=coral)
        else:
            draw.line((360,245,411,162),fill=ink,width=11)
            draw.ellipse((393,129,474,181),fill=coral)
    elif name == "musica":
        draw.line((302,280,302,142,437,115,437,252),fill=ink,width=14,joint="curve")
        for x,y,c in [(247,264,coral),(382,237,leaf)]:
            draw.ellipse((x,y,x+70,y+47),fill=c,outline=ink,width=5)
    elif name == "tienda":
        draw.rounded_rectangle((228,166,492,340),10,fill=ink)
        for x in range(216,503,48):
            draw.polygon([(x,138),(x+44,138),(x+34,197),(x-10,197)],fill=cream if x%96==24 else coral)
        draw.rectangle((257,213,378,280),fill=leaf)
        draw.rectangle((404,220,458,340),fill=coral)
    else:
        draw.line((178,318,319,254,526,310),fill=ink,width=13)
        for x,y,c in [(198,176,coral),(329,105,ink),(445,200,leaf)]:
            draw.rectangle((x,y,x+77,y+100),fill=c)
            draw.polygon([(x-10,y),(x+39,y-41),(x+87,y)],fill=ink)
            draw.rectangle((x+28,y+49,x+51,y+100),fill=cream)
    image.save(ROOT / "arte" / (filename + ".webp"), quality=88)

for key, (background, ink) in palette.items():
    draw_scene(key, background, ink, key)
draw_scene("puente", "#d5b384", "#2e594a", "hero")
for size in (192, 512):
    image = Image.new("RGB", (size, size), "#285643")
    draw = ImageDraw.Draw(image)
    center = size / 2
    for dx, dy in [(0, .24), (.24, 0), (.17, .17), (.17, -.17)]:
        draw.line((center-size*dx, center-size*dy, center+size*dx, center+size*dy), fill="#fff4da", width=round(size*.055))
    image.save(ROOT / f"icon-{size}.png")

#!/usr/bin/env python3
"""
NeuroQuest System Architecture Diagram Generator
Produces a 1400x960px professional PNG diagram using Pillow.
"""

from PIL import Image, ImageDraw, ImageFont
import os
import math

# ─── Canvas ────────────────────────────────────────────────────────────────────
W, H = 1400, 1100   # slight height increase for breathing room
MARGIN = 30

img = Image.new("RGB", (W, H), "#FFFFFF")
draw = ImageDraw.Draw(img, "RGBA")

# ─── Fonts ─────────────────────────────────────────────────────────────────────
def get_font(size, bold=False):
    """Try to load a system sans-serif font, fall back to default."""
    candidates_bold = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNSDisplay-Bold.otf",
        "/System/Library/Fonts/SFPro.ttf",
        "/Library/Fonts/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    ]
    candidates_regular = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNSText.otf",
        "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ]
    candidates = candidates_bold if bold else candidates_regular
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
    return ImageFont.load_default()

F_TITLE    = get_font(28, bold=True)
F_SUBTITLE = get_font(16)
F_LABEL    = get_font(13, bold=True)
F_BODY     = get_font(12)
F_SMALL    = get_font(11)
F_LAYER    = get_font(13, bold=True)
F_BOX      = get_font(12, bold=True)
F_BOX_SUB  = get_font(11)
F_ARROW    = get_font(11)
F_LEGEND   = get_font(12)

# ─── Drawing Helpers ───────────────────────────────────────────────────────────

def hex2rgb(h, alpha=255):
    h = h.lstrip("#")
    r, g, b = int(h[0:2],16), int(h[2:4],16), int(h[4:6],16)
    return (r, g, b, alpha)

def shadow_rect(x0, y0, x1, y1, radius=8, shadow_offset=3, shadow_blur=6):
    """Draw a soft drop shadow then a rounded rect."""
    # shadow (multiple semi-transparent rects for blur effect)
    for i in range(shadow_blur, 0, -1):
        alpha = int(18 * (shadow_blur - i + 1) / shadow_blur)
        sx0, sy0 = x0 + shadow_offset - i, y0 + shadow_offset - i
        sx1, sy1 = x1 + shadow_offset + i, y1 + shadow_offset + i
        draw.rounded_rectangle([sx0, sy0, sx1, sy1], radius=radius+i,
                               fill=(0, 0, 0, alpha))

def rounded_rect(x0, y0, x1, y1, fill, border, radius=8, border_width=2, shadow=True):
    if shadow:
        shadow_rect(x0, y0, x1, y1, radius=radius)
    draw.rounded_rectangle([x0, y0, x1, y1], radius=radius,
                           fill=fill, outline=border, width=border_width)

def text_center(text, cx, cy, font, fill="#1F2937", line_spacing=4):
    """Draw multi-line text centered at (cx, cy)."""
    lines = text.split("\n")
    line_heights = []
    line_widths = []
    for line in lines:
        bbox = font.getbbox(line) if hasattr(font, "getbbox") else (0,0,100,14)
        lw = bbox[2] - bbox[0]
        lh = bbox[3] - bbox[1]
        line_widths.append(lw)
        line_heights.append(lh)
    total_h = sum(line_heights) + line_spacing * (len(lines) - 1)
    y = cy - total_h // 2
    for i, line in enumerate(lines):
        lw = line_widths[i]
        lh = line_heights[i]
        draw.text((cx - lw // 2, y), line, font=font, fill=fill)
        y += lh + line_spacing

def measure_text(text, font, line_spacing=4):
    lines = text.split("\n")
    widths, heights = [], []
    for line in lines:
        bbox = font.getbbox(line) if hasattr(font, "getbbox") else (0,0,100,14)
        widths.append(bbox[2] - bbox[0])
        heights.append(bbox[3] - bbox[1])
    return max(widths), sum(heights) + line_spacing * (len(lines) - 1)

def arrow_down(x, y_top, y_bot, label="", color="#374151", label_color="#6B7280"):
    """Draw a vertical arrow with optional label."""
    draw.line([(x, y_top), (x, y_bot - 8)], fill=color, width=2)
    # arrowhead
    draw.polygon([(x-5, y_bot-8), (x+5, y_bot-8), (x, y_bot)], fill=color)
    if label:
        tw, th = measure_text(label, F_ARROW)
        draw.text((x + 8, (y_top + y_bot) // 2 - th // 2), label, font=F_ARROW, fill=label_color)

def arrow_right(x_left, x_right, y, color="#374151"):
    """Draw a horizontal arrow."""
    draw.line([(x_left, y), (x_right - 6, y)], fill=color, width=2)
    draw.polygon([(x_right-6, y-4), (x_right-6, y+4), (x_right, y)], fill=color)

def layer_band(x0, y0, x1, y1, fill, border, label, label_color="#374151"):
    """Draw a layer background band with a label tab."""
    rounded_rect(x0, y0, x1, y1, fill=fill, border=border, radius=12,
                 border_width=2, shadow=False)
    # small label tag at top-left
    tag_w = measure_text(label, F_LAYER)[0] + 20
    tag_h = 24
    draw.rounded_rectangle([x0, y0, x0 + tag_w, y0 + tag_h],
                           radius=6, fill=border)
    draw.text((x0 + 10, y0 + 5), label, font=F_LAYER, fill="#FFFFFF")

# ─── Layout constants ──────────────────────────────────────────────────────────
LX = MARGIN + 10        # layer left edge
RX = W - MARGIN - 10   # layer right edge
LW = RX - LX           # layer width

# Layer Y positions (top, bottom)
TITLE_Y   = 18
SUBTITLE_Y = 54

L1_Y0, L1_Y1 = 88,  220
L2_Y0, L2_Y1 = 255, 370
L3_Y0, L3_Y1 = 405, 540
L4_Y0, L4_Y1 = 575, 680
L5_Y0, L5_Y1 = 730, 870

LEGEND_Y  = 900

# ─── TITLE ────────────────────────────────────────────────────────────────────
text_center("NeuroQuest — System Architecture", W//2, TITLE_Y + 14, F_TITLE, fill="#111827")
text_center("Next.js PWA + RAG Chat Layer", W//2, SUBTITLE_Y, F_SUBTITLE, fill="#6B7280")

# ─── LAYER 1 — CONTENT AUTHORING ──────────────────────────────────────────────
layer_band(LX, L1_Y0, RX, L1_Y1, fill="#F5F5F5", border="#9CA3AF",
           label="CONTENT AUTHORING")

inner_y0, inner_y1 = L1_Y0 + 34, L1_Y1 - 12
item_h = inner_y1 - inner_y0

# Person icon (circle)
person_cx = LX + 75
person_cy = (inner_y0 + inner_y1) // 2 - 8
draw.ellipse([person_cx-18, person_cy-28, person_cx+18, person_cy-6],
             fill="#9CA3AF", outline="#6B7280", width=2)
draw.ellipse([person_cx-22, person_cy-4, person_cx+22, person_cy+24],
             fill="#9CA3AF", outline="#6B7280", width=2)
draw.text((person_cx - measure_text("Author", F_SMALL)[0]//2, inner_y1 - 24),
          "Author", font=F_SMALL, fill="#374151")

# Arrow 1
arr1_x = LX + 108
arrow_right(arr1_x, arr1_x + 28, (inner_y0 + inner_y1)//2 - 8)

# Box: NMA Transcripts
b1x0 = arr1_x + 28
b1x1 = b1x0 + 190
rounded_rect(b1x0, inner_y0, b1x1, inner_y1,
             fill="#E8F4FD", border="#93C5FD", radius=8)
text_center("NMA Transcripts\n& Book Text", (b1x0+b1x1)//2, (inner_y0+inner_y1)//2 - 8,
            F_BOX, fill="#1E40AF")

# Arrow 2
arr2_x = b1x1
arrow_right(arr2_x, arr2_x + 28, (inner_y0 + inner_y1)//2 - 8)

# Box: sources/
b2x0 = arr2_x + 28
b2x1 = b2x0 + 190
rounded_rect(b2x0, inner_y0, b2x1, inner_y1,
             fill="#E8F4FD", border="#93C5FD", radius=8)
text_center("sources/\n(raw .md files)", (b2x0+b2x1)//2, (inner_y0+inner_y1)//2 - 8,
            F_BOX, fill="#1E40AF")

# Arrow 3
arr3_x = b2x1
arrow_right(arr3_x, arr3_x + 28, (inner_y0 + inner_y1)//2 - 8)

# Box: worlds.ts
b3x0 = arr3_x + 28
b3x1 = b3x0 + 210
rounded_rect(b3x0, inner_y0, b3x1, inner_y1,
             fill="#E8F4FD", border="#93C5FD", radius=8)
text_center("worlds.ts\nWorlds > Quests > Lessons", (b3x0+b3x1)//2, (inner_y0+inner_y1)//2 - 8,
            F_BOX, fill="#1E40AF")

# Arrow down: git push
mid_x1 = (LX + RX) // 2
arrow_down(mid_x1, L1_Y1, L2_Y0 - 2, label="  git push", color="#374151", label_color="#6B7280")

# ─── LAYER 2 — VERCEL ─────────────────────────────────────────────────────────
layer_band(LX, L2_Y0, RX, L2_Y1, fill="#FFF3CD", border="#F59E0B",
           label="VERCEL — Build & Deploy")

v_inner_y0 = L2_Y0 + 34
v_inner_y1 = L2_Y1 - 12
v_pad = 18
v_box_w = (LW - v_pad * 4) // 3
boxes_v = [
    ("npm run build\nbundles worlds.ts into JS", "#FEF3C7", "#F59E0B"),
    ("Global CDN\nEdge Network",                "#FEF3C7", "#F59E0B"),
    ("Service Worker\nPWA / Offline",           "#FEF3C7", "#F59E0B"),
]
for i, (label, fill, bdr) in enumerate(boxes_v):
    bx0 = LX + v_pad + i * (v_box_w + v_pad)
    bx1 = bx0 + v_box_w
    rounded_rect(bx0, v_inner_y0, bx1, v_inner_y1, fill=fill, border=bdr, radius=8)
    text_center(label, (bx0+bx1)//2, (v_inner_y0+v_inner_y1)//2 - 6, F_BOX, fill="#92400E")

arrow_down(mid_x1, L2_Y1, L3_Y0 - 2, label="  HTTP request", color="#374151", label_color="#6B7280")

# ─── LAYER 3 — BROWSER ────────────────────────────────────────────────────────
layer_band(LX, L3_Y0, RX, L3_Y1, fill="#EFF6FF", border="#3B82F6",
           label="USER BROWSER / MOBILE — Client Side")

br_inner_y0 = L3_Y0 + 34
br_inner_y1 = L3_Y1 - 12
br_pad = 18
br_box_w = (LW - br_pad * 4) // 3
boxes_br = [
    ("LESSON ENGINE\nConceptCard · MCQCard\nFlashCard · FillCard",
     "#DCFCE7", "#16A34A", "#14532D"),
    ("PYTHON SANDBOX\nPyodide / WASM\nnumpy · matplotlib\n(no server)",
     "#F3E8FF", "#9333EA", "#581C87"),
    ("STATE LAYER\nZustand + localStorage\nXP · Streak\nSM-2 Spaced Repetition",
     "#CCFBF1", "#0D9488", "#134E4A"),
]
for i, (label, fill, bdr, txt) in enumerate(boxes_br):
    bx0 = LX + br_pad + i * (br_box_w + br_pad)
    bx1 = bx0 + br_box_w
    rounded_rect(bx0, br_inner_y0, bx1, br_inner_y1, fill=fill, border=bdr, radius=8, border_width=2)
    text_center(label, (bx0+bx1)//2, (br_inner_y0+br_inner_y1)//2 - 4, F_BOX, fill=txt)

arrow_down(mid_x1, L3_Y1, L4_Y0 - 2, label="  /api/chat", color="#F43F5E", label_color="#F43F5E")

# ─── LAYER 4 — RAG ────────────────────────────────────────────────────────────
layer_band(LX, L4_Y0, RX, L4_Y1, fill="#FFF1F2", border="#F43F5E",
           label="RAG LAYER — Next.js API Route /api/chat")

rag_inner_y0 = L4_Y0 + 34
rag_inner_y1 = L4_Y1 - 12
rag_pad = 14
n_rag = 4
rag_box_w = (LW - rag_pad * (n_rag + 1) - 24 * (n_rag - 1)) // n_rag
arr_w = 24
total_rag = n_rag * rag_box_w + (n_rag - 1) * (rag_pad + arr_w) + rag_pad * 2
start_x = LX + (LW - total_rag) // 2

boxes_rag = [
    ("1. Embed Question\nFireworks nomic-embed-text",  "#FFE4E6", "#F43F5E", "#881337"),
    ("2. Vector Search\nSupabase pgvector\ntop 3 chunks",     "#FFE4E6", "#F43F5E", "#881337"),
    ("3. Generate Answer\nFireworks Llama 3.3 70B\n+ retrieved context", "#FFE4E6", "#F43F5E", "#881337"),
    ("4. Stream Response\nIlya mascot chat UI",         "#FFE4E6", "#F43F5E", "#881337"),
]
rag_cx_list = []
for i, (label, fill, bdr, txt) in enumerate(boxes_rag):
    rx0 = start_x + i * (rag_box_w + rag_pad + arr_w)
    rx1 = rx0 + rag_box_w
    rounded_rect(rx0, rag_inner_y0, rx1, rag_inner_y1, fill=fill, border=bdr, radius=8, border_width=2)
    text_center(label, (rx0+rx1)//2, (rag_inner_y0+rag_inner_y1)//2 - 4, F_BOX, fill=txt)
    rag_cx_list.append((rx0, rx1))
    if i < len(boxes_rag) - 1:
        arr_start = rx1 + 2
        arr_end = rx1 + rag_pad + arr_w
        arrow_right(arr_start, arr_end, (rag_inner_y0 + rag_inner_y1)//2, color="#F43F5E")

arrow_down(mid_x1, L4_Y1, L5_Y0 - 2, label="", color="#374151", label_color="#6B7280")

# ─── LAYER 5 — EXTERNAL SERVICES ──────────────────────────────────────────────
# Two side-by-side boxes, no band background needed, just the two boxes
ext_pad = 30
ext_box_w = (LW - ext_pad * 3) // 2
ext_inner_y0 = L5_Y0
ext_inner_y1 = L5_Y1

# Left: Supabase
sb_x0 = LX + ext_pad
sb_x1 = sb_x0 + ext_box_w
rounded_rect(sb_x0, ext_inner_y0, sb_x1, ext_inner_y1,
             fill="#DCFCE7", border="#16A34A", radius=10, border_width=2)
text_center("SUPABASE", (sb_x0+sb_x1)//2, ext_inner_y0 + 26, F_LABEL, fill="#14532D")
# horizontal divider
div_y = ext_inner_y0 + 48
draw.line([(sb_x0 + 16, div_y), (sb_x1 - 16, div_y)], fill="#86EFAC", width=1)
text_center("pgvector\nNMA chunks + embeddings",
            (sb_x0+sb_x1)//2, div_y + 28, F_BOX_SUB, fill="#14532D")
div_y_sb2 = div_y + 52
draw.line([(sb_x0 + 16, div_y_sb2), (sb_x1 - 16, div_y_sb2)], fill="#86EFAC", width=1)
text_center("user_stats\nlesson_progress\nsr_cards (future)",
            (sb_x0+sb_x1)//2, div_y_sb2 + 34, F_BOX_SUB, fill="#14532D")

# Right: Fireworks AI
fw_x0 = sb_x1 + ext_pad
fw_x1 = fw_x0 + ext_box_w
rounded_rect(fw_x0, ext_inner_y0, fw_x1, ext_inner_y1,
             fill="#FEF3C7", border="#F59E0B", radius=10, border_width=2)
text_center("FIREWORKS AI", (fw_x0+fw_x1)//2, ext_inner_y0 + 26, F_LABEL, fill="#78350F")
div_y2 = ext_inner_y0 + 48
draw.line([(fw_x0 + 16, div_y2), (fw_x1 - 16, div_y2)], fill="#FDE68A", width=1)
text_center("nomic-embed-text\n(embeddings — runs once)",
            (fw_x0+fw_x1)//2, div_y2 + 28, F_BOX_SUB, fill="#78350F")
div_y_fw2 = div_y2 + 52
draw.line([(fw_x0 + 16, div_y_fw2), (fw_x1 - 16, div_y_fw2)], fill="#FDE68A", width=1)
text_center("Llama 3.3 70B\n(chat — streaming)",
            (fw_x0+fw_x1)//2, div_y_fw2 + 28, F_BOX_SUB, fill="#78350F")

# Arrows from Layer 4 boxes to Supabase and Fireworks
# RAG box 1 (embed) → Fireworks, RAG box 2 (vector search) → Supabase, RAG box 3 → Fireworks
# Simpler: two arrows down from the layer 4 bottom center to each ext box
sb_cx = (sb_x0 + sb_x1) // 2
fw_cx = (fw_x0 + fw_x1) // 2

# arrow from L4 to Supabase
draw.line([(sb_cx, L4_Y1), (sb_cx, L5_Y0 - 2)], fill="#374151", width=2)
draw.polygon([(sb_cx-5, L5_Y0-8), (sb_cx+5, L5_Y0-8), (sb_cx, L5_Y0)], fill="#374151")

# arrow from L4 to Fireworks
draw.line([(fw_cx, L4_Y1), (fw_cx, L5_Y0 - 2)], fill="#374151", width=2)
draw.polygon([(fw_cx-5, L5_Y0-8), (fw_cx+5, L5_Y0-8), (fw_cx, L5_Y0)], fill="#374151")

# ─── LEGEND ──────────────────────────────────────────────────────────────────
legend_items = [
    ("#3B82F6", "Client-side"),
    ("#F43F5E", "Server / API"),
    ("#16A34A", "External Services"),
]
total_legend_w = sum(measure_text(f"  {t}", F_LEGEND)[0] + 36 for _, t in legend_items) + 20
lx = (W - total_legend_w) // 2
ly = LEGEND_Y + 10

for color_hex, label in legend_items:
    pill_w = measure_text(label, F_LEGEND)[0] + 28
    pill_h = 22
    draw.rounded_rectangle([lx, ly, lx + pill_w, ly + pill_h],
                           radius=11, fill=color_hex + "33", outline=color_hex, width=2)
    # color dot
    draw.ellipse([lx + 8, ly + 7, lx + 16, ly + 15], fill=color_hex)
    draw.text((lx + 20, ly + 4), label, font=F_LEGEND, fill="#374151")
    lx += pill_w + 16

# ─── Footer line ──────────────────────────────────────────────────────────────
draw.line([(MARGIN, LEGEND_Y - 8), (W - MARGIN, LEGEND_Y - 8)], fill="#E5E7EB", width=1)
footer_text = "NeuroQuest · Powered by Next.js, Vercel, Supabase, Fireworks AI"
ftw, _ = measure_text(footer_text, F_SMALL)
draw.text(((W - ftw)//2, LEGEND_Y + 40), footer_text, font=F_SMALL, fill="#9CA3AF")

# ─── Save ─────────────────────────────────────────────────────────────────────
out_path = "/Users/danara/Vibecoding/neuroquest/neuroquest-architecture.png"
# Crop to content
final = img.crop((0, 0, W, LEGEND_Y + 70))
final.save(out_path, "PNG", dpi=(144, 144))
print(f"Saved to {out_path}  ({final.size[0]}x{final.size[1]}px)")

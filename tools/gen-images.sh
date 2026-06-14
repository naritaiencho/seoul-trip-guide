#!/usr/bin/env bash
# 妹の追加情報で増えた料理の画像をGPT Image 2(codex exec)で生成。
# 既存 public/img/*.webp と同じ「ダーク紫背景・湯気・ドラマチック照明のプレミアム韓国料理写真」スタイルに統一。
set -u

PROJ="C:/Users/intel/dev/windows-workspace/seoul-trip-guide"
OUT="$PROJ/public/img"
LOG="$PROJ/tools/gen-images.log"
: > "$LOG"

STYLE="Ultra-realistic premium Korean food photography, magazine quality. Moody cinematic lighting: warm golden key light plus subtle magenta and violet rim light. Deep dark near-black background with faint purple tones. Gentle rising steam. Surrounded by a few colorful Korean banchan side dishes in small brass and ceramic bowls. Rich saturated appetizing colors, shallow depth of field, 45-degree top-down angle, square 1:1 composition. No text, no logos, no watermark, no human faces."

gen () {
  local name="$1"; shift
  local subject="$1"; shift
  echo "[start] $name" >> "$LOG"
  codex exec -C "$PROJ" -s workspace-write \
    -c 'service_tier="fast"' \
    -c 'model_reasoning_effort="low"' \
    "Use your image generation tool to create ONE 1024x1024 image and save it to the absolute path '$OUT/$name.png'. Subject: $subject. Art direction: $STYLE. Just generate and save the PNG at that exact path; do not create any other files, do not ask questions." \
    >> "$LOG" 2>&1
  if [ -f "$OUT/$name.png" ]; then
    echo "[done] $name.png ($(stat -c%s "$OUT/$name.png" 2>/dev/null) bytes)" >> "$LOG"
  else
    echo "[FAIL] $name.png not created" >> "$LOG"
  fi
}

# バッチ1（3並列）
gen "food-tteokbokki" "A wide shallow pan of Seoul Sindang-dong style tteokbokki hot pot (jjukkumi tteokbokki): chewy cylindrical white rice cakes, fish cakes, ramen noodles, a halved boiled egg and scallions simmering in glossy spicy-sweet red gochujang sauce" &
gen "food-gamjatang" "A bubbling iron hot pot of Korean gamjatang, pork-backbone and potato stew: large meaty pork bones, whole potatoes, perilla leaves on top, a dusting of perilla seed powder, in a deep red spicy broth" &
gen "food-bossam" "A wooden platter of Korean bossam: neat slices of tender steamed pork belly, a small mound of fresh raw oysters, spicy julienned radish salad, fresh lettuce and perilla leaves for wrapping, with ssamjang dipping paste" &
wait

# バッチ2（2並列）
gen "food-samgyeopsal" "Thick-cut samgyeopsal pork belly searing on a clean modern round grill plate at an upscale Korean BBQ restaurant, neat refined presentation, kimchi and garlic grilling on the side, fresh lettuce wraps and dipping sauces nearby" &
gen "food-comtang" "A heavy stone bowl of Korean gomtang, a clear rich beef brisket soup with thin sliced beef, glass noodles and finely chopped scallion floating on top, a small bowl of white rice and kkakdugi radish kimchi beside it" &
wait

echo "ALL DONE" >> "$LOG"

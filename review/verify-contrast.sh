#!/usr/bin/env bash
# Worst-frame legibility audit for the pearl floor.
#
# Legibility is INVERTED on this site: the world is bright and the type is dark
# ink (#0E1330), so the danger is a DARK patch of footage under the words, not a
# bright one. This samples the real footage at each caption's own moment, finds
# the darkest luma in that caption's rail, blends it under the band scrim the way
# the browser does, and reports the resulting contrast ratio.
#
# The captions sit directly on the scrim again. A glass plate behind each beat
# was tried on 2026-08-16 and removed at the client's call, so there is exactly
# one layer between the footage and the glyphs and this stays a single blend.
# If a plate ever comes back, it composites OVER this result and can only
# lighten it, so these numbers remain the conservative floor either way.
#
# Pass mark: 4.5:1 (WCAG AA for normal text). Every headline here is large, so
# 3.0:1 is the formal floor, but we hold the stricter line.

V="$(dirname "$0")/../site/assets/hero-scrub.mp4"
SCRIM_A=0.78          # scrim alpha under the glyphs, conservative (gradient is .94 at centre)
PEARL=242             # --pearl #F2F4F8 -> 242 on the 0-255 luma axis

# beat | video time | crop WxH+X+Y in the 1280x720 frame
#
# The three chaos beats moved inboard on 2026-08-16 and FINANCE was dropped, so
# their times and crops both moved. A crop left pointing at the old rail would
# audit a patch of room that no caption sits on any more, which is worse than
# no audit at all: it reports PASS about the wrong pixels.
BEATS=(
  "hero              |0.72 |560:400:60:170"
  "MARKETING         |2.83 |560:400:60:170"
  "SALES             |4.51 |560:400:60:170"
  "OPERATIONS        |6.21 |560:400:60:170"
  "HR SOLUTIONS      |7.70 |360:130:120:155"
  "CUSTOM SOLUTIONS  |9.05 |360:130:820:185"
  "CUSTOMER SUCCESS  |10.35|380:130:170:445"
  "SMART MARKETING   |19.25|560:400:660:170"
  "AI-POWERED SALES  |21.75|560:400:660:170"
  "ALWAYS-ON OPS     |24.50|560:400:660:170"
  "ONE BUSINESS      |27.97|900:340:190:190"
  "close             |30.00|900:340:190:190"
)

# ── the phone cut, added 2026-08-16 ──────────────────────────────────────────
#
# Phones used to fall through the static-hero gate: no video, every beat on its
# own opaque pearl card, nothing to audit. They now run the same scrubbed film
# the desktop runs, so the type is back on live footage and has to be measured
# there too.
#
# The crop window is DIFFERENT and that is the whole point of a second pass. A
# 375x812 portrait slot showing a 1280x720 plate under `cover` scales by
# 812/720 = 1.1278 and keeps only 375/1.1278 = 332 source pixels of width,
# centred: columns 474 to 806. Two thirds of every frame this audit checks on
# desktop is simply not on screen on a phone, and the darkest pixel in the part
# that IS on screen is a different pixel.
#
# Viewport y maps to source y by the same 1.1278 (portrait never crops a 16:9
# plate vertically — cover is always width-limited here).
MOBILE=(
  "hero              |0.72 |332:186:474:266"
  "MARKETING         |2.83 |332:120:474:300"
  "SALES             |4.51 |332:120:474:300"
  "OPERATIONS        |6.21 |332:120:474:300"
  "HR SOLUTIONS      |7.70 |332:40:474:150"
  "CUSTOM SOLUTIONS  |9.05 |332:40:474:330"
  "CUSTOMER SUCCESS  |10.35|332:40:474:550"
  "SMART MARKETING   |19.25|332:150:474:290"
  "AI-POWERED SALES  |21.75|332:150:474:290"
  "ALWAYS-ON OPS     |24.50|332:150:474:290"
  "ONE BUSINESS      |27.97|332:205:474:258"
  "close             |30.00|332:155:474:282"
)
# The phone wash is its own gradient (.94 at centre, .80 at 46%). Audited at the
# .80 shoulder rather than the .94 centre, so the number describes the weakest
# place a glyph can land rather than the best one.
MOBILE_A=0.80

worst=99

# The rows come in as ARGUMENTS, not on stdin, and that is load-bearing: a
# `while read` fed by a pipe runs in a subshell, so every `worst` this loop
# computed would be thrown away at the closing `done` and the summary line
# would report the initial 99 as a pass.
audit() {           # $1 label   $2 scrim alpha   $3.. the rows
  local label="$1" a="$2" row name t crop stats ymin ylow bg ratio worstnew flag
  shift 2
  printf '\n%s\n' "$label"
  printf '%-18s %6s  %5s %5s   %-22s %s\n' BEAT TIME YMIN YLOW "effective bg (blended)" "contrast vs ink"
  printf '%s\n' "----------------------------------------------------------------------------------------"
  for row in "$@"; do
    [ -z "$row" ] && continue
    name=$(echo "$row" | cut -d'|' -f1 | sed 's/ *$//')
    t=$(echo "$row"    | cut -d'|' -f2 | tr -d ' ')
    crop=$(echo "$row" | cut -d'|' -f3 | tr -d ' ')

    stats=$(ffmpeg -v error -ss "$t" -i "$V" -frames:v 1 \
            -vf "crop=$crop,signalstats,metadata=mode=print:file=-" -f null - 2>/dev/null)
    ymin=$(echo "$stats" | grep -m1 'signalstats.YMIN' | sed 's/.*=//')
    ylow=$(echo "$stats" | grep -m1 'signalstats.YLOW' | sed 's/.*=//')
    [ -z "$ymin" ] && { echo "$name: ffmpeg gave no stats"; continue; }

    read -r bg ratio worstnew <<EOF
$(awk -v ymin="$ymin" -v a="$a" -v pearl="$PEARL" -v w="$worst" '
  function lin(c){ c=c/255; return (c<=0.04045)? c/12.92 : ((c+0.055)/1.055)^2.4 }
  BEGIN{
    bg = ymin*(1-a) + pearl*a;              # the scrim lightens the worst pixel
    Lbg = 0.2126*lin(bg)+0.7152*lin(bg)+0.0722*lin(bg);
    # ink #0E1330
    Li = 0.2126*lin(14)+0.7152*lin(19)+0.0722*lin(48);
    r = (Lbg+0.05)/(Li+0.05);
    if (r<w) w=r;
    printf "%.0f %.2f %.4f", bg, r, w;
  }')
EOF
    worst=$worstnew
    flag=$(awk -v r="$ratio" 'BEGIN{print (r>=4.5)?"PASS":((r>=3.0)?"thin (large text only)":"FAIL")}')
    printf '%-18s %6s  %5s %5s   %-22s %5.2f:1  %s\n' "$name" "$t" "$ymin" "$ylow" "$bg / 255" "$ratio" "$flag"
  done
}

audit "DESKTOP RAILS  (1280x720 frame, scrim ${SCRIM_A})" "$SCRIM_A" "${BEATS[@]}"
audit "PHONE CUT      (332px centre column, scrim ${MOBILE_A})" "$MOBILE_A" "${MOBILE[@]}"

printf '\n%s\n' "----------------------------------------------------------------------------------------"
awk -v w="$worst" 'BEGIN{printf "WORST CAPTION ON THE WHOLE PAGE: %.2f:1  -> %s\n", w, (w>=4.5)?"PASS":((w>=3.0)?"THIN":"FAIL")}'

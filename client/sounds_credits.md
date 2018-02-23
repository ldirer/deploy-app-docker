correct: https://freesound.org/people/Bertrof/sounds/351566/
wrong: https://freesound.org/people/Autistic%20Lucario/sounds/142608/
stamp: Balloon Popping-SoundBible.com-1247261379

Sounds converted to mp3 with:
for f in *wav; do ffmpeg -i $f -vn -ar 44100 -ac 2 -ab 192k -f mp3 $f.mp3 ;done;



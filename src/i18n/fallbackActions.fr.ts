const fallbackActionsFr: string[] = [
  // 1
  'Ferme les yeux et respire profondément pendant 60 secondes.',
  // 2
  'Regarde le ciel. Observe-le vraiment.',
  // 3
  "Pense à quelqu'un que tu aimes. Envoie-lui de la lumière.",
  // 4
  'Place ta main sur ton cœur et respire profondément.',
  // 5
  'Pense à tous les humains qui font cette action avec toi, maintenant.',
  // 6
  "Écoute le son le plus lointain que tu puisses percevoir.",
  // 7
  "Sens l'air entrer et sortir de tes narines, lentement.",
  // 8
  "Observe tes mains comme si tu les voyais pour la première fois.",
  // 9
  'Nomme intérieurement trois choses pour lesquelles tu es reconnaissant.',
  // 10
  "Imagine une lumière dorée qui enveloppe tout ton corps.",
  // 11
  'Pose tes pieds bien à plat sur le sol et ressens la terre sous toi.',
  // 12
  "Écoute ta respiration comme on écoute la mer.",
  // 13
  "Pense à un souvenir heureux. Laisse-le t'envahir doucement.",
  // 14
  'Regarde autour de toi et trouve quelque chose de beau.',
  // 15
  'Inspire sur quatre temps, retiens sur quatre temps, expire sur quatre temps.',
  // 16
  'Détends ta mâchoire. Relâche tes épaules. Respire.',
  // 17
  "Envoie une pensée de paix à quelqu'un qui souffre.",
  // 18
  'Touche une surface près de toi. Explore sa texture du bout des doigts.',
  // 19
  'Ferme les yeux et imagine un lac parfaitement calme.',
  // 20
  'Écoute les sons autour de toi sans les juger, sans les nommer.',
  // 21
  'Respire comme si tu respirais pour la première fois.',
  // 22
  "Pense à une personne qui t'a aidé. Remercie-la en silence.",
  // 23
  "Observe la lumière dans la pièce. D'où vient-elle ? Comment se pose-t-elle ?",
  // 24
  'Place une main sur ton ventre et sens-le monter et descendre.',
  // 25
  'Imagine que tu es un arbre. Tes pieds sont des racines.',
  // 26
  'Souris doucement, même sans raison. Observe ce que cela change.',
  // 27
  'Regarde un objet proche pendant 30 secondes sans détourner le regard.',
  // 28
  "Pense au chemin que tu as parcouru cette année. Sois fier de toi.",
  // 29
  "Expire très lentement, comme si tu soufflais sur une bougie sans l'éteindre.",
  // 30
  'Sens le poids de ton corps sur la chaise, sur le sol, sur la terre.',
  // 31
  'Imagine une vague douce qui emporte toutes tes tensions.',
  // 32
  'Écoute le silence entre les sons.',
  // 33
  'Pense à un lieu où tu te sens en sécurité. Transporte-toi là-bas.',
  // 34
  'Observe les couleurs autour de toi. Nomme-les une par une.',
  // 35
  'Respire profondément et murmure intérieurement : tout va bien.',
  // 36
  "Sens la température de l'air sur ta peau.",
  // 37
  'Pense à demain avec douceur, sans attente, sans peur.',
  // 38
  'Ferme les yeux et écoute ton cœur battre.',
  // 39
  'Regarde tes pieds. Remercie-les de te porter chaque jour.',
  // 40
  "Imagine que chaque inspiration t'apporte de la lumière.",
  // 41
  'Pense à un ami lointain et envoie-lui une pensée chaleureuse.',
  // 42
  'Observe le mouvement de ta poitrine quand tu respires.',
  // 43
  'Touche ton visage doucement, comme pour le découvrir.',
  // 44
  'Imagine un jardin secret où tu es le seul visiteur.',
  // 45
  "Écoute le bruit de fond de ce moment. Que raconte-t-il ?",
  // 46
  "Pense à un repas que tu as aimé. Rappelle-toi les saveurs.",
  // 47
  "Respire en imaginant que l'air est de couleur bleue.",
  // 48
  "Observe l'ombre la plus proche. Quelle forme dessine-t-elle ?",
  // 49
  "Envoie de la gratitude à ton corps pour tout ce qu'il fait en silence.",
  // 50
  'Ferme les yeux et imagine que tu flottes sur un nuage.',
  // 51
  'Pense à un mot qui te fait du bien. Répète-le trois fois en toi.',
  // 52
  'Sens le contact de tes vêtements sur ta peau.',
  // 53
  'Regarde par la fenêtre et observe le premier mouvement que tu vois.',
  // 54
  'Inspire la paix. Expire la tension.',
  // 55
  'Imagine que tu envoies de la douceur à chaque cellule de ton corps.',
  // 56
  "Pense à la personne qui t'a donné le plus beau sourire aujourd'hui.",
  // 57
  'Pose ta langue contre ton palais et relâche tout le reste.',
  // 58
  'Écoute ta respiration comme une musique lente et régulière.',
  // 59
  "Regarde le sol. Observe chaque détail que tu n'avais pas remarqué.",
  // 60
  'Imagine un fil doré qui te relie au centre de la terre.',
  // 61
  'Pense à un enfant que tu connais. Souhaite-lui un monde lumineux.',
  // 62
  "Respire en comptant tes inspirations. Arrive jusqu'à dix.",
  // 63
  'Observe ta posture. Redresse-toi doucement, sans forcer.',
  // 64
  "Touche le dos de ta main avec l'autre main. Ressens la chaleur.",
  // 65
  'Imagine que la pièce où tu es est remplie de lumière douce.',
  // 66
  'Pense à ce que tu fais bien. Accueille cette pensée avec tendresse.',
  // 67
  "Ferme les yeux et sens l'espace autour de toi sans le voir.",
  // 68
  "Écoute un son proche et essaie d'en percevoir toutes les nuances.",
  // 69
  'Regarde tes doigts bouger lentement, un par un.',
  // 70
  'Imagine une pluie fine et tiède qui lave toutes tes inquiétudes.',
  // 71
  "Pense à quelqu'un qui t'inspire. Que t'enseigne cette personne ?",
  // 72
  "Respire par la bouche comme si tu soufflais de la buée sur une vitre.",
  // 73
  'Observe le rythme de ta respiration sans chercher à le changer.',
  // 74
  'Sens la gravité qui te maintient ancré à cette terre.',
  // 75
  "Imagine que tu regardes le monde depuis le sommet d'une montagne.",
  // 76
  'Pense à un son que tu aimes. Rejoue-le dans ta tête.',
  // 77
  'Place tes deux mains sur tes genoux et respire calmement.',
  // 78
  'Ferme les yeux et imagine un coucher de soleil sur la mer.',
  // 79
  'Regarde la paume de ta main. Lis-y toute ton histoire.',
  // 80
  "Envoie de l'amour à quelqu'un que tu trouves difficile à aimer.",
  // 81
  'Imagine que chaque expiration emporte un souci loin de toi.',
  // 82
  "Écoute ta voix intérieure. Que dit-elle en ce moment ?",
  // 83
  "Pense au goût de l'eau fraîche. Imagine-la couler dans ta gorge.",
  // 84
  "Observe la ligne d'horizon, réelle ou imaginaire.",
  // 85
  'Respire comme la mer : inspire comme la vague monte, expire comme elle redescend.',
  // 86
  "Sens l'appui de ta tête sur tes cervicales. Relâche le cou.",
  // 87
  'Pense à un endroit de nature que tu aimes. Visualise chaque détail.',
  // 88
  'Imagine que tu es fait de lumière et que chaque cellule brille.',
  // 89
  'Ferme les yeux et compte cinq sons différents autour de toi.',
  // 90
  'Regarde le plafond. Observe-le comme un ciel intérieur.',
  // 91
  'Pense à une qualité que tu admires chez toi.',
  // 92
  'Touche tes lèvres du bout des doigts et respire doucement.',
  // 93
  'Imagine un papillon qui se pose sur ton épaule.',
  // 94
  'Écoute le son de ta propre respiration comme un mantra.',
  // 95
  'Respire en gonflant ton ventre comme un ballon, puis relâche.',
  // 96
  'Observe les lignes et les formes autour de toi. Rien que les formes.',
  // 97
  'Pense à un moment de rire. Laisse le souvenir te réchauffer.',
  // 98
  "Sens le mouvement subtil de l'air dans la pièce.",
  // 99
  'Imagine que tu es un oiseau qui survole un paysage paisible.',
  // 100
  'Ferme les yeux et visualise une forêt profonde et silencieuse.',
  // 101
  "Pense à quelqu'un que tu n'as pas vu depuis longtemps. Souhaite-lui le meilleur.",
  // 102
  'Pose tes mains à plat sur une surface. Ressens la fraîcheur ou la chaleur.',
  // 103
  "Respire en allongeant chaque expiration un peu plus que la précédente.",
  // 104
  'Observe la texture du mur le plus proche.',
  // 105
  "Imagine un océan calme à l'intérieur de ta poitrine.",
  // 106
  "Pense au parfum de quelque chose que tu aimes. Retrouve-le en pensée.",
  // 107
  "Écoute comme si tes oreilles s'ouvraient pour la première fois.",
  // 108
  'Regarde la lumière jouer sur les surfaces autour de toi.',
  // 109
  'Sens la différence de température entre tes mains et ton visage.',
  // 110
  "Imagine que le temps s'arrête et qu'il ne reste que cet instant.",
  // 111
  'Pense à une promesse que tu veux te faire, avec bienveillance.',
  // 112
  'Ferme les yeux et imagine un champ de lavande infini.',
  // 113
  "Respire en pensant au mot « calme » à chaque inspiration.",
  // 114
  'Observe le reflet de la lumière dans tes yeux, dans un miroir imaginaire.',
  // 115
  "Touche ton poignet et sens ton pouls. C'est le rythme de ta vie.",
  // 116
  "Pense à un livre qui t'a touché. Rappelle-toi pourquoi.",
  // 117
  'Imagine une rivière qui coule lentement, emportant tes pensées.',
  // 118
  'Écoute le battement de ton cœur comme un tambour lointain.',
  // 119
  'Regarde tes ongles. Observe leur forme, leur couleur.',
  // 120
  "Pense à ce que tu aimerais dire à l'enfant que tu étais.",
  // 121
  "Respire profondément et imagine que l'air est chargé de gratitude.",
  // 122
  'Sens la solidité du sol qui te porte depuis toujours.',
  // 123
  'Observe un objet ordinaire et trouve-lui une beauté cachée.',
  // 124
  "Pense à un acte de gentillesse que quelqu'un a eu envers toi.",
  // 125
  "Imagine que tu es entouré d'un halo de paix invisible.",
  // 126
  "Ferme les yeux et sens l'espace derrière tes paupières.",
  // 127
  'Écoute le silence comme on écoute une mélodie.',
  // 128
  'Place ta main sur ton front et respire lentement.',
  // 129
  'Pense à un lever de soleil. Imagine ses couleurs, sa chaleur naissante.',
  // 130
  'Regarde tes avant-bras. Observe les veines qui portent ta vie.',
  // 131
  'Imagine que tu plonges dans une eau turquoise et tiède.',
  // 132
  "Respire par le nez en imaginant que l'air parfume l'intérieur de ton crâne.",
  // 133
  'Observe le mouvement le plus subtil que tu peux percevoir autour de toi.',
  // 134
  'Pense à ton animal préféré. Imagine-le paisible à tes côtés.',
  // 135
  'Sens le poids de tes bras le long de ton corps.',
  // 136
  'Imagine que ta colonne vertébrale est une tige de bambou : souple et forte.',
  // 137
  "Ferme les yeux et imagine le bruit de la pluie sur un toit.",
  // 138
  'Pense à un mot en français que tu trouves magnifique. Savoure-le.',
  // 139
  'Écoute le son de tes propres pas quand tu marches, en pensée.',
  // 140
  'Respire comme si chaque souffle était un cadeau.',
  // 141
  'Observe la teinte exacte de la lumière en ce moment.',
  // 142
  'Pense à ta boisson préférée. Imagine sa chaleur ou sa fraîcheur.',
  // 143
  "Imagine que tu es un rocher lisse au bord de l'eau.",
  // 144
  'Touche tes cheveux doucement. Sens leur texture sous tes doigts.',
  // 145
  'Pense à un paysage qui te fait rêver. Laisse-toi y transporter.',
  // 146
  "Ferme les yeux et imagine le chant d'un oiseau au petit matin.",
  // 147
  "Respire en imaginant que l'air entre par le sommet de ta tête.",
  // 148
  'Regarde le point le plus éloigné que tu puisses voir.',
  // 149
  "Sens la chaleur de tes paumes de main l'une contre l'autre.",
  // 150
  "Pense à un geste simple que tu peux offrir à quelqu'un aujourd'hui.",
  // 151
  'Imagine que le vent emporte doucement tout ce qui te pèse.',
  // 152
  'Écoute ta respiration et ralentis-la un tout petit peu.',
  // 153
  'Observe les nuances de blanc ou de gris dans le ciel.',
  // 154
  "Pense à un coucher de soleil que tu n'oublieras jamais.",
  // 155
  "Respire en dessinant un cercle dans l'air avec ton doigt.",
  // 156
  "Sens la douceur de l'air quand il touche ta peau.",
  // 157
  'Imagine que chaque cellule de ton corps te dit merci.',
  // 158
  "Ferme les yeux et pense à l'odeur de la terre après la pluie.",
  // 159
  'Regarde la plus petite chose que tu puisses voir autour de toi.',
  // 160
  'Pense à une chanson qui te touche. Fredonne-la intérieurement.',
  // 161
  'Place tes deux mains sur ton ventre et respire dans tes mains.',
  // 162
  'Observe ton ombre si tu en as une. Elle te suit fidèlement.',
  // 163
  'Imagine un feu de cheminée doux et crépitant devant toi.',
  // 164
  "Pense à un professeur ou un mentor qui a changé ta vie.",
  // 165
  "Écoute le rythme caché de l'endroit où tu te trouves.",
  // 166
  'Respire et dis-toi intérieurement : je suis exactement où je dois être.',
  // 167
  "Sens le contact de l'air sur le bout de ton nez.",
  // 168
  'Regarde le jeu des ombres et des lumières autour de toi.',
  // 169
  "Pense à un océan immense. Tu es une goutte et tu es l'océan tout entier.",
  // 170
  'Imagine que tu marches pieds nus sur du sable chaud.',
  // 171
  'Ferme les yeux et écoute le son le plus doux que tu puisses imaginer.',
  // 172
  "Touche le tissu le plus proche. Quelle est sa texture ?",
  // 173
  'Pense à ta respiration comme un fil qui te relie au présent.',
  // 174
  'Observe le rythme de tes clignements de paupières.',
  // 175
  "Imagine que tu es assis au sommet d'une colline au lever du jour.",
  // 176
  "Respire en imaginant que tu inspires du courage.",
  // 177
  'Pense à trois choses simples qui te rendent heureux.',
  // 178
  'Sens la distance entre toi et le plafond au-dessus de ta tête.',
  // 179
  'Écoute comme un musicien : chaque son est une note.',
  // 180
  'Regarde un point fixe et laisse le reste du monde devenir flou.',
  // 181
  'Pense à la dernière fois que tu as ri aux éclats.',
  // 182
  'Imagine un arc-en-ciel qui traverse le ciel devant toi.',
  // 183
  "Ferme les yeux et sens la frontière entre ton corps et l'air.",
  // 184
  "Respire en pensant à quelqu'un qui respire au même moment que toi.",
  // 185
  'Observe les minuscules détails du bout de tes doigts.',
  // 186
  'Pense à ce qui te rend unique. Accueille-le avec tendresse.',
  // 187
  'Imagine une étoile filante qui traverse ton ciel intérieur.',
  // 188
  'Écoute le son de ton souffle comme le vent dans les arbres.',
  // 189
  'Place ta main sur ta nuque et envoie-lui de la chaleur.',
  // 190
  'Pense à un voyage que tu aimerais faire. Imagine le premier pas.',
  // 191
  'Respire profondément et relâche chaque muscle de ton visage.',
  // 192
  'Observe la forme des nuages ou imagine-les si le ciel est caché.',
  // 193
  "Sens la stabilité de tes os à l'intérieur de ton corps.",
  // 194
  'Imagine que ta peau respire avec toi.',
  // 195
  'Pense à un fleuve qui coule vers la mer, patient et constant.',
  // 196
  "Ferme les yeux et imagine le silence d'un sommet enneigé.",
  // 197
  "Regarde tes mains et imagine tout ce qu'elles ont créé.",
  // 198
  "Écoute le son que fait le silence quand tu l'écoutes vraiment.",
  // 199
  'Pense à la personne qui te connaît le mieux. Souris-lui en pensée.',
  // 200
  "Respire et sens l'espace que tu occupes dans le monde.",
  // 201
  "Imagine que tu es une feuille qui tombe doucement d'un arbre.",
  // 202
  'Touche ton sternum et sens la vibration de ta voix intérieure.',
  // 203
  'Observe la première couleur qui attire ton regard.',
  // 204
  'Pense à un instant parfait de ta vie. Revis-le en douceur.',
  // 205
  'Sens la symétrie de ton corps : gauche et droite, en miroir.',
  // 206
  'Imagine une cascade de lumière qui purifie tes pensées.',
  // 207
  'Ferme les yeux et imagine que tu es dans un temple de silence.',
  // 208
  "Respire et imagine que ton souffle dessine un huit couché : l'infini.",
  // 209
  'Écoute ton corps. Quelle partie demande ton attention ?',
  // 210
  'Regarde le ciel et rappelle-toi que tu es sous le même ciel que ceux que tu aimes.',
  // 211
  'Pense à un artisan qui fabrique quelque chose avec amour. Admire sa patience.',
  // 212
  "Imagine que tu es un phare qui envoie de la lumière dans la nuit.",
  // 213
  'Sens la courbe de ton dos. Accueille sa forme sans la corriger.',
  // 214
  'Pense à un fruit que tu aimes. Imagine son goût, sa texture, son parfum.',
  // 215
  'Respire en imaginant que tu gonfles une bulle de savon parfaite.',
  // 216
  'Observe le mouvement de tes pensées comme des nuages qui passent.',
  // 217
  'Ferme les yeux et imagine le bruissement des feuilles dans le vent.',
  // 218
  "Pense à un compliment sincère que tu pourrais offrir à quelqu'un.",
  // 219
  'Écoute le ronronnement discret du monde autour de toi.',
  // 220
  "Place tes mains en coupe devant toi, comme pour recueillir de l'eau.",
  // 221
  "Imagine que tu plantes une graine de paix dans le sol de ton esprit.",
  // 222
  'Pense à ton souffle comme à une marée intérieure.',
  // 223
  "Observe la distance entre toi et l'objet le plus proche.",
  // 224
  'Sens la vie dans le bout de tes doigts : ce léger picotement.',
  // 225
  "Respire en pensant au mot « douceur » à chaque expiration.",
  // 226
  "Pense à quelqu'un qui travaille en ce moment pour que tu sois en sécurité.",
  // 227
  'Imagine que tu entends au loin une cloche qui résonne longuement.',
  // 228
  'Ferme les yeux et visualise une nuit étoilée au-dessus de toi.',
  // 229
  "Regarde un objet et imagine son voyage jusqu'à toi.",
  // 230
  "Pense à ce que tu voudrais que demain t'apporte.",
  // 231
  'Sens la chaleur du soleil, réelle ou imaginaire, sur ton visage.',
  // 232
  'Écoute le silence entre deux sons, comme une pause musicale.',
  // 233
  "Imagine que ton esprit est un ciel vaste et tes pensées des oiseaux de passage.",
  // 234
  'Respire en posant une main sur ton cœur et une main sur ton ventre.',
  // 235
  'Observe la beauté des imperfections autour de toi.',
  // 236
  'Pense à la terre qui tourne sous tes pieds, silencieuse et fidèle.',
  // 237
  'Touche le bout de ton nez du bout du doigt. Souris.',
  // 238
  'Imagine que tu es un cerf-volant porté par un vent léger.',
  // 239
  "Pense à ce que tu ferais si tu n'avais peur de rien.",
  // 240
  'Ferme les yeux et imagine une plage déserte au crépuscule.',
  // 241
  "Respire et imagine que l'air a le parfum des fleurs.",
  // 242
  "Observe la façon dont la lumière change d'instant en instant.",
  // 243
  "Pense à un endroit que tu as découvert et qui t'a émerveillé.",
  // 244
  'Sens la pulsation de la vie partout dans ton corps.',
  // 245
  "Imagine que tu envoies une lettre d'amour à toi-même.",
  // 246
  'Écoute la mélodie cachée dans les bruits du quotidien.',
  // 247
  "Regarde tes pieds et imagine les milliers de pas qu'ils ont faits.",
  // 248
  "Pense à un geste tendre que quelqu'un a eu pour toi récemment.",
  // 249
  'Respire et visualise une sphère de lumière au centre de ta poitrine.',
  // 250
  "Place tes mains sur tes yeux fermés et accueille l'obscurité.",
  // 251
  'Imagine une forêt de bambous où le vent joue une symphonie.',
  // 252
  'Pense à un héros discret de ton quotidien. Remercie-le en silence.',
  // 253
  'Observe les variations de couleur dans un seul objet près de toi.',
  // 254
  'Sens le tissu de tes vêtements sur tes épaules.',
  // 255
  'Ferme les yeux et imagine que tu navigues sur un lac immobile.',
  // 256
  "Pense à un moment où tu as surmonté une difficulté. Tu es fort.",
  // 257
  'Respire en imaginant que ton souffle nourrit une flamme intérieure douce.',
  // 258
  'Écoute les sons aigus et les sons graves séparément.',
  // 259
  "Imagine que tes pieds sont des racines qui s'enfoncent dans la terre.",
  // 260
  "Pense à la dernière fois où le ciel t'a surpris par sa beauté.",
  // 261
  'Regarde autour de toi et trouve un cercle, un triangle, une ligne.',
  // 262
  'Sens le rythme naturel de ta respiration sans le modifier.',
  // 263
  'Imagine un jardin japonais avec un ruisseau et des pierres lisses.',
  // 264
  "Pense à quelqu'un qui a besoin de réconfort. Envoie-lui ta chaleur.",
  // 265
  "Respire et imagine que chaque inspiration élargit l'espace en toi.",
  // 266
  'Observe la façon dont ton corps est assis ou debout en ce moment.',
  // 267
  'Ferme les yeux et imagine le parfum de la menthe fraîche.',
  // 268
  'Touche une surface froide et sens la fraîcheur voyager dans ta main.',
  // 269
  "Pense à un rêve que tu as fait récemment. Que voulait-il te dire ?",
  // 270
  "Écoute le son de l'eau, réel ou imaginaire, couler quelque part.",
  // 271
  'Imagine que tu es un poisson dans une eau limpide et calme.',
  // 272
  'Pense à un lieu sacré pour toi. Transporte-toi là-bas un instant.',
  // 273
  'Respire en imaginant que tu expires de la brume argentée.',
  // 274
  'Observe la façon dont les ombres se déplacent avec la lumière.',
  // 275
  "Sens la douceur de l'air entrer dans tes poumons.",
  // 276
  'Pense à un geste que tu fais chaque jour sans y penser. Honore-le.',
  // 277
  'Ferme les yeux et visualise une aube rose et dorée.',
  // 278
  'Imagine une musique lointaine, douce et apaisante.',
  // 279
  'Regarde le mouvement de ta main quand tu la lèves lentement.',
  // 280
  'Pense à la beauté fragile de ce moment qui ne reviendra plus.',
  // 281
  'Respire et sens le calme qui existe déjà en toi.',
  // 282
  "Observe les espaces vides autour des objets. L'espace aussi existe.",
  // 283
  'Pense à un arbre que tu connais. Imagine ses racines sous la terre.',
  // 284
  'Écoute le bruit de ta respiration comme une berceuse.',
  // 285
  'Imagine que tu tiens entre tes mains une boule de lumière chaude.',
  // 286
  "Sens la frontière douce entre le sommeil et l'éveil.",
  // 287
  'Pense à la première chose que tu as vue en ouvrant les yeux ce matin.',
  // 288
  'Ferme les yeux et imagine un sentier de montagne baigné de soleil.',
  // 289
  "Touche le lobe de ton oreille. C'est doux, n'est-ce pas ?",
  // 290
  "Respire et laisse chaque pensée s'éloigner comme un bateau sur l'eau.",
  // 291
  'Observe le grain de ta peau de près.',
  // 292
  'Pense à la nuit qui vient et accueille-la avec sérénité.',
  // 293
  "Imagine que tu es un instrument de musique joué par le vent.",
  // 294
  "Écoute comme si chaque son était un message de l'univers.",
  // 295
  "Pense à un lieu d'enfance. Retrouve les odeurs, les sons, les couleurs.",
  // 296
  "Respire et imagine que tu es entouré de milliers de lucioles.",
  // 297
  'Sens la présence silencieuse de tes organes qui travaillent pour toi.',
  // 298
  'Regarde la texture du plafond ou du ciel au-dessus de toi.',
  // 299
  "Pense à un acte de courage dont tu es fier.",
  // 300
  "Imagine un champ de coquelicots ondulant sous la brise d'été.",
  // 301
  'Ferme les yeux et sens le poids réconfortant de tes paupières.',
  // 302
  'Respire en envoyant de la douceur dans chaque articulation.',
  // 303
  'Observe la façon dont ton regard se pose sur les choses.',
  // 304
  "Pense à un enseignement que la vie t'a offert cette semaine.",
  // 305
  "Écoute le silence de l'hiver, réel ou imaginaire, tout autour de toi.",
  // 306
  'Imagine que tu es un grain de sable sur une plage immense.',
  // 307
  'Sens la chaleur qui émane de ton propre corps.',
  // 308
  "Pense à un ancien ami. Souhaite-lui du bonheur, où qu'il soit.",
  // 309
  "Respire comme si l'air était fait de gratitude.",
  // 310
  "Regarde le reflet de la lumière sur une surface proche.",
  // 311
  "Imagine que tes soucis sont des feuilles mortes emportées par le vent d'automne.",
  // 312
  'Pense à ce que tu veux laisser aller. Libère-le avec ton souffle.',
  // 313
  'Observe un point de lumière et laisse-le remplir ta vision.',
  // 314
  'Ferme les yeux et imagine que tu respires avec les arbres.',
  // 315
  'Sens la paix dans les espaces entre tes doigts.',
  // 316
  "Pense à un inconnu que tu as croisé et qui t'a touché sans le savoir.",
  // 317
  'Écoute le premier son du printemps, réel ou rêvé.',
  // 318
  "Respire et imagine que l'air dessine des spirales en toi.",
  // 319
  "Imagine que tu es une montagne que rien ne peut ébranler.",
  // 320
  'Pense à la lune. Elle est là, même quand tu ne la vois pas.',
  // 321
  "Touche le creux de ta main. C'est un paysage minuscule.",
  // 322
  "Observe la façon dont l'air bouge autour de toi, invisible et présent.",
  // 323
  "Pense à ton corps comme à un instrument précieux. Prends-en soin.",
  // 324
  'Respire et imagine un horizon infini devant toi.',
  // 325
  'Ferme les yeux et imagine le goût du miel sur ta langue.',
  // 326
  'Sens la légèreté de tes cils quand tu fermes les yeux.',
  // 327
  'Pense à une saison que tu aimes et rappelle-toi pourquoi.',
  // 328
  "Écoute le bourdonnement de l'été, réel ou imaginaire.",
  // 329
  "Imagine que chaque battement de ton cœur est un mot d'amour.",
  // 330
  "Regarde la plus belle chose que tu puisses voir d'ici.",
  // 331
  'Pense à la pluie comme un cadeau que le ciel offre à la terre.',
  // 332
  'Respire et imagine que tu es dans un hamac sous les étoiles.',
  // 333
  'Observe la façon dont les choses proches et lointaines coexistent.',
  // 334
  "Sens le silence à l'intérieur de tes os.",
  // 335
  'Imagine que tu es un peintre et que ce moment est ta toile.',
  // 336
  "Pense à la voix de quelqu'un que tu aimes. Écoute-la en toi.",
  // 337
  "Ferme les yeux et imagine un ciel d'été parsemé de nuages légers.",
  // 338
  'Touche ton pouce et ton index ensemble et crée un cercle parfait.',
  // 339
  "Pense à l'eau que tu as bue aujourd'hui. Remercie-la.",
  // 340
  'Écoute le battement du monde sous le bruit apparent.',
  // 341
  'Respire et laisse ton corps devenir un peu plus lourd, un peu plus calme.',
  // 342
  'Observe les ombres comme des présences douces et silencieuses.',
  // 343
  'Imagine que tu libères un oiseau que tu tenais dans tes mains.',
  // 344
  "Pense à un moment de silence partagé avec quelqu'un.",
  // 345
  'Sens la rondeur de la terre sous tes pieds.',
  // 346
  'Regarde un objet familier et vois-le comme un voyageur le verrait.',
  // 347
  "Pense à l'air que tu partages avec tous les êtres vivants.",
  // 348
  'Ferme les yeux et imagine une éclaircie après la pluie.',
  // 349
  "Respire comme si chaque souffle racontait une histoire.",
  // 350
  'Imagine que tu es un gardien de phare veillant sur la nuit.',
  // 351
  'Pense à ce qui te relie aux autres en ce moment même.',
  // 352
  'Écoute le son de ta respiration et laisse-le bercer tes pensées.',
  // 353
  "Observe le contraste entre la lumière et l'ombre autour de toi.",
  // 354
  "Sens la patience de ton corps qui attend que tu lui prêtes attention.",
  // 355
  "Imagine un flocon de neige qui tombe lentement dans le silence de l'hiver.",
  // 356
  'Pense à un talent caché que tu possèdes. Reconnais-le.',
  // 357
  "Respire et imagine que tu inspires la lumière des étoiles.",
  // 358
  'Touche ton cœur à travers ta poitrine et dis-lui merci.',
  // 359
  'Pense à la prochaine personne que tu vas voir. Prépare-lui un sourire.',
  // 360
  'Ferme les yeux et imagine que tu es bercé par le mouvement lent de la terre.',
  // 361
  "Regarde le monde autour de toi comme si c'était la première fois.",
  // 362
  'Pense à ce moment précis comme un cadeau que tu te fais.',
  // 363
  'Respire et sache que tu es vivant, et que cela suffit.',
  // 364
  'Imagine que la paix du monde commence par cette respiration.',
  // 365
  'Ouvre les yeux doucement, comme au premier matin du monde, et accueille ce qui vient.',
];

export default fallbackActionsFr;

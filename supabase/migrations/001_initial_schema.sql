-- =============================================
-- NOW App - Schema initial
-- =============================================

-- Actions quotidiennes (une par jour de l'année, clé = 'MM-DD')
CREATE TABLE daily_actions (
  date TEXT PRIMARY KEY,                    -- Format: 'MM-DD'
  action_text TEXT NOT NULL,                -- Texte en français
  action_text_en TEXT,                      -- Texte en anglais (futur i18n)
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Participations anonymes
CREATE TABLE participations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  participated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  date TEXT NOT NULL,                       -- Format: 'YYYY-MM-DD' (date locale du participant)
  tz_offset SMALLINT NOT NULL,             -- Offset UTC en heures (-12 à +14)
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour les requêtes d'agrégation
CREATE INDEX idx_participations_date_tz ON participations (date, tz_offset);
CREATE INDEX idx_participations_date ON participations (date);

-- =============================================
-- Row Level Security
-- =============================================

ALTER TABLE daily_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique des actions"
  ON daily_actions FOR SELECT
  USING (true);

ALTER TABLE participations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Insertion anonyme des participations"
  ON participations FOR INSERT
  WITH CHECK (true);

-- Pas de SELECT sur participations individuelles (privacy)
-- L'accès se fait uniquement via les fonctions RPC agrégées

-- =============================================
-- Fonctions RPC
-- =============================================

-- Nombre de participations pour une date (et optionnellement un fuseau)
CREATE OR REPLACE FUNCTION get_participation_count(
  target_date TEXT,
  target_tz SMALLINT DEFAULT NULL
)
RETURNS BIGINT AS $$
BEGIN
  IF target_tz IS NULL THEN
    RETURN (SELECT COUNT(*) FROM participations WHERE date = target_date);
  ELSE
    RETURN (SELECT COUNT(*) FROM participations WHERE date = target_date AND tz_offset = target_tz);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Participations groupées par fuseau horaire (pour la carte monde)
CREATE OR REPLACE FUNCTION get_participation_by_timezone(target_date TEXT)
RETURNS TABLE (tz_offset SMALLINT, participant_count BIGINT) AS $$
BEGIN
  RETURN QUERY
    SELECT p.tz_offset, COUNT(*) as participant_count
    FROM participations p
    WHERE p.date = target_date
    GROUP BY p.tz_offset
    ORDER BY p.tz_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Action du jour (par 'MM-DD')
CREATE OR REPLACE FUNCTION get_today_action(month_day TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT action_text FROM daily_actions WHERE date = month_day);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- Seed : 31 premières actions (février + début mars)
-- =============================================
INSERT INTO daily_actions (date, action_text, action_text_en) VALUES
  ('01-01', 'Ferme les yeux et fais un voeu pour l''humanité.', 'Close your eyes and make a wish for humanity.'),
  ('01-15', 'Place ta main sur ton coeur et respire profondément.', 'Place your hand on your heart and breathe deeply.'),
  ('02-01', 'Regarde par la fenêtre et observe le ciel pendant 60 secondes.', 'Look out the window and watch the sky for 60 seconds.'),
  ('02-02', 'Pense à quelqu''un que tu as perdu. Envoie-lui une pensée.', 'Think of someone you have lost. Send them a thought.'),
  ('02-03', 'Ferme les yeux et écoute tous les sons autour de toi.', 'Close your eyes and listen to every sound around you.'),
  ('02-04', 'Souris. Juste souris. Pendant 60 secondes.', 'Smile. Just smile. For 60 seconds.'),
  ('02-05', 'Regarde tes mains. Pense à tout ce qu''elles ont fait pour toi.', 'Look at your hands. Think about everything they have done for you.'),
  ('02-06', 'Respire profondément 5 fois, très lentement.', 'Breathe deeply 5 times, very slowly.'),
  ('02-07', 'Pense à quelqu''un que tu aimes. Envoie-lui de la lumière.', 'Think of someone you love. Send them light.'),
  ('02-08', 'Reste parfaitement immobile pendant 30 secondes, puis bouge doucement.', 'Stay perfectly still for 30 seconds, then move gently.'),
  ('02-09', 'Regarde le ciel. Cherche quelque chose de beau.', 'Look at the sky. Find something beautiful.'),
  ('02-10', 'Pense à un souvenir heureux. Laisse-le t''envahir.', 'Think of a happy memory. Let it fill you.'),
  ('02-11', 'Pose tes pieds bien à plat sur le sol. Sens la terre sous toi.', 'Place your feet flat on the ground. Feel the earth beneath you.'),
  ('02-12', 'Regarde autour de toi et trouve trois choses dont tu es reconnaissant.', 'Look around and find three things you are grateful for.'),
  ('02-13', 'Ferme les yeux et imagine un endroit où tu te sens en paix.', 'Close your eyes and imagine a place where you feel at peace.'),
  ('02-14', 'Pense à quelqu''un et envoie-lui silencieusement tout ton amour.', 'Think of someone and silently send them all your love.'),
  ('02-15', 'Étire doucement ton corps. Remercie-le d''être là.', 'Gently stretch your body. Thank it for being here.'),
  ('02-16', 'Regarde la lumière la plus proche de toi. Observe-la vraiment.', 'Look at the nearest light. Really observe it.'),
  ('02-17', 'Inspire par le nez, expire par la bouche. Répète 10 fois.', 'Breathe in through your nose, out through your mouth. Repeat 10 times.'),
  ('02-18', 'Pense à un inconnu croisé récemment. Souhaite-lui du bonheur.', 'Think of a stranger you passed recently. Wish them happiness.'),
  ('02-19', 'Touche quelque chose près de toi. Concentre-toi sur la texture.', 'Touch something near you. Focus on the texture.'),
  ('02-20', 'Regarde par la fenêtre. Observe le mouvement de la vie dehors.', 'Look out the window. Watch the movement of life outside.'),
  ('02-21', 'Ferme les yeux. Écoute ton propre souffle.', 'Close your eyes. Listen to your own breath.'),
  ('02-22', 'Pense à un mot qui te résume aujourd''hui.', 'Think of one word that sums you up today.'),
  ('02-23', 'Lève les yeux vers le plafond ou le ciel. Sens l''espace au-dessus.', 'Look up at the ceiling or sky. Feel the space above.'),
  ('02-24', 'Pense à quelqu''un qui t''a aidé un jour. Remercie-le en pensée.', 'Think of someone who helped you once. Thank them in your mind.'),
  ('02-25', 'Détends tes épaules. Relâche ta mâchoire. Respire.', 'Relax your shoulders. Unclench your jaw. Breathe.'),
  ('02-26', 'Regarde l''arbre ou la plante la plus proche. Observe-la vivre.', 'Look at the nearest tree or plant. Watch it live.'),
  ('02-27', 'Ferme les yeux et compte lentement jusqu''à 10.', 'Close your eyes and slowly count to 10.'),
  ('02-28', 'Pense à demain. Envoie de la bienveillance à ton futur toi.', 'Think about tomorrow. Send kindness to your future self.'),
  ('03-01', 'Regarde tes pieds. Pense à tous les chemins qu''ils ont parcourus.', 'Look at your feet. Think about all the paths they have walked.'),
  ('03-15', 'Trouve le son le plus lointain que tu peux entendre.', 'Find the most distant sound you can hear.'),
  ('04-01', 'Regarde le ciel et cherche une forme dans les nuages.', 'Look at the sky and find a shape in the clouds.'),
  ('05-01', 'Sens l''air sur ta peau. Remercie ce moment d''être vivant.', 'Feel the air on your skin. Be grateful for this moment of being alive.'),
  ('06-01', 'Pense à l''océan. Imagine ses vagues, son immensité.', 'Think about the ocean. Imagine its waves, its vastness.'),
  ('07-01', 'Lève la tête vers le soleil (ou là où il serait). Sens sa chaleur.', 'Look up toward the sun (or where it would be). Feel its warmth.'),
  ('08-01', 'Pense à un enfant que tu connais. Souhaite-lui un bel avenir.', 'Think of a child you know. Wish them a bright future.'),
  ('09-01', 'Ferme les yeux et imagine que tu es dans une forêt.', 'Close your eyes and imagine you are in a forest.'),
  ('10-01', 'Regarde tes mains et pense à tout l''amour qu''elles ont donné.', 'Look at your hands and think of all the love they have given.'),
  ('11-01', 'Pense à quelqu''un qui est seul ce soir. Envoie-lui de la chaleur.', 'Think of someone who is alone tonight. Send them warmth.'),
  ('12-01', 'Respire et dis-toi : je suis exactement où je dois être.', 'Breathe and tell yourself: I am exactly where I need to be.'),
  ('12-25', 'Pense à tous les humains qui font cette action avec toi, maintenant.', 'Think about all the humans doing this action with you, right now.'),
  ('12-31', 'Ferme les yeux. Remercie cette année. Accueille la suivante.', 'Close your eyes. Thank this year. Welcome the next one.');

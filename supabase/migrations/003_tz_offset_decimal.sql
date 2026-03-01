-- =============================================
-- Migration : tz_offset SMALLINT → NUMERIC(4,2)
-- Support des fuseaux horaires demi-heure (Inde +5.5, Népal +5.75, etc.)
-- =============================================

-- Changer le type de la colonne
ALTER TABLE participations
  ALTER COLUMN tz_offset TYPE NUMERIC(4,2) USING tz_offset::NUMERIC(4,2);

-- Recréer les fonctions RPC avec le bon type de paramètre

CREATE OR REPLACE FUNCTION get_participation_count(
  target_date TEXT,
  target_tz NUMERIC DEFAULT NULL
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

CREATE OR REPLACE FUNCTION get_participation_by_timezone(target_date TEXT)
RETURNS TABLE (tz_offset NUMERIC, participant_count BIGINT) AS $$
BEGIN
  RETURN QUERY
    SELECT p.tz_offset, COUNT(*) as participant_count
    FROM participations p
    WHERE p.date = target_date
    GROUP BY p.tz_offset
    ORDER BY p.tz_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

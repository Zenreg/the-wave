-- Remplace la RPC get_today_action pour supporter un paramètre lang
CREATE OR REPLACE FUNCTION get_today_action(month_day TEXT, lang TEXT DEFAULT 'fr')
RETURNS TEXT AS $$
BEGIN
  IF lang = 'en' THEN
    RETURN (
      SELECT COALESCE(action_text_en, action_text)
      FROM daily_actions
      WHERE date = month_day
    );
  END IF;

  RETURN (SELECT action_text FROM daily_actions WHERE date = month_day);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

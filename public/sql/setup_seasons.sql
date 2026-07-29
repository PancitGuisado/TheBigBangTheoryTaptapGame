-- Setup Game Settings Table
CREATE TABLE IF NOT EXISTS game_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL
);

-- Insert initial current season (Season 1)
INSERT INTO game_settings (key, value) VALUES ('current_season', '{"id": 1, "name": "Season 1", "active": true}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Setup Season History Table
CREATE TABLE IF NOT EXISTS season_history (
    id SERIAL PRIMARY KEY,
    season_id INTEGER UNIQUE NOT NULL,
    name TEXT NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    leaderboard_data JSONB NOT NULL
);

-- Allow public read access to season_history and game_settings
ALTER TABLE game_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Settings" ON game_settings FOR SELECT USING (true);

ALTER TABLE season_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Season History" ON season_history FOR SELECT USING (true);

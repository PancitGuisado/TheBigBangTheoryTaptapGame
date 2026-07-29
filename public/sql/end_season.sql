-- 1. Archive the current Top 50 to season_history
WITH current_top_50 AS (
    SELECT jsonb_agg(row_to_json(t)) as data
    FROM (
        SELECT * FROM leaderboard ORDER BY score DESC LIMIT 50
    ) t
),
curr_season AS (
    SELECT (value->>'id')::integer as id, (value->>'name') as name
    FROM game_settings WHERE key = 'current_season'
)
INSERT INTO season_history (season_id, name, leaderboard_data)
SELECT curr_season.id, curr_season.name, COALESCE(current_top_50.data, '[]'::jsonb)
FROM curr_season, current_top_50
ON CONFLICT (season_id) DO UPDATE SET leaderboard_data = EXCLUDED.leaderboard_data;

-- 2. Increment the current_season in game_settings
UPDATE game_settings
SET value = jsonb_build_object(
    'id', (value->>'id')::integer + 1,
    'name', 'Season ' || ((value->>'id')::integer + 1)::text,
    'active', true
)
WHERE key = 'current_season';

-- 3. Reset trophies on the live leaderboard
UPDATE leaderboard
SET trophies = 300
WHERE trophies > 300;

-- 4. Reset PVP scores (used for ranking)
UPDATE leaderboard
SET score = 300
WHERE score > 300;

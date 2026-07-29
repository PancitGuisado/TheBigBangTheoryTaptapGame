-- Enable read access for all users so they can see opponents' lineups
DROP POLICY IF EXISTS "Enable read access for all users" ON game_saves;
CREATE POLICY "Enable read access for all users" ON game_saves FOR SELECT USING (true);

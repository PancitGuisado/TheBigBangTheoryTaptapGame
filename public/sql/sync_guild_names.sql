UPDATE guild_members SET username = profiles.username FROM profiles WHERE guild_members.user_id = profiles.id AND profiles.username IS NOT NULL AND profiles.username != '';

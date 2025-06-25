-- Add Google Places fields to restaurants table

-- First, check if borough column exists and what type it is
-- If it's an enum, we need to handle it differently

-- Add new columns for Google Places integration (skip borough if it exists)
ALTER TABLE restaurants 
ADD COLUMN IF NOT EXISTS google_place_id text UNIQUE,
ADD COLUMN IF NOT EXISTS latitude numeric,
ADD COLUMN IF NOT EXISTS longitude numeric,
ADD COLUMN IF NOT EXISTS google_rating numeric CHECK (google_rating >= 0 AND google_rating <= 5),
ADD COLUMN IF NOT EXISTS price_level integer CHECK (price_level >= 0 AND price_level <= 4);

-- Add index for google_place_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_restaurants_google_place_id ON restaurants(google_place_id);

-- Add index for location-based queries
CREATE INDEX IF NOT EXISTS idx_restaurants_location ON restaurants(latitude, longitude);

-- Add index for borough filtering (if borough column exists)
CREATE INDEX IF NOT EXISTS idx_restaurants_borough ON restaurants(borough);

-- Update existing records to have default borough values
-- Cast text values to the existing borough enum type
UPDATE restaurants 
SET borough = CASE 
    WHEN neighborhood IN ('Williamsburg', 'Park Slope', 'DUMBO', 'Brooklyn Heights', 'Red Hook', 'Bushwick', 'Crown Heights') THEN 'Brooklyn'::borough
    WHEN neighborhood IN ('East Village', 'West Village', 'SoHo', 'Tribeca', 'Upper East Side', 'Upper West Side', 'Midtown', 'Lower East Side') THEN 'Manhattan'::borough
    WHEN neighborhood IN ('Astoria', 'Long Island City', 'Flushing', 'Jackson Heights') THEN 'Queens'::borough
    WHEN neighborhood IN ('Bronx', 'South Bronx', 'Fordham') THEN 'Bronx'::borough
    WHEN neighborhood IN ('St. George', 'Stapleton') THEN 'Staten Island'::borough
    ELSE 'Brooklyn'::borough -- Default for unknown neighborhoods
END
WHERE borough IS NULL;

-- Add comment to table
COMMENT ON TABLE restaurants IS 'Restaurant listings with Google Places integration for real data';
COMMENT ON COLUMN restaurants.google_place_id IS 'Unique Google Places API place ID';
COMMENT ON COLUMN restaurants.latitude IS 'Restaurant latitude coordinate';
COMMENT ON COLUMN restaurants.longitude IS 'Restaurant longitude coordinate';
COMMENT ON COLUMN restaurants.google_rating IS 'Google Places average rating (0-5)';
COMMENT ON COLUMN restaurants.price_level IS 'Google Places price level (0-4, 0=free, 4=very expensive)';
COMMENT ON COLUMN restaurants.borough IS 'NYC borough (Brooklyn, Manhattan, Queens, Bronx, Staten Island)';
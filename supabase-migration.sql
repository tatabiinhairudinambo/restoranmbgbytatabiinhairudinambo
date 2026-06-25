-- Migration: Create all tables for Car Auto Garage CMS
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  year INTEGER NOT NULL,
  transmission TEXT NOT NULL CHECK (transmission IN ('Manual', 'Automatic')),
  kilometer INTEGER NOT NULL DEFAULT 0,
  price INTEGER NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('Bekas', 'Baru')),
  image TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  passengers INTEGER NOT NULL DEFAULT 4,
  features JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  avatar TEXT,
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  car_id UUID REFERENCES cars(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  rental_date DATE NOT NULL,
  return_date DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Allow public read cars" ON cars FOR SELECT USING (true);
CREATE POLICY "Allow public read testimonials" ON testimonials FOR SELECT USING (true);

-- Authenticated admin policies for cars (full access)
DROP POLICY IF EXISTS "Allow admin all cars" ON cars;
CREATE POLICY "Allow admin select cars" ON cars FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin insert cars" ON cars FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin update cars" ON cars FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin delete cars" ON cars FOR DELETE USING (auth.role() = 'authenticated');

-- Authenticated admin policies for testimonials
DROP POLICY IF EXISTS "Allow admin all testimonials" ON testimonials;
CREATE POLICY "Allow admin select testimonials" ON testimonials FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin insert testimonials" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin update testimonials" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin delete testimonials" ON testimonials FOR DELETE USING (auth.role() = 'authenticated');

-- Authenticated admin policies for contacts
DROP POLICY IF EXISTS "Allow admin all contacts" ON contacts;
CREATE POLICY "Allow admin select contacts" ON contacts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin update contacts" ON contacts FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin delete contacts" ON contacts FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow public insert contacts" ON contacts FOR INSERT WITH CHECK (true);

-- Authenticated admin policies for bookings
DROP POLICY IF EXISTS "Allow admin all bookings" ON bookings;
CREATE POLICY "Allow admin select bookings" ON bookings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin insert bookings" ON bookings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin update bookings" ON bookings FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin delete bookings" ON bookings FOR DELETE USING (auth.role() = 'authenticated');

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_cars_updated_at ON cars;
CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON cars
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

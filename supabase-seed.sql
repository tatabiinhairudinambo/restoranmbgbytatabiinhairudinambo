-- Seed data: Insert existing cars and testimonials into Supabase
-- Jalankan setelah supabase-migration.sql

-- =====================
-- SEED CARS
-- =====================
INSERT INTO cars (name, brand, year, transmission, kilometer, price, condition, image, featured, passengers, features)
VALUES
  ('Toyota Avanza', 'Toyota', 2024, 'Automatic', 0, 350000, 'Baru',
   'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Toyota_Avanza_1.3_E_2024_%282%29.jpg/960px-Toyota_Avanza_1.3_E_2024_%282%29.jpg',
   true, 7, '["AC Dingin", "BBM Irit", "7 Penumpang"]'),
  
  ('Daihatsu Xenia', 'Daihatsu', 2024, 'Automatic', 0, 330000, 'Baru',
   'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Daihatsu_Xenia_1.3_X_pre-facelift_%28F650%29_taken_in_Bandung%2C_West_Java_40115_01.jpg/960px-Daihatsu_Xenia_1.3_X_pre-facelift_%28F650%29_taken_in_Bandung%2C_West_Java_40115_01.jpg',
   true, 7, '["Ekonomis", "7 Penumpang", "Hemat BBM"]'),
  
  ('Toyota Calya', 'Toyota', 2024, 'Automatic', 0, 300000, 'Baru',
   'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/2023_Toyota_Calya_G%2C_Tunjungan_Plaza_6%2C_Central_Surabaya.jpg/960px-2023_Toyota_Calya_G%2C_Tunjungan_Plaza_6%2C_Central_Surabaya.jpg',
   true, 7, '["Compact MPV", "7 Penumpang", "Irit Bensin"]'),
  
  ('Daihatsu Sigra', 'Daihatsu', 2024, 'Automatic', 0, 280000, 'Baru',
   'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/2022_Daihatsu_Sigra_1.2_R_%28front_right%29%2C_GIIAS%2C_Grand_City%2C_Central_Surabaya.jpg/960px-2022_Daihatsu_Sigra_1.2_R_%28front_right%29%2C_GIIAS%2C_Grand_City%2C_Central_Surabaya.jpg',
   true, 7, '["LCGC Hemat", "7 Penumpang", "Harga Terjangkau"]'),
  
  ('Toyota Alphard', 'Toyota', 2024, 'Automatic', 0, 2500000, 'Baru',
   'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/2023_Toyota_Alphard_Hybrid_%28AH40%29_2.jpg/960px-2023_Toyota_Alphard_Hybrid_%28AH40%29_2.jpg',
   true, 7, '["Luxury MPV", "7 Penumpang", "Executive Class"]'),
  
  ('Toyota Innova Zenix', 'Toyota', 2024, 'Automatic', 0, 850000, 'Baru',
   'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/2022_Toyota_Kijang_Innova_Zenix_V_%28Indonesia%29_front_view.jpg/960px-2022_Toyota_Kijang_Innova_Zenix_V_%28Indonesia%29_front_view.jpg',
   true, 7, '["Hybrid Technology", "7 Penumpang", "Premium MPV"]'),
  
  ('Toyota Fortuner', 'Toyota', 2024, 'Automatic', 0, 1250000, 'Baru',
   'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/2021_Toyota_Fortuner_2.4_VRZ_GR_Sport_4x2_GUN165R_%2820211227%29.jpg/960px-2021_Toyota_Fortuner_2.4_VRZ_GR_Sport_4x2_GUN165R_%2820211227%29.jpg',
   true, 7, '["SUV Premium", "7 Penumpang", "All Terrain"]'),
  
  ('Daihatsu Terios', 'Daihatsu', 2024, 'Automatic', 0, 550000, 'Baru',
   'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/2024_Daihatsu_Terios_X_%28cropped%29.jpg/960px-2024_Daihatsu_Terios_X_%28cropped%29.jpg',
   true, 7, '["SUV Tangguh", "7 Penumpang", "Cocok Segala Medan"]'),
  
  ('Toyota Kijang Innova', 'Toyota', 2023, 'Automatic', 0, 700000, 'Baru',
   'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/2022_Toyota_Kijang_Innova_Zenix_V_Hybrid_Modellista_%28front%29%2C_Tunjungan_Plaza%2C_Central_Surabaya.jpg/960px-2022_Toyota_Kijang_Innova_Zenix_V_Hybrid_Modellista_%28front%29%2C_Tunjungan_Plaza%2C_Central_Surabaya.jpg',
   true, 7, '["MPV Legendaris", "7 Penumpang", "Nyaman & Luas"]');

-- =====================
-- SEED TESTIMONIALS
-- =====================
INSERT INTO testimonials (name, rating, comment, avatar, date)
VALUES
  ('Budi Santoso', 5, 'Pelayanan sangat memuaskan! Mobil bersih dan nyaman. Proses sewa mudah dan cepat. Highly recommended!',
   'https://i.pravatar.cc/150?img=12', '2 minggu yang lalu'),
  
  ('Siti Nurhaliza', 5, 'Sewa Innova untuk liburan keluarga. Mobil kondisi prima, driver ramah, dan harga terjangkau!',
   'https://i.pravatar.cc/150?img=45', '1 bulan yang lalu'),
  
  ('Ahmad Yani', 5, 'Harga transparan tanpa biaya tersembunyi. Proses booking cepat via WhatsApp. Puas banget!',
   'https://i.pravatar.cc/150?img=33', '3 minggu yang lalu'),
  
  ('Dewi Lestari', 4, 'Sewa Avanza untuk mudik lebaran. Kondisi mobil bagus dan pelayanan ramah. Recommended!',
   'https://i.pravatar.cc/150?img=47', '1 minggu yang lalu');

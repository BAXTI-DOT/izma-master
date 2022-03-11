insert into countries(country_name) values('Uzbekistan');

insert into regions(region_name, country_id) 
	values('Buxoro', '45e5bc59-a87f-40f3-9438-e1a1b7c93ff6'),
		  ('Samarqand', '45e5bc59-a87f-40f3-9438-e1a1b7c93ff6'),
		  ('Xorazm', '45e5bc59-a87f-40f3-9438-e1a1b7c93ff6');

insert into districts(district_name, region_id) 
	values('Qorakol', '4884d558-6abe-44b5-81dc-efaa5f2eda9d'),
		  ('Gijduvon', '4884d558-6abe-44b5-81dc-efaa5f2eda9d'),
		  ('Olot', '4884d558-6abe-44b5-81dc-efaa5f2eda9d'),
		  ('Kattaqorgon', '51de64f2-2ecd-4f4a-b9b6-7b63418e5f22');

insert into study_centers(study_center_name, study_center_number, region_id) 
  values('Najot Talim', '998998765432', 'ae7b0244-f2e2-40ef-8953-5b1787faac10');

insert into study_center_branches(study_center_branch_name, study_center_branch_number, study_center_id, district_id) 
  values('Sifat Talim, Qorakol', '998918907654', '78b7f93e-dc65-47c5-96cc-e557203899b7', 'f4b1d9f4-a275-4735-9ec5-a4b8ce801fe2'),
		('Alo Talim, Gijduvon', '998907654311', '84dea04a-ee03-457d-a3a2-fa6d9b32f3d3', '6969fed1-eba4-43e8-9780-88b2ae68f78a'),
		('Nur Talim, Olot', '998976510991', '9c9817ec-3b8e-4a6e-a665-83dd35c7b44a', '24a6ec14-c235-4acb-8f14-ec9f0b479df9');

insert into study_center_courses(study_center_course_name, study_center_course_price, study_center_course_description, study_center_branch_id)
	values('Backend', '500 000', 'Yangi backend', '455e3063-3fce-42c4-a88b-e212818308b7'),
				('Frontend', '800 000', 'Yangi front', '455e3063-3fce-42c4-a88b-e212818308b7'),
				('Graphic design', '1 000 000', 'Yangi graf', '455e3063-3fce-42c4-a88b-e212818308b7'),
				('Ona tili', '3 000 000', 'Yangi ona tili', '752dc46a-d0ca-4bf5-98df-e6183bb9ce2d'),
				('Geografiya', '9 000 000', 'Yangi graf dizayn', '752dc46a-d0ca-4bf5-98df-e6183bb9ce2d'),
				('Kimyo', '10 000 000', 'Yangi kimyo', '752dc46a-d0ca-4bf5-98df-e6183bb9ce2d');
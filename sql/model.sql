create database izma;

create extension if not exists "uuid-ossp";
create extension "pgcrypto";

create table countries (
	country_id uuid not null default uuid_generate_v4() primary key,
	country_name varchar(64) not null
);

create table regions (
	region_id uuid not null default uuid_generate_v4() primary key,
	region_name varchar(64) not null,
	country_id uuid not null,
	constraint fk_country
		foreign key (country_id)
		references countries(country_id)
		on delete cascade
);

create table districts (
	district_id uuid not null default uuid_generate_v4() primary key,
	district_name varchar(64) not null,
	region_id uuid not null,
	constraint fk_region
		foreign key (region_id)
		references regions(region_id)
		on delete cascade
);

create table study_centers (
	study_center_id uuid not null default uuid_generate_v4() primary key,
	study_center_name varchar(64) not null,
	study_center_number varchar(16) not null,
	status int default 1,
	region_id uuid not null,
	constraint fk_region
		foreign key (region_id)
		references regions(region_id)
		on delete cascade
);

create table study_center_branches (
	study_center_branch_id uuid not null default uuid_generate_v4() primary key,
	study_center_branch_name varchar(64) not null,
	study_center_branch_number varchar(16),
	study_center_branch_hashtag varchar(64) not null,
	status int default 1,
	study_center_id uuid not null,
	district_id uuid not null,
	created_at timestamptz default CURRENT_TIMESTAMP,
	constraint fk_study_center
		foreign key (study_center_id)
		references study_centers(study_center_id)
		on delete cascade,
	constraint fk_district
		foreign key (district_id)
		references districts(district_id)
		on delete cascade
);

create unique index study_center_branch_hashtag on study_center_branches(study_center_branch_hashtag);

create table study_center_colleagues (
	study_center_colleague_id uuid not null default uuid_generate_v4() primary key,
	study_center_colleague_phone varchar(16),
	study_center_colleague_name varchar(64) not null,
	study_center_colleague_birthday varchar(64),
	study_center_colleague_gender integer,
	study_center_colleague_comment varchar(255),
	study_center_colleague_password varchar(64) not null,
	study_center_colleague_photo varchar(255),
	status int not null,
	study_center_branch_id uuid not null,
	constraint fk_branch
		foreign key (study_center_branch_id)
		references study_center_branches(study_center_branch_id)
		on delete cascade
);

create table study_center_courses (
	study_center_course_id uuid not null default uuid_generate_v4() primary key,
	study_center_course_name varchar(32) not null,
	study_center_course_price varchar(64) not null,
	study_center_course_description varchar(255),
	study_center_subcourse_id uuid,
	study_center_branch_id uuid not null,
	constraint fk_study_center_courses
		foreign key (study_center_branch_id)
		references study_center_branches(study_center_branch_id)
		on delete cascade,
	constraint fk_study_center_subcourses
		foreign key (study_center_subcourse_id)
		references study_center_courses(study_center_course_id)
		on delete cascade
);

create table study_center_online_lessons (
	study_center_online_lesson_id uuid not null default uuid_generate_v4() primary key,
	study_center_online_lesson_title varchar(100) not null,
	study_center_course_id uuid not null,
	constraint fk_online_course
		foreign key (study_center_course_id)
		references study_center_courses(study_center_course_id)
		on delete cascade
);

create table study_center_branch_rooms(
	study_center_branch_room_id uuid not null default uuid_generate_v4() primary key,
	study_center_branch_room varchar(64) not null,
	study_center_branch_id uuid not null,
	constraint fk_study_center_room
		foreign key(study_center_branch_id)
		references study_center_branches(study_center_branch_id)
		on delete cascade
);

create table study_center_groups (
	study_center_group_id uuid not null default uuid_generate_v4() primary key,
	study_center_group_name varchar(32) not null,
	study_center_course_id uuid not null,
	study_center_teacher_id uuid not null,
	study_center_group_days varchar(64) not null,
	study_center_room_id uuid not null,
	study_center_group_lesson_start_time varchar(64),
	study_center_group_lesson_start_date varchar(64),
	study_center_group_lesson_end_date varchar(64),
	study_center_branch_id uuid not null,
	is_active int default 1,
	constraint fk_study_center_course
		foreign key(study_center_course_id)
		references study_center_courses(study_center_course_id)
		on delete cascade,
	constraint fk_teacher_group
		foreign key(study_center_teacher_id)
		references study_center_colleagues(study_center_colleague_id)
		on delete cascade,
	constraint fk_branch_group
		foreign key(study_center_branch_id)
		references study_center_branches(study_center_branch_id)
		on delete cascade,
	constraint fk_room_group
		foreign key(study_center_room_id)
		references study_center_branch_rooms(study_center_branch_room_id)
		on delete cascade	
);

create table study_center_students (
	study_center_student_id uuid not null default uuid_generate_v4() primary key,
	study_center_student_name varchar(64) not null,
	study_center_student_birthday varchar(64) not null,
	study_center_student_gender integer,
	study_center_student_comment varchar(256) not null,
	study_center_student_password varchar(64) not null,
	study_center_branch_id uuid not null,
	status integer
);

create table leads (
	lead_id uuid not null default uuid_generate_v4() primary key,
	lead_name varchar(64) not null,
	lead_tel varchar(64) not null,
	lead_birthday varchar(64),
	lead_gender int,
	lead_comment varchar(128),
	lead_course_id uuid,
	study_center_branch_id uuid,
	constraint fk_study_center_branch_lead
		foreign key (study_center_branch_id)
		references study_center_branches(study_center_branch_id)
		on delete cascade,
	constraint fk_lead_course_id
		foreign key (lead_course_id)
		references study_center_courses(study_center_course_id)
		on delete cascade
);

create unique index leads_number on leads(lead_tel);

create table study_center_student_phone (
	study_center_student_phone_id uuid not null default uuid_generate_v4() primary key,
	study_center_student_phone varchar(64) not null,
	study_center_student_id uuid not null,
	constraint fk_student_phone 
		foreign key (study_center_student_id)
		references study_center_students(study_center_student_id)
		on delete cascade
);

create unique index study_center_student_phones on study_center_student_phone(study_center_student_phone);

create table study_center_student_parent_phone (
	study_center_parent_phone_id uuid not null default uuid_generate_v4() primary key,
	study_center_parent_phone varchar(64) not null,
	study_center_student_id uuid not null,
	constraint fk_parent_phone 
		foreign key (study_center_student_id)
		references study_center_students(study_center_student_id)
		on delete cascade
);

create unique index study_center_student_parent_phones on study_center_student_parent_phone(study_center_parent_phone_id);

create table study_center_student_telegram (
	study_center_student_telegram_id uuid not null default uuid_generate_v4() primary key,
	study_center_student_telegram varchar(64) not null,
	study_center_student_id uuid not null,
	constraint fk_student_telegram 
		foreign key (study_center_student_id)
		references study_center_students(study_center_student_id)
		on delete cascade
);

create table study_center_student_address (
	study_center_student_address_id uuid not null default uuid_generate_v4() primary key,
	study_center_student_address varchar(64) not null,
	study_center_student_id uuid not null,
	constraint fk_student_address 
		foreign key (study_center_student_id)
		references study_center_students(study_center_student_id)
		on delete cascade
);

create table study_center_student_groups(
	study_center_student_group_id uuid not null default uuid_generate_v4() primary key,
	study_center_student_group uuid not null,
	study_center_student_id uuid not null,
	joined_at timestamptz default CURRENT_TIMESTAMP,
	constraint fk_student_address 
		foreign key (study_center_student_id)
		references study_center_students(study_center_student_id)
		on delete cascade,
	constraint fk_student_groups 
		foreign key (study_center_student_group)
		references study_center_groups(study_center_group_id)
		on delete cascade
);

create table study_center_student_courses (
	study_center_student_course_id uuid not null default uuid_generate_v4() primary key,
	study_center_student_id uuid not null references study_center_student(study_center_student_id),
	study_center_course_id uuid not null references study_center_course(study_center_course_id)
);

create table study_center_student_payment (
	study_center_student_payment_id uuid not null default uuid_generate_v4() primary key,
	student_id uuid not null,
	student_group_id uuid not null,
	payment_amount int not null,
	payment_check serial not null,
	payed_at timestamptz default CURRENT_TIMESTAMP,
	constraint fk_student_payment
		foreign key (student_id)
		references study_center_students(study_center_student_id)
		on delete cascade
);

create table study_center_student_cash (
	cash_id uuid not null default uuid_generate_v4() primary key,
	cash_amount varchar(64) not null,
	cash_type varchar(64) not null,
	cash_comment varchar(64) not null,
	student_id uuid not null,
	branch_id uuid not null,
	payment_check serial not null,
	payed_at timestamptz default CURRENT_TIMESTAMP,
	constraint fk_student_cash
		foreign key (student_id)
		references study_center_students(study_center_student_id)
		on delete cascade,
	constraint fk_student_cash_branch
		foreign key (branch_id)
		references study_center_branches(study_center_branch_id)
		on delete cascade
);

create table study_center_teacher_salary (
	study_center_teacher_salary_id uuid not null default uuid_generate_v4() primary key,
	study_center_teacher_salary_amount integer not null,
	study_center_teacher_salary_type integer not null,
	study_center_teacher_id uuid not null,
	constraint fk_teacher_salary
		foreign key (study_center_teacher_id)
		references study_center_colleagues(study_center_colleague_id)
		on delete cascade
); 
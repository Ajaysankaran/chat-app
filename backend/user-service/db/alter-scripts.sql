create table chat_user (
	user_id uuid,
	user_name varchar(400),
	first_name varchar(500),
	last_name varchar(500),
	email varchar(500),
	login_type varchar(10),
	password varchar(500),
	created_by varchar(500),
	created_date timestamp with time zone default now(),
	modified_by varchar(500),
	modified_date timestamp with time zone default now()
);


insert into CHAT_USER (user_id, first_name, last_name, email, user_name, login_type, password, created_by, created_date, modified_by, modified_date) values ('a663b1ab-2a9c-4328-a043-56b47d89dc55', 'Liva', 'Hawk', 'lhawk0@about.me', 'lhawk0', 'UPASS', null, null, '9/1/2023', null, '2/2/2023');
insert into CHAT_USER (user_id, first_name, last_name, email, user_name, login_type, password, created_by, created_date, modified_by, modified_date) values ('b302f64c-01dc-417e-87ac-df84b19904b8', 'Farrell', 'Nutbeam', 'fnutbeam1@utexas.edu', 'fnutbeam1', 'UPASS', null, null, '6/2/2023', null, '6/25/2023');
insert into CHAT_USER (user_id, first_name, last_name, email, user_name, login_type, password, created_by, created_date, modified_by, modified_date) values ('e7f40126-3b17-4909-a830-8c7b1e93ff5b', 'Jazmin', 'Ramsdell', 'jramsdell2@icq.com', 'jramsdell2', 'UPASS', null, null, '7/26/2023', null, '5/14/2023');
insert into CHAT_USER (user_id, first_name, last_name, email, user_name, login_type, password, created_by, created_date, modified_by, modified_date) values ('1f427de2-d600-4c01-864d-9409b08f0eb8', 'Shellysheldon', 'Hasely', 'shasely3@paginegialle.it', 'shasely3', 'UPASS', null, null, '7/3/2023', null, '2/16/2023');
insert into CHAT_USER (user_id, first_name, last_name, email, user_name, login_type, password, created_by, created_date, modified_by, modified_date) values ('2abf187c-bf55-4d11-97f1-a5c33f78e486', 'Saidee', 'De Michele', 'sdemichele4@google.com', 'sdemichele4', 'UPASS', null, null, '7/26/2023', null, '6/2/2023');
insert into CHAT_USER (user_id, first_name, last_name, email, user_name, login_type, password, created_by, created_date, modified_by, modified_date) values ('602ab289-9691-4c5e-a05c-71eafcd4b8c1', 'Ashely', 'Western', 'awestern5@edublogs.org', 'awestern5', 'UPASS', null, null, '4/5/2023', null, '7/2/2023');
insert into CHAT_USER (user_id, first_name, last_name, email, user_name, login_type, password, created_by, created_date, modified_by, modified_date) values ('2420b62e-8465-42cf-935e-7edf7e8e1355', 'Fran', 'Castan', 'fcastan6@usatoday.com', 'fcastan6', 'UPASS', null, null, '11/6/2023', null, '12/10/2023');
insert into CHAT_USER (user_id, first_name, last_name, email, user_name, login_type, password, created_by, created_date, modified_by, modified_date) values ('7ddb735b-fbd1-4e38-8c04-4b4f65203f5d', 'Remington', 'Desorts', 'rdesorts7@wordpress.com', 'rdesorts7', 'UPASS', null, null, '4/3/2023', null, '10/27/2023');
insert into CHAT_USER (user_id, first_name, last_name, email, user_name, login_type, password, created_by, created_date, modified_by, modified_date) values ('ebd71b72-579f-469e-af10-88831d1046f3', 'Darell', 'Quarrie', 'dquarrie8@usatoday.com', 'dquarrie8', 'UPASS', null, null, '4/9/2023', null, '11/27/2023');
insert into CHAT_USER (user_id, first_name, last_name, email, user_name, login_type, password, created_by, created_date, modified_by, modified_date) values ('9081c41c-e3f6-4253-8eae-98b0bab996dd', 'Annalise', 'Erwin', 'aerwin9@booking.com', 'aerwin9', 'UPASS', null, null, '8/2/2023', null, '12/10/2023');



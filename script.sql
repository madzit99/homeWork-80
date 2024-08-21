CREATE DATABASE `cofee` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */

create table categories
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    description text         null
);

create table places
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    description text         null
);

create table items
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    categoryID  int          not null,
    placeID     int          not null,
    description text         null,
    image       varchar(255) null,
    constraint items_categories_id_fk
        foreign key (categoryID) references categories (id),
    constraint items_places_id_fk
        foreign key (placeID) references places (id)
);

INSERT INTO cofee.places (id, name, description) VALUES (1, 'Бар', 'Здесь будут готовиться напитки');
INSERT INTO cofee.places (id, name, description) VALUES (2, 'Кухня', 'Здесь будут готовиться блюда');
INSERT INTO cofee.places (id, name, description) VALUES (3, 'Зал', 'Здесь будут находиться посетители');

INSERT INTO cofee.categories (id, name, description) VALUES (1, 'Мебель', 'Мебель в зале');
INSERT INTO cofee.categories (id, name, description) VALUES (2, 'Барное оборудование', 'Оборудование которое находиться в баре');
INSERT INTO cofee.categories (id, name, description) VALUES (3, 'Кухоное оборудование', 'Оборудование которое находиться на кухне');


INSERT INTO cofee.items (id, name, categoryID, placeID, description, image) VALUES (1, 'Плита ', 3, 2, 'На плите готовят еду', null);
INSERT INTO cofee.items (id, name, categoryID, placeID, description, image) VALUES (2, 'Кофемашинка', 2, 1, 'С кофемашиной готовят кофе', null);
INSERT INTO cofee.items (id, name, categoryID, placeID, description, image) VALUES (3, 'Столик', 1, 3, 'За столиком сидят гости и пьют кофе и едят еду..', null);
INSERT INTO cofee.items (id, name, categoryID, placeID, description, image) VALUES (4, 'Диван', 1, 3, 'На диване гости сидят и пьют кофе..', null);
INSERT INTO cofee.items (id, name, categoryID, placeID, description, image) VALUES (5, 'Кофемолка', 2, 1, 'Кофемолка молит кофе', null);
INSERT INTO cofee.items (id, name, categoryID, placeID, description, image) VALUES (6, 'Темпер', 2, 1, 'Темпер, Темперует молотый кофе в кофейную таблектку', null);

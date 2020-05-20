# meal-sharing

### To run locally: 
* `npm install`
* Rename `.env.example` file to `.env` and add the config vars to your MySQL DB
* DB tables can be created like so: 

```
CREATE TABLE `meal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) NOT NULL,
  `when` datetime NOT NULL,
  `max_reservations` int(10) unsigned NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `created_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `reservation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `number_of_guests` int(10) unsigned DEFAULT NULL,
  `meal_id` int(10) unsigned DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `meal_id` (`meal_id`),
  CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`meal_id`) REFERENCES `meal` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `review` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `meal_id` int(10) unsigned DEFAULT NULL,
  `stars` int(10) unsigned NOT NULL,
  `created_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `meal_id` (`meal_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`meal_id`) REFERENCES `meal` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
* Running in the devlopment mode `npm run dev` starts the app at `localhost:3000`

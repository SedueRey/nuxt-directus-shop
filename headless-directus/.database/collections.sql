--
-- Table structure `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_created` char(36) DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT NULL,
  `user_updated` char(36) DEFAULT NULL,
  `date_updated` timestamp NULL DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categories_user_created_foreign` (`user_created`),
  KEY `categories_user_updated_foreign` (`user_updated`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure `contactform`
--

DROP TABLE IF EXISTS `contactform`;
CREATE TABLE IF NOT EXISTS `contactform` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `date_created` timestamp NULL DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mail` text DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `text` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure `directus_users`
--

DROP TABLE IF EXISTS `directus_users`;
CREATE TABLE IF NOT EXISTS `directus_users` (
  `id` char(36) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `avatar` char(36) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `theme` varchar(20) DEFAULT 'auto',
  `tfa_secret` varchar(255) DEFAULT NULL,
  `status` varchar(16) NOT NULL DEFAULT 'active',
  `role` char(36) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `last_access` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_page` varchar(255) DEFAULT NULL,
  `provider` varchar(128) NOT NULL DEFAULT 'default',
  `external_identifier` varchar(255) DEFAULT NULL,
  `auth_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`auth_data`)),
  `email_notifications` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `directus_users_external_identifier_unique` (`external_identifier`),
  UNIQUE KEY `directus_users_email_unique` (`email`),
  UNIQUE KEY `directus_users_token_unique` (`token`),
  KEY `directus_users_role_foreign` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncar tablas antes de insertar `directus_users`
--

TRUNCATE TABLE `directus_users`;
--
-- Volcado de datos para la tabla `directus_users`
--

INSERT INTO `directus_users` (`id`, `first_name`, `last_name`, `email`, `password`, `location`, `title`, `description`, `tags`, `avatar`, `language`, `theme`, `tfa_secret`, `status`, `role`, `token`, `last_access`, `last_page`, `provider`, `external_identifier`, `auth_data`, `email_notifications`) VALUES
('91644d87-df55-48ec-93f0-f237c90f0da6', 'Artist', 'Artist surname', 'mail@example', 'empty-password', NULL, NULL, NULL, NULL, '62eae918-8b9d-457f-967a-7e50772ce39d', 'en-US', 'auto', NULL, 'active', '5a0129c4-74fd-400b-923b-43e0cd82052c', NULL, '2022-05-20 17:13:26', '/content/languages/+', 'default', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sort` int(11) DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `location` point DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `events_enddate_unique` (`endDate`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure `events_translations`
--

DROP TABLE IF EXISTS `events_translations`;
CREATE TABLE IF NOT EXISTS `events_translations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `events_id` int(10) UNSIGNED DEFAULT NULL,
  `languages_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `excerpt` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `events_translations_languages_id_foreign` (`languages_id`),
  KEY `events_translations_events_id_foreign` (`events_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure `languages`
--

DROP TABLE IF EXISTS `languages`;
CREATE TABLE IF NOT EXISTS `languages` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_created` char(36) DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT NULL,
  `user_updated` char(36) DEFAULT NULL,
  `date_updated` timestamp NULL DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `smallcode` varchar(255) DEFAULT NULL,
  `blog_title` varchar(255) DEFAULT NULL,
  `blog_description` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `currency_small` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `languages_user_created_foreign` (`user_created`),
  KEY `languages_user_updated_foreign` (`user_updated`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Truncar tablas antes de insertar `languages`
--

TRUNCATE TABLE `languages`;
--
-- Volcado de datos para la tabla `languages`
--

INSERT INTO `languages` (`id`, `user_created`, `date_created`, `user_updated`, `date_updated`, `code`, `name`, `smallcode`, `blog_title`, `blog_description`, `currency`, `currency_small`) VALUES
(1, '91644d87-df55-48ec-93f0-f237c90f0da6', '2022-01-04 11:07:40', '91644d87-df55-48ec-93f0-f237c90f0da6', '2022-04-15 18:51:21', 'en_EN', 'English', 'en', 'Sedue Rey - developer and artist', 'seo description in english', 'dollar', '$'),
(2, '91644d87-df55-48ec-93f0-f237c90f0da6', '2022-01-04 11:08:24', '91644d87-df55-48ec-93f0-f237c90f0da6', '2022-03-13 19:43:49', 'es_ES', 'Spanish', 'es', 'Sedue Rey - Desarrollador y artista', 'seo en castellano', 'Euro', '€');

-- --------------------------------------------------------

--
-- Table structure `manufacture`
--

DROP TABLE IF EXISTS `manufacture`;
CREATE TABLE IF NOT EXISTS `manufacture` (
  `uuid` char(36) NOT NULL,
  `date_created` timestamp NULL DEFAULT NULL,
  `date_updated` timestamp NULL DEFAULT NULL,
  `price` float(10,5) DEFAULT NULL,
  `stock` varchar(255) DEFAULT 'available',
  `url` varchar(255) DEFAULT NULL,
  `stripe_key` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `manufacture_url_unique` (`url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure `manufacture_categories`
--

DROP TABLE IF EXISTS `manufacture_categories`;
CREATE TABLE IF NOT EXISTS `manufacture_categories` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `manufacture_uuid` char(36) DEFAULT NULL,
  `categories_id` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `manufacture_categories_categories_id_foreign` (`categories_id`),
  KEY `manufacture_categories_manufacture_uuid_foreign` (`manufacture_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure `manufacture_files`
--

DROP TABLE IF EXISTS `manufacture_files`;
CREATE TABLE IF NOT EXISTS `manufacture_files` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `manufacture_uuid` char(36) DEFAULT NULL,
  `directus_files_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `manufacture_files_directus_files_id_foreign` (`directus_files_id`),
  KEY `manufacture_files_manufacture_uuid_foreign` (`manufacture_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure `manufacture_translations`
--

DROP TABLE IF EXISTS `manufacture_translations`;
CREATE TABLE IF NOT EXISTS `manufacture_translations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `manufacture_uuid` char(36) DEFAULT NULL,
  `languages_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `excerpt` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `manufacture_translations_languages_id_foreign` (`languages_id`),
  KEY `manufacture_translations_manufacture_uuid_foreign` (`manufacture_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure `options`
--

DROP TABLE IF EXISTS `options`;
CREATE TABLE IF NOT EXISTS `options` (
  `uuid` char(36) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `CSSPalette` text DEFAULT NULL,
  `showLogo` tinyint(1) NOT NULL DEFAULT 1,
  `showTitle` tinyint(1) NOT NULL DEFAULT 1,
  `Typographies` text DEFAULT NULL,
  `currency` varchar(255) DEFAULT 'euro',
  `currency_icon` varchar(255) DEFAULT '€',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncar tablas antes de insertar `options`
--

TRUNCATE TABLE `options`;
--
-- Volcado de datos para la tabla `options`
--

INSERT INTO `options` (`uuid`, `title`, `subtitle`, `email`, `CSSPalette`, `showLogo`, `showTitle`, `Typographies`, `currency`, `currency_icon`) VALUES
('30ef0b83-3761-4e91-8ecd-ef0e191f3006', 'Sedue Rey', 'trying to make this world a better place with art', 'proyectos@seduerey.com', ':root {\n--primary: #2d302c;\n--secondary: #E6E2DD;\n--tertiary: #e99276;\n--quaternary: #9bd8db;\n--menu: #252825;\n}\n@media (prefers-color-scheme: light) {\n    :root {\n    --primary: #E6E2DD; /* Light grey */\n    --secondary: #373A36; /* Dark brown */\n    --tertiary: #5c3021; /* Dark orange */\n    --quaternary: #0d5e62; /* Medium blue */\n    --menu: #c3b3ad;\n    }\n}\nbody.prefers-color-dark {\n    --primary: #2d302c;\n    --secondary: #E6E2DD;\n    --tertiary: #e99276;\n    --quaternary: #9bd8db;\n    --menu: #252825;\n}\nbody.prefers-color-light {\n    --primary: #E6E2DD; /* Light grey */\n    --secondary: #373A36; /* Dark brown */\n    --tertiary: #5c3021; /* Dark orange */\n    --quaternary: #0d5e62; /* Medium blue */\n    --menu: #c3b3ad;\n}', 1, 1, '/* Paste here your CSS Fonts */\n/* Default: Montserrat + Lora + Hind Madurai */\n@import url(\'https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@300&family=Lora:ital@1&family=Montserrat:wght@700&display=swap\');', 'euro', '€');

-- --------------------------------------------------------

--
-- Table structure `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `uuid` char(36) NOT NULL,
  `sort` int(11) DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT NULL,
  `date_updated` timestamp NULL DEFAULT NULL,
  `order_details` text DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL DEFAULT 'draft',
  `sort` int(11) DEFAULT NULL,
  `user_created` char(36) DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT NULL,
  `user_updated` char(36) DEFAULT NULL,
  `date_updated` timestamp NULL DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `published_date` datetime DEFAULT NULL,
  `category` int(10) UNSIGNED DEFAULT NULL,
  `dashboard_title` varchar(255) DEFAULT NULL,
  `cover_image` char(36) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `posts_url_unique` (`url`),
  KEY `posts_user_created_foreign` (`user_created`),
  KEY `posts_user_updated_foreign` (`user_updated`),
  KEY `posts_category_foreign` (`category`),
  KEY `posts_cover_image_foreign` (`cover_image`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure `posts_files`
--

DROP TABLE IF EXISTS `posts_files`;
CREATE TABLE IF NOT EXISTS `posts_files` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `posts_id` int(10) UNSIGNED DEFAULT NULL,
  `directus_files_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_files_directus_files_id_foreign` (`directus_files_id`),
  KEY `posts_files_posts_id_foreign` (`posts_id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure `posts_manufacture`
--

DROP TABLE IF EXISTS `posts_manufacture`;
CREATE TABLE IF NOT EXISTS `posts_manufacture` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `posts_id` int(10) UNSIGNED DEFAULT NULL,
  `manufacture_uuid` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_manufacture_manufacture_uuid_foreign` (`manufacture_uuid`),
  KEY `posts_manufacture_posts_id_foreign` (`posts_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure `posts_tags`
--

DROP TABLE IF EXISTS `posts_tags`;
CREATE TABLE IF NOT EXISTS `posts_tags` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `posts_id` int(10) UNSIGNED DEFAULT NULL,
  `tags_id` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_tags_tags_id_foreign` (`tags_id`),
  KEY `posts_tags_posts_id_foreign` (`posts_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure `posts_translations`
--

DROP TABLE IF EXISTS `posts_translations`;
CREATE TABLE IF NOT EXISTS `posts_translations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `posts_id` int(10) UNSIGNED DEFAULT NULL,
  `languages_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_translations_languages_id_foreign` (`languages_id`),
  KEY `posts_translations_posts_id_foreign` (`posts_id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure `social_media`
--

DROP TABLE IF EXISTS `social_media`;
CREATE TABLE IF NOT EXISTS `social_media` (
  `uuid` char(36) NOT NULL,
  `social_media_name` varchar(255) DEFAULT NULL,
  `social_media_url` text DEFAULT NULL,
  `nsfw` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_user_created_foreign` FOREIGN KEY (`user_created`) REFERENCES `directus_users` (`id`),
  ADD CONSTRAINT `categories_user_updated_foreign` FOREIGN KEY (`user_updated`) REFERENCES `directus_users` (`id`);

--
-- Filtros para la tabla `directus_users`
--
ALTER TABLE `directus_users`
  ADD CONSTRAINT `directus_users_role_foreign` FOREIGN KEY (`role`) REFERENCES `directus_roles` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `events_translations`
--
ALTER TABLE `events_translations`
  ADD CONSTRAINT `events_translations_events_id_foreign` FOREIGN KEY (`events_id`) REFERENCES `events` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `events_translations_languages_id_foreign` FOREIGN KEY (`languages_id`) REFERENCES `languages` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `languages`
--
ALTER TABLE `languages`
  ADD CONSTRAINT `languages_user_created_foreign` FOREIGN KEY (`user_created`) REFERENCES `directus_users` (`id`),
  ADD CONSTRAINT `languages_user_updated_foreign` FOREIGN KEY (`user_updated`) REFERENCES `directus_users` (`id`);

--
-- Filtros para la tabla `manufacture_categories`
--
ALTER TABLE `manufacture_categories`
  ADD CONSTRAINT `manufacture_categories_categories_id_foreign` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `manufacture_categories_manufacture_uuid_foreign` FOREIGN KEY (`manufacture_uuid`) REFERENCES `manufacture` (`uuid`) ON DELETE SET NULL;

--
-- Filtros para la tabla `manufacture_files`
--
ALTER TABLE `manufacture_files`
  ADD CONSTRAINT `manufacture_files_directus_files_id_foreign` FOREIGN KEY (`directus_files_id`) REFERENCES `directus_files` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `manufacture_files_manufacture_uuid_foreign` FOREIGN KEY (`manufacture_uuid`) REFERENCES `manufacture` (`uuid`) ON DELETE SET NULL;

--
-- Filtros para la tabla `manufacture_translations`
--
ALTER TABLE `manufacture_translations`
  ADD CONSTRAINT `manufacture_translations_languages_id_foreign` FOREIGN KEY (`languages_id`) REFERENCES `languages` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `manufacture_translations_manufacture_uuid_foreign` FOREIGN KEY (`manufacture_uuid`) REFERENCES `manufacture` (`uuid`) ON DELETE SET NULL;

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_category_foreign` FOREIGN KEY (`category`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `posts_cover_image_foreign` FOREIGN KEY (`cover_image`) REFERENCES `directus_files` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `posts_user_created_foreign` FOREIGN KEY (`user_created`) REFERENCES `directus_users` (`id`),
  ADD CONSTRAINT `posts_user_updated_foreign` FOREIGN KEY (`user_updated`) REFERENCES `directus_users` (`id`);

--
-- Filtros para la tabla `posts_files`
--
ALTER TABLE `posts_files`
  ADD CONSTRAINT `posts_files_directus_files_id_foreign` FOREIGN KEY (`directus_files_id`) REFERENCES `directus_files` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `posts_files_posts_id_foreign` FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `posts_manufacture`
--
ALTER TABLE `posts_manufacture`
  ADD CONSTRAINT `posts_manufacture_manufacture_uuid_foreign` FOREIGN KEY (`manufacture_uuid`) REFERENCES `manufacture` (`uuid`) ON DELETE SET NULL,
  ADD CONSTRAINT `posts_manufacture_posts_id_foreign` FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `posts_tags`
--
ALTER TABLE `posts_tags`
  ADD CONSTRAINT `posts_tags_posts_id_foreign` FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `posts_tags_tags_id_foreign` FOREIGN KEY (`tags_id`) REFERENCES `tags` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `posts_translations`
--
ALTER TABLE `posts_translations`
  ADD CONSTRAINT `posts_translations_languages_id_foreign` FOREIGN KEY (`languages_id`) REFERENCES `languages` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `posts_translations_posts_id_foreign` FOREIGN KEY (`posts_id`) REFERENCES `posts` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

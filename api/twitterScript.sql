create database project001;
use project001;
CREATE TABLE `home_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ht_post_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ht_post_created_at` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ht_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ht_user_screen_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ht_user_profile_image_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ht_media_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ht_user_screen_name_display` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ht_extended_entities_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ht_post_id_UNIQUE` (`ht_post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=663 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `twitter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `url` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imageurl` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `postimage` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `replytourl` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `created_at_UNIQUE` (`created_at`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
alter table home_timeline auto_increment=1;
alter table twitter auto_increment=1;

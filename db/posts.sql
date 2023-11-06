CREATE TABLE `posts` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `author` varchar(100) NOT NULL,
    `title` varchar(200) NOT NULL ,
    `content` TEXT NOT NULL,
    `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
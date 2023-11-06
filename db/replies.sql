CREATE TABLE `replies` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `author` varchar(100) NOT NULL,
    `content` TEXT NOT NULL,
    `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `parent` INT NOT NULL
);
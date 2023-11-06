CREATE TABLE `practicecontests` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(200) NOT NULL ,
    `nationalcontest` INT NOT NULL,
    `link` VARCHAR(300) NOT NULL
);
CREATE TABLE `teams` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(200) NOT NULL ,
    `member1` varchar(200) NOT NULL,
    `member2`varchar(200) NOT NULL,
    `member3`varchar(200) NOT NULL,
    `coach`varchar(200) NOT NULL,
    `contest`INT NOT NULL
);
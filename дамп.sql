CREATE TABLE `types_hardware` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_type` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `mask_ns` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO types_hardware
(id, name_type, mask_ns)
VALUES(1, 'TP-Link TL-WR74', 'XXAAAAAXAA');
INSERT INTO types_hardware
(id, name_type, mask_ns)
VALUES(2, 'D-Link DIR-300', 'NXXAAXZXaa');
INSERT INTO types_hardware
(id, name_type, mask_ns)
VALUES(3, 'D-Link DIR-300 S', 'NXXAAXZXXX');


CREATE TABLE `hardware` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_type` int NOT NULL,
  `serial_number` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hardware_UN` (`serial_number`),
  KEY `hardware_FK` (`id_type`),
  CONSTRAINT `hardware_FK` FOREIGN KEY (`id_type`) REFERENCES `types_hardware` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

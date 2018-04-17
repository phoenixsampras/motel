/*
 Navicat Premium Data Transfer

 Source Server         : 9.9.9.20 - 9.4 - 5432
 Source Server Type    : PostgreSQL
 Source Server Version : 90415
 Source Host           : 9.9.9.20:5432
 Source Catalog        : motel
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 90415
 File Encoding         : 65001

 Date: 16/04/2018 13:10:34
*/


-- ----------------------------
-- Sequence structure for rm_arduino_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."rm_arduino_id_seq";
CREATE SEQUENCE "public"."rm_arduino_id_seq"
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Table structure for rm_arduino
-- ----------------------------
DROP TABLE IF EXISTS "public"."rm_arduino";
CREATE TABLE "public"."rm_arduino" (
  "id" int8 NOT NULL DEFAULT nextval('rm_arduino_id_seq'::regclass),
  "rm_timestamp" timestamp(27) DEFAULT NULL,
  "rm_puerto_a" int4 DEFAULT NULL,
  "rm_puerto_c" int4 DEFAULT NULL,
  "rm_puerto_f" int4 DEFAULT NULL,
  "rm_puerto_k" int4 DEFAULT NULL,
  "rm_puerta1" bool  DEFAULT NULL,
  "rm_puerta2" bool  DEFAULT NULL,
  "rm_puerta3" bool  DEFAULT NULL,
  "rm_puerta4" bool  DEFAULT NULL,
  "rm_puerta5" bool  DEFAULT NULL,
  "rm_puerta6" bool  DEFAULT NULL,
  "rm_puerta7" bool  DEFAULT NULL,
  "rm_puerta8" bool  DEFAULT NULL,
  "rm_puerta9" bool  DEFAULT NULL,
  "rm_puerta10" bool  DEFAULT NULL,
  "rm_puerta11" bool  DEFAULT NULL,
  "rm_puerta12" bool  DEFAULT NULL,
  "rm_puerta13" bool  DEFAULT NULL,
  "rm_puerta14" bool  DEFAULT NULL,
  "rm_puerta15" bool  DEFAULT NULL,
  "rm_puerta16" bool  DEFAULT NULL,
  "rm_puerta17" bool  DEFAULT NULL,
  "rm_puerta18" bool  DEFAULT NULL,
  "rm_puerta19" bool  DEFAULT NULL,
  "rm_puerta20" bool  DEFAULT NULL,
  "rm_puerta21" bool  DEFAULT NULL,
  "rm_puerta22" bool  DEFAULT NULL,
  "rm_puerta23" bool  DEFAULT NULL,
  "rm_puerta24" bool  DEFAULT NULL,
  "rm_puerta25" bool  DEFAULT NULL,
  "rm_puerta26" bool  DEFAULT NULL
)
;

2018-04-16 11:49:16.000000

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."rm_arduino_id_seq"
OWNED BY "public"."rm_arduino"."id";
SELECT setval('"public"."rm_arduino_id_seq"', 3, true);

-- ----------------------------
-- Primary Key structure for table rm_arduino
-- ----------------------------
ALTER TABLE "public"."rm_arduino" ADD CONSTRAINT "rm_arduino_pkey" PRIMARY KEY ("id");

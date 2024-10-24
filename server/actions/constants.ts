

// for now, just copying the schema from prisma into this file in a string.
// TODO: make this dynamic, or at least not hardcoded.
export const PRISMA_SCHEMA = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model auth_group {
  id                     BigInt                   @id(map: "idx_16429_auth_group_pkey") @default(autoincrement())
  name                   String?                  @unique(map: "idx_16429_sqlite_autoindex_auth_group_1")
  auth_group_permissions auth_group_permissions[]
  auth_user_groups       auth_user_groups[]
}

model auth_group_permissions {
  id              BigInt           @id(map: "idx_16393_auth_group_permissions_pkey") @default(autoincrement())
  group_id        BigInt?
  permission_id   BigInt?
  auth_group      auth_group?      @relation(fields: [group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  auth_permission auth_permission? @relation(fields: [permission_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@unique([group_id, permission_id], map: "idx_16393_auth_group_permissions_group_id_permission_id_0cd325b")
  @@index([group_id], map: "idx_16393_auth_group_permissions_group_id_b120cbf9")
  @@index([permission_id], map: "idx_16393_auth_group_permissions_permission_id_84c5c92e")
}

model auth_permission {
  id                         BigInt                       @id(map: "idx_16422_auth_permission_pkey") @default(autoincrement())
  content_type_id            BigInt?
  codename                   String?
  name                       String?
  auth_group_permissions     auth_group_permissions[]
  django_content_type        django_content_type?         @relation(fields: [content_type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  auth_user_user_permissions auth_user_user_permissions[]

  @@unique([content_type_id, codename], map: "idx_16422_auth_permission_content_type_id_codename_01ab375a_uni")
  @@index([content_type_id], map: "idx_16422_auth_permission_content_type_id_2f476e4b")
}

model auth_user {
  id                         BigInt                       @id(map: "idx_16436_auth_user_pkey") @default(autoincrement())
  password                   String?
  last_login                 DateTime?                    @db.Timestamptz(6)
  is_superuser               Boolean?
  username                   String?                      @unique(map: "idx_16436_sqlite_autoindex_auth_user_1")
  last_name                  String?
  email                      String?
  is_staff                   Boolean?
  is_active                  Boolean?
  date_joined                DateTime?                    @db.Timestamptz(6)
  first_name                 String?
  auth_user_groups           auth_user_groups[]
  auth_user_user_permissions auth_user_user_permissions[]
  django_admin_log           django_admin_log[]
}

model auth_user_groups {
  id         BigInt      @id(map: "idx_16398_auth_user_groups_pkey") @default(autoincrement())
  user_id    BigInt?
  group_id   BigInt?
  auth_group auth_group? @relation(fields: [group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  auth_user  auth_user?  @relation(fields: [user_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@unique([user_id, group_id], map: "idx_16398_auth_user_groups_user_id_group_id_94350c0c_uniq")
  @@index([group_id], map: "idx_16398_auth_user_groups_group_id_97559544")
  @@index([user_id], map: "idx_16398_auth_user_groups_user_id_6a12ed8b")
}

model auth_user_user_permissions {
  id              BigInt           @id(map: "idx_16403_auth_user_user_permissions_pkey") @default(autoincrement())
  user_id         BigInt?
  permission_id   BigInt?
  auth_permission auth_permission? @relation(fields: [permission_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  auth_user       auth_user?       @relation(fields: [user_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@unique([user_id, permission_id], map: "idx_16403_auth_user_user_permissions_user_id_permission_id_14a6")
  @@index([permission_id], map: "idx_16403_auth_user_user_permissions_permission_id_1fbb5f2c")
  @@index([user_id], map: "idx_16403_auth_user_user_permissions_user_id_a95ead1b")
}

model django_admin_log {
  id                  BigInt               @id(map: "idx_16408_django_admin_log_pkey") @default(autoincrement())
  action_time         DateTime?            @db.Timestamptz(6)
  object_id           String?
  object_repr         String?
  change_message      String?
  content_type_id     BigInt?
  user_id             BigInt?
  action_flag         Int?                 @db.SmallInt
  django_content_type django_content_type? @relation(fields: [content_type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  auth_user           auth_user?           @relation(fields: [user_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([content_type_id], map: "idx_16408_django_admin_log_content_type_id_c4bce8eb")
  @@index([user_id], map: "idx_16408_django_admin_log_user_id_c564eba6")
}

model django_content_type {
  id               BigInt             @id(map: "idx_16415_django_content_type_pkey") @default(autoincrement())
  app_label        String?
  model            String?
  auth_permission  auth_permission[]
  django_admin_log django_admin_log[]

  @@unique([app_label, model], map: "idx_16415_django_content_type_app_label_model_76bd3d3b_uniq")
}

model django_migrations {
  id      BigInt    @id(map: "idx_16386_django_migrations_pkey") @default(autoincrement())
  app     String?
  name    String?
  applied DateTime? @db.Timestamptz(6)
}

model django_session {
  session_key  String    @id(map: "idx_17432_sqlite_autoindex_django_session_1")
  session_data String?
  expire_date  DateTime? @db.Timestamptz(6)

  @@index([expire_date], map: "idx_17432_django_session_expire_date_a5c62663")
}

model django_site {
  id     BigInt  @id(map: "idx_17438_django_site_pkey") @default(autoincrement())
  name   String?
  domain String? @unique(map: "idx_17438_sqlite_autoindex_django_site_1")
}

model pokemon_v2_ability {
  id                            BigInt                          @id(map: "idx_16811_pokemon_v2_ability_pkey") @default(autoincrement())
  is_main_series                Boolean?
  generation_id                 BigInt?
  name                          String?
  pokemon_v2_generation         pokemon_v2_generation?          @relation(fields: [generation_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_abilitychange      pokemon_v2_abilitychange[]
  pokemon_v2_abilityeffecttext  pokemon_v2_abilityeffecttext[]
  pokemon_v2_abilityflavortext  pokemon_v2_abilityflavortext[]
  pokemon_v2_abilityname        pokemon_v2_abilityname[]
  pokemon_v2_pokemonability     pokemon_v2_pokemonability[]
  pokemon_v2_pokemonabilitypast pokemon_v2_pokemonabilitypast[]

  @@index([generation_id], map: "idx_16811_pokemon_v2_ability_generation_id_225aa68a")
  @@index([name], map: "idx_16811_pokemon_v2_ability_name_744d1800")
}

model pokemon_v2_abilitychange {
  id                                 BigInt                               @id(map: "idx_16794_pokemon_v2_abilitychange_pkey") @default(autoincrement())
  ability_id                         BigInt?
  version_group_id                   BigInt?
  pokemon_v2_ability                 pokemon_v2_ability?                  @relation(fields: [ability_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_versiongroup            pokemon_v2_versiongroup?             @relation(fields: [version_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_abilitychangeeffecttext pokemon_v2_abilitychangeeffecttext[]

  @@index([ability_id], map: "idx_16794_pokemon_v2_abilitychange_ability_id_b263505f")
  @@index([version_group_id], map: "idx_16794_pokemon_v2_abilitychange_version_group_id_04bcdf19")
}

model pokemon_v2_abilitychangeeffecttext {
  id                       BigInt                    @id(map: "idx_16726_pokemon_v2_abilitychangeeffecttext_pkey") @default(autoincrement())
  effect                   String?
  ability_change_id        BigInt?
  language_id              BigInt?
  pokemon_v2_abilitychange pokemon_v2_abilitychange? @relation(fields: [ability_change_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language      pokemon_v2_language?      @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([ability_change_id], map: "idx_16726_pokemon_v2_abilitychangeeffecttext_ability_change_id_")
  @@index([language_id], map: "idx_16726_pokemon_v2_abilitychangeeffecttext_language_id_ed14bf")
}

model pokemon_v2_abilityeffecttext {
  id                  BigInt               @id(map: "idx_16733_pokemon_v2_abilityeffecttext_pkey") @default(autoincrement())
  effect              String?
  short_effect        String?
  ability_id          BigInt?
  language_id         BigInt?
  pokemon_v2_ability  pokemon_v2_ability?  @relation(fields: [ability_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language pokemon_v2_language? @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([ability_id], map: "idx_16733_pokemon_v2_abilityeffecttext_ability_id_9fe65f70")
  @@index([language_id], map: "idx_16733_pokemon_v2_abilityeffecttext_language_id_9a3fc9eb")
}

model pokemon_v2_abilityflavortext {
  id                      BigInt                   @id(map: "idx_16586_pokemon_v2_abilityflavortext_pkey") @default(autoincrement())
  ability_id              BigInt?
  language_id             BigInt?
  version_group_id        BigInt?
  flavor_text             String?
  pokemon_v2_ability      pokemon_v2_ability?      @relation(fields: [ability_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language     pokemon_v2_language?     @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_versiongroup pokemon_v2_versiongroup? @relation(fields: [version_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([ability_id], map: "idx_16586_pokemon_v2_abilityflavortext_ability_id_8c20d4bf")
  @@index([language_id], map: "idx_16586_pokemon_v2_abilityflavortext_language_id_91dfb962")
  @@index([version_group_id], map: "idx_16586_pokemon_v2_abilityflavortext_version_group_id_a379dd5")
}

model pokemon_v2_abilityname {
  id                  BigInt               @id(map: "idx_16818_pokemon_v2_abilityname_pkey") @default(autoincrement())
  ability_id          BigInt?
  language_id         BigInt?
  name                String?
  pokemon_v2_ability  pokemon_v2_ability?  @relation(fields: [ability_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language pokemon_v2_language? @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([ability_id], map: "idx_16818_pokemon_v2_abilityname_ability_id_2753864d")
  @@index([language_id], map: "idx_16818_pokemon_v2_abilityname_language_id_e64c37fb")
  @@index([name], map: "idx_16818_pokemon_v2_abilityname_name_8db2ae39")
}

model pokemon_v2_berry {
  id                        BigInt                      @id(map: "idx_16825_pokemon_v2_berry_pkey") @default(autoincrement())
  natural_gift_power        BigInt?
  size                      BigInt?
  max_harvest               BigInt?
  growth_time               BigInt?
  soil_dryness              BigInt?
  smoothness                BigInt?
  berry_firmness_id         BigInt?
  item_id                   BigInt?
  natural_gift_type_id      BigInt?
  name                      String?
  pokemon_v2_berryfirmness  pokemon_v2_berryfirmness?   @relation(fields: [berry_firmness_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_item           pokemon_v2_item?            @relation(fields: [item_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_type           pokemon_v2_type?            @relation(fields: [natural_gift_type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_berryflavormap pokemon_v2_berryflavormap[]

  @@index([berry_firmness_id], map: "idx_16825_pokemon_v2_berry_berry_firmness_id_780e6268")
  @@index([item_id], map: "idx_16825_pokemon_v2_berry_item_id_72a1ed81")
  @@index([name], map: "idx_16825_pokemon_v2_berry_name_4eaa4d0f")
  @@index([natural_gift_type_id], map: "idx_16825_pokemon_v2_berry_natural_gift_type_id_7d76f035")
}

model pokemon_v2_berryfirmness {
  id                           BigInt                         @id(map: "idx_16832_pokemon_v2_berryfirmness_pkey") @default(autoincrement())
  name                         String?
  pokemon_v2_berry             pokemon_v2_berry[]
  pokemon_v2_berryfirmnessname pokemon_v2_berryfirmnessname[]

  @@index([name], map: "idx_16832_pokemon_v2_berryfirmness_name_13b8b31d")
}

model pokemon_v2_berryfirmnessname {
  id                       BigInt                    @id(map: "idx_16839_pokemon_v2_berryfirmnessname_pkey") @default(autoincrement())
  berry_firmness_id        BigInt?
  language_id              BigInt?
  name                     String?
  pokemon_v2_berryfirmness pokemon_v2_berryfirmness? @relation(fields: [berry_firmness_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language      pokemon_v2_language?      @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([berry_firmness_id], map: "idx_16839_pokemon_v2_berryfirmnessname_berry_firmness_id_905d4d")
  @@index([language_id], map: "idx_16839_pokemon_v2_berryfirmnessname_language_id_7e7f395e")
  @@index([name], map: "idx_16839_pokemon_v2_berryfirmnessname_name_2a74382f")
}

model pokemon_v2_berryflavor {
  id                                                                          BigInt                       @id(map: "idx_16846_pokemon_v2_berryflavor_pkey") @default(autoincrement())
  contest_type_id                                                             BigInt?                      @unique(map: "idx_16846_sqlite_autoindex_pokemon_v2_berryflavor_1")
  name                                                                        String?
  pokemon_v2_contesttype                                                      pokemon_v2_contesttype?      @relation(fields: [contest_type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_berryflavormap                                                   pokemon_v2_berryflavormap[]
  pokemon_v2_berryflavorname                                                  pokemon_v2_berryflavorname[]
  pokemon_v2_nature_pokemon_v2_nature_hates_flavor_idTopokemon_v2_berryflavor pokemon_v2_nature[]          @relation("pokemon_v2_nature_hates_flavor_idTopokemon_v2_berryflavor")
  pokemon_v2_nature_pokemon_v2_nature_likes_flavor_idTopokemon_v2_berryflavor pokemon_v2_nature[]          @relation("pokemon_v2_nature_likes_flavor_idTopokemon_v2_berryflavor")

  @@index([name], map: "idx_16846_pokemon_v2_berryflavor_name_b33ebfb3")
}

model pokemon_v2_berryflavormap {
  id                     BigInt                  @id(map: "idx_16799_pokemon_v2_berryflavormap_pkey") @default(autoincrement())
  potency                BigInt?
  berry_id               BigInt?
  berry_flavor_id        BigInt?
  pokemon_v2_berryflavor pokemon_v2_berryflavor? @relation(fields: [berry_flavor_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_berry       pokemon_v2_berry?       @relation(fields: [berry_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([berry_flavor_id], map: "idx_16799_pokemon_v2_berryflavormap_berry_flavor_id_65cf6f73")
  @@index([berry_id], map: "idx_16799_pokemon_v2_berryflavormap_berry_id_e4a753e4")
}

model pokemon_v2_berryflavorname {
  id                     BigInt                  @id(map: "idx_16853_pokemon_v2_berryflavorname_pkey") @default(autoincrement())
  berry_flavor_id        BigInt?
  language_id            BigInt?
  name                   String?
  pokemon_v2_berryflavor pokemon_v2_berryflavor? @relation(fields: [berry_flavor_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language    pokemon_v2_language?    @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([berry_flavor_id], map: "idx_16853_pokemon_v2_berryflavorname_berry_flavor_id_1dd899da")
  @@index([language_id], map: "idx_16853_pokemon_v2_berryflavorname_language_id_fa96a7af")
  @@index([name], map: "idx_16853_pokemon_v2_berryflavorname_name_c499b01c")
}

model pokemon_v2_characteristic {
  id                                   BigInt                                 @id(map: "idx_16448_pokemon_v2_characteristic_pkey") @default(autoincrement())
  gene_mod_5                           BigInt?
  stat_id                              BigInt?
  pokemon_v2_stat                      pokemon_v2_stat?                       @relation(fields: [stat_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_characteristicdescription pokemon_v2_characteristicdescription[]

  @@index([stat_id], map: "idx_16448_pokemon_v2_characteristic_stat_id_cf62870d")
}

model pokemon_v2_characteristicdescription {
  id                        BigInt                     @id(map: "idx_16453_pokemon_v2_characteristicdescription_pkey") @default(autoincrement())
  description               String?
  characteristic_id         BigInt?
  language_id               BigInt?
  pokemon_v2_characteristic pokemon_v2_characteristic? @relation(fields: [characteristic_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language       pokemon_v2_language?       @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([characteristic_id], map: "idx_16453_pokemon_v2_characteristicdescription_characteristic_i")
  @@index([language_id], map: "idx_16453_pokemon_v2_characteristicdescription_language_id_48d9")
}

model pokemon_v2_contestcombo {
  id                                                                      BigInt           @id(map: "idx_16620_pokemon_v2_contestcombo_pkey") @default(autoincrement())
  first_move_id                                                           BigInt?
  second_move_id                                                          BigInt?
  pokemon_v2_move_pokemon_v2_contestcombo_first_move_idTopokemon_v2_move  pokemon_v2_move? @relation("pokemon_v2_contestcombo_first_move_idTopokemon_v2_move", fields: [first_move_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_move_pokemon_v2_contestcombo_second_move_idTopokemon_v2_move pokemon_v2_move? @relation("pokemon_v2_contestcombo_second_move_idTopokemon_v2_move", fields: [second_move_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([first_move_id], map: "idx_16620_pokemon_v2_contestcombo_first_move_id_e86fe950")
  @@index([second_move_id], map: "idx_16620_pokemon_v2_contestcombo_second_move_id_5bf6f920")
}

model pokemon_v2_contesteffect {
  id                                 BigInt                               @id(map: "idx_16625_pokemon_v2_contesteffect_pkey") @default(autoincrement())
  appeal                             BigInt?
  jam                                BigInt?
  pokemon_v2_contesteffecteffecttext pokemon_v2_contesteffecteffecttext[]
  pokemon_v2_contesteffectflavortext pokemon_v2_contesteffectflavortext[]
  pokemon_v2_move                    pokemon_v2_move[]
}

model pokemon_v2_contesteffecteffecttext {
  id                       BigInt                    @id(map: "idx_16747_pokemon_v2_contesteffecteffecttext_pkey") @default(autoincrement())
  effect                   String?
  contest_effect_id        BigInt?
  language_id              BigInt?
  pokemon_v2_contesteffect pokemon_v2_contesteffect? @relation(fields: [contest_effect_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language      pokemon_v2_language?      @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([contest_effect_id], map: "idx_16747_pokemon_v2_contesteffecteffecttext_contest_effect_id_")
  @@index([language_id], map: "idx_16747_pokemon_v2_contesteffecteffecttext_language_id_0e98da")
}

model pokemon_v2_contesteffectflavortext {
  id                       BigInt                    @id(map: "idx_16775_pokemon_v2_contesteffectflavortext_pkey") @default(autoincrement())
  flavor_text              String?
  contest_effect_id        BigInt?
  language_id              BigInt?
  pokemon_v2_contesteffect pokemon_v2_contesteffect? @relation(fields: [contest_effect_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language      pokemon_v2_language?      @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([contest_effect_id], map: "idx_16775_pokemon_v2_contesteffectflavortext_contest_effect_id_")
  @@index([language_id], map: "idx_16775_pokemon_v2_contesteffectflavortext_language_id_a584e5")
}

model pokemon_v2_contesttype {
  id                         BigInt                       @id(map: "idx_16860_pokemon_v2_contesttype_pkey") @default(autoincrement())
  name                       String?
  pokemon_v2_berryflavor     pokemon_v2_berryflavor?
  pokemon_v2_contesttypename pokemon_v2_contesttypename[]
  pokemon_v2_move            pokemon_v2_move[]

  @@index([name], map: "idx_16860_pokemon_v2_contesttype_name_18e75f76")
}

model pokemon_v2_contesttypename {
  id                     BigInt                  @id(map: "idx_16867_pokemon_v2_contesttypename_pkey") @default(autoincrement())
  flavor                 String?
  color                  String?
  contest_type_id        BigInt?
  language_id            BigInt?
  name                   String?
  pokemon_v2_contesttype pokemon_v2_contesttype? @relation(fields: [contest_type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language    pokemon_v2_language?    @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([contest_type_id], map: "idx_16867_pokemon_v2_contesttypename_contest_type_id_08e7cb9d")
  @@index([language_id], map: "idx_16867_pokemon_v2_contesttypename_language_id_2113d494")
  @@index([name], map: "idx_16867_pokemon_v2_contesttypename_name_270b053a")
}

model pokemon_v2_egggroup {
  id                         BigInt                       @id(map: "idx_16874_pokemon_v2_egggroup_pkey") @default(autoincrement())
  name                       String?
  pokemon_v2_egggroupname    pokemon_v2_egggroupname[]
  pokemon_v2_pokemonegggroup pokemon_v2_pokemonegggroup[]

  @@index([name], map: "idx_16874_pokemon_v2_egggroup_name_452dc3a4")
}

model pokemon_v2_egggroupname {
  id                  BigInt               @id(map: "idx_16881_pokemon_v2_egggroupname_pkey") @default(autoincrement())
  egg_group_id        BigInt?
  language_id         BigInt?
  name                String?
  pokemon_v2_egggroup pokemon_v2_egggroup? @relation(fields: [egg_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language pokemon_v2_language? @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([egg_group_id], map: "idx_16881_pokemon_v2_egggroupname_egg_group_id_0e05a091")
  @@index([language_id], map: "idx_16881_pokemon_v2_egggroupname_language_id_b233cbf3")
  @@index([name], map: "idx_16881_pokemon_v2_egggroupname_name_4ae8920c")
}

model pokemon_v2_encounter {
  id                                    BigInt                                  @id(map: "idx_16655_pokemon_v2_encounter_pkey") @default(autoincrement())
  min_level                             BigInt?
  max_level                             BigInt?
  location_area_id                      BigInt?
  pokemon_id                            BigInt?
  version_id                            BigInt?
  encounter_slot_id                     BigInt?
  pokemon_v2_encounterslot              pokemon_v2_encounterslot?               @relation(fields: [encounter_slot_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_locationarea               pokemon_v2_locationarea?                @relation(fields: [location_area_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemon                    pokemon_v2_pokemon?                     @relation(fields: [pokemon_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_version                    pokemon_v2_version?                     @relation(fields: [version_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_encounterconditionvaluemap pokemon_v2_encounterconditionvaluemap[]

  @@index([encounter_slot_id], map: "idx_16655_pokemon_v2_encounter_encounter_slot_id_67f269af")
  @@index([location_area_id], map: "idx_16655_pokemon_v2_encounter_location_area_id_fa408e67")
  @@index([pokemon_id], map: "idx_16655_pokemon_v2_encounter_pokemon_id_a4a76f85")
  @@index([version_id], map: "idx_16655_pokemon_v2_encounter_version_id_46932476")
}

model pokemon_v2_encountercondition {
  id                                 BigInt                               @id(map: "idx_16888_pokemon_v2_encountercondition_pkey") @default(autoincrement())
  name                               String?
  pokemon_v2_encounterconditionname  pokemon_v2_encounterconditionname[]
  pokemon_v2_encounterconditionvalue pokemon_v2_encounterconditionvalue[]

  @@index([name], map: "idx_16888_pokemon_v2_encountercondition_name_6825a841")
}

model pokemon_v2_encounterconditionname {
  id                            BigInt                         @id(map: "idx_16895_pokemon_v2_encounterconditionname_pkey") @default(autoincrement())
  encounter_condition_id        BigInt?
  language_id                   BigInt?
  name                          String?
  pokemon_v2_encountercondition pokemon_v2_encountercondition? @relation(fields: [encounter_condition_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language           pokemon_v2_language?           @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([encounter_condition_id], map: "idx_16895_pokemon_v2_encounterconditionname_encounter_condition")
  @@index([language_id], map: "idx_16895_pokemon_v2_encounterconditionname_language_id_15462dd")
  @@index([name], map: "idx_16895_pokemon_v2_encounterconditionname_name_9140f29e")
}

model pokemon_v2_encounterconditionvalue {
  id                                     BigInt                                   @id(map: "idx_16902_pokemon_v2_encounterconditionvalue_pkey") @default(autoincrement())
  is_default                             Boolean?
  encounter_condition_id                 BigInt?
  name                                   String?
  pokemon_v2_encountercondition          pokemon_v2_encountercondition?           @relation(fields: [encounter_condition_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_encounterconditionvaluemap  pokemon_v2_encounterconditionvaluemap[]
  pokemon_v2_encounterconditionvaluename pokemon_v2_encounterconditionvaluename[]

  @@index([encounter_condition_id], map: "idx_16902_pokemon_v2_encounterconditionvalue_encounter_conditio")
  @@index([name], map: "idx_16902_pokemon_v2_encounterconditionvalue_name_fd9a9104")
}

model pokemon_v2_encounterconditionvaluemap {
  id                                 BigInt                              @id(map: "idx_16640_pokemon_v2_encounterconditionvaluemap_pkey") @default(autoincrement())
  encounter_id                       BigInt?
  encounter_condition_value_id       BigInt?
  pokemon_v2_encounterconditionvalue pokemon_v2_encounterconditionvalue? @relation(fields: [encounter_condition_value_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "pokemon_v2_encountercondition_encounter_condition_value_id_fkey")
  pokemon_v2_encounter               pokemon_v2_encounter?               @relation(fields: [encounter_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([encounter_condition_value_id], map: "idx_16640_pokemon_v2_encounterconditionvaluemap_encounter_condi")
  @@index([encounter_id], map: "idx_16640_pokemon_v2_encounterconditionvaluemap_encounter_id_07")
}

model pokemon_v2_encounterconditionvaluename {
  id                                 BigInt                              @id(map: "idx_16909_pokemon_v2_encounterconditionvaluename_pkey") @default(autoincrement())
  encounter_condition_value_id       BigInt?
  language_id                        BigInt?
  name                               String?
  pokemon_v2_encounterconditionvalue pokemon_v2_encounterconditionvalue? @relation(fields: [encounter_condition_value_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "pokemon_v2_encounterconditio_encounter_condition_value_id_fkey1")
  pokemon_v2_language                pokemon_v2_language?                @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([encounter_condition_value_id], map: "idx_16909_pokemon_v2_encounterconditionvaluename_encounter_cond")
  @@index([language_id], map: "idx_16909_pokemon_v2_encounterconditionvaluename_language_id_75")
  @@index([name], map: "idx_16909_pokemon_v2_encounterconditionvaluename_name_09aada74")
}

model pokemon_v2_encountermethod {
  id                                   BigInt                                 @id(map: "idx_16916_pokemon_v2_encountermethod_pkey") @default(autoincrement())
  order                                BigInt?
  name                                 String?
  pokemon_v2_encountermethodname       pokemon_v2_encountermethodname[]
  pokemon_v2_encounterslot             pokemon_v2_encounterslot[]
  pokemon_v2_locationareaencounterrate pokemon_v2_locationareaencounterrate[]

  @@index([name], map: "idx_16916_pokemon_v2_encountermethod_name_807a7363")
}

model pokemon_v2_encountermethodname {
  id                         BigInt                      @id(map: "idx_16923_pokemon_v2_encountermethodname_pkey") @default(autoincrement())
  encounter_method_id        BigInt?
  language_id                BigInt?
  name                       String?
  pokemon_v2_encountermethod pokemon_v2_encountermethod? @relation(fields: [encounter_method_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language        pokemon_v2_language?        @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([encounter_method_id], map: "idx_16923_pokemon_v2_encountermethodname_encounter_method_id_f0")
  @@index([language_id], map: "idx_16923_pokemon_v2_encountermethodname_language_id_df10978f")
  @@index([name], map: "idx_16923_pokemon_v2_encountermethodname_name_c50b0da6")
}

model pokemon_v2_encounterslot {
  id                         BigInt                      @id(map: "idx_16645_pokemon_v2_encounterslot_pkey") @default(autoincrement())
  slot                       BigInt?
  rarity                     BigInt?
  encounter_method_id        BigInt?
  version_group_id           BigInt?
  pokemon_v2_encounter       pokemon_v2_encounter[]
  pokemon_v2_encountermethod pokemon_v2_encountermethod? @relation(fields: [encounter_method_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_versiongroup    pokemon_v2_versiongroup?    @relation(fields: [version_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([encounter_method_id], map: "idx_16645_pokemon_v2_encounterslot_encounter_method_id_b9a4d963")
  @@index([version_group_id], map: "idx_16645_pokemon_v2_encounterslot_version_group_id_de2e9658")
}

model pokemon_v2_evolutionchain {
  id                        BigInt                      @id(map: "idx_16605_pokemon_v2_evolutionchain_pkey") @default(autoincrement())
  baby_trigger_item_id      BigInt?
  pokemon_v2_item           pokemon_v2_item?            @relation(fields: [baby_trigger_item_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonspecies pokemon_v2_pokemonspecies[]

  @@index([baby_trigger_item_id], map: "idx_16605_pokemon_v2_evolutionchain_baby_trigger_item_id_8341ae")
}

model pokemon_v2_evolutiontrigger {
  id                              BigInt                            @id(map: "idx_16930_pokemon_v2_evolutiontrigger_pkey") @default(autoincrement())
  name                            String?
  pokemon_v2_evolutiontriggername pokemon_v2_evolutiontriggername[]
  pokemon_v2_pokemonevolution     pokemon_v2_pokemonevolution[]

  @@index([name], map: "idx_16930_pokemon_v2_evolutiontrigger_name_5e94bd81")
}

model pokemon_v2_evolutiontriggername {
  id                          BigInt                       @id(map: "idx_16937_pokemon_v2_evolutiontriggername_pkey") @default(autoincrement())
  evolution_trigger_id        BigInt?
  language_id                 BigInt?
  name                        String?
  pokemon_v2_evolutiontrigger pokemon_v2_evolutiontrigger? @relation(fields: [evolution_trigger_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language         pokemon_v2_language?         @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([evolution_trigger_id], map: "idx_16937_pokemon_v2_evolutiontriggername_evolution_trigger_id_")
  @@index([language_id], map: "idx_16937_pokemon_v2_evolutiontriggername_language_id_9a05e0c7")
  @@index([name], map: "idx_16937_pokemon_v2_evolutiontriggername_name_8119ef67")
}

model pokemon_v2_experience {
  id                    BigInt                 @id(map: "idx_16520_pokemon_v2_experience_pkey") @default(autoincrement())
  level                 BigInt?
  experience            BigInt?
  growth_rate_id        BigInt?
  pokemon_v2_growthrate pokemon_v2_growthrate? @relation(fields: [growth_rate_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([growth_rate_id], map: "idx_16520_pokemon_v2_experience_growth_rate_id_42dcd743")
}

model pokemon_v2_gender {
  id                          BigInt                        @id(map: "idx_16944_pokemon_v2_gender_pkey") @default(autoincrement())
  name                        String?
  pokemon_v2_pokemonevolution pokemon_v2_pokemonevolution[]

  @@index([name], map: "idx_16944_pokemon_v2_gender_name_40507af4")
}

model pokemon_v2_generation {
  id                               BigInt                             @id(map: "idx_16951_pokemon_v2_generation_pkey") @default(autoincrement())
  region_id                        BigInt?                            @unique(map: "idx_16951_sqlite_autoindex_pokemon_v2_generation_1")
  name                             String?
  pokemon_v2_ability               pokemon_v2_ability[]
  pokemon_v2_region                pokemon_v2_region?                 @relation(fields: [region_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_generationname        pokemon_v2_generationname[]
  pokemon_v2_itemgameindex         pokemon_v2_itemgameindex[]
  pokemon_v2_locationgameindex     pokemon_v2_locationgameindex[]
  pokemon_v2_move                  pokemon_v2_move[]
  pokemon_v2_pokemonabilitypast    pokemon_v2_pokemonabilitypast[]
  pokemon_v2_pokemonformgeneration pokemon_v2_pokemonformgeneration[]
  pokemon_v2_pokemonspecies        pokemon_v2_pokemonspecies[]
  pokemon_v2_pokemontypepast       pokemon_v2_pokemontypepast[]
  pokemon_v2_type                  pokemon_v2_type[]
  pokemon_v2_typeefficacypast      pokemon_v2_typeefficacypast[]
  pokemon_v2_typegameindex         pokemon_v2_typegameindex[]
  pokemon_v2_versiongroup          pokemon_v2_versiongroup[]

  @@index([name], map: "idx_16951_pokemon_v2_generation_name_6e9940f4")
}

model pokemon_v2_generationname {
  id                    BigInt                 @id(map: "idx_16958_pokemon_v2_generationname_pkey") @default(autoincrement())
  generation_id         BigInt?
  language_id           BigInt?
  name                  String?
  pokemon_v2_generation pokemon_v2_generation? @relation(fields: [generation_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language   pokemon_v2_language?   @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([generation_id], map: "idx_16958_pokemon_v2_generationname_generation_id_9f22cdbb")
  @@index([language_id], map: "idx_16958_pokemon_v2_generationname_language_id_4e855215")
  @@index([name], map: "idx_16958_pokemon_v2_generationname_name_f79c2051")
}

model pokemon_v2_growthrate {
  id                               BigInt                             @id(map: "idx_16965_pokemon_v2_growthrate_pkey") @default(autoincrement())
  formula                          String?
  name                             String?
  pokemon_v2_experience            pokemon_v2_experience[]
  pokemon_v2_growthratedescription pokemon_v2_growthratedescription[]
  pokemon_v2_machine               pokemon_v2_machine[]
  pokemon_v2_pokemonspecies        pokemon_v2_pokemonspecies[]

  @@index([name], map: "idx_16965_pokemon_v2_growthrate_name_1926e11a")
}

model pokemon_v2_growthratedescription {
  id                    BigInt                 @id(map: "idx_16460_pokemon_v2_growthratedescription_pkey") @default(autoincrement())
  growth_rate_id        BigInt?
  language_id           BigInt?
  description           String?
  pokemon_v2_growthrate pokemon_v2_growthrate? @relation(fields: [growth_rate_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language   pokemon_v2_language?   @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([growth_rate_id], map: "idx_16460_pokemon_v2_growthratedescription_growth_rate_id_2e126")
  @@index([language_id], map: "idx_16460_pokemon_v2_growthratedescription_language_id_5bbe9b57")
}

model pokemon_v2_item {
  id                                                                                         BigInt                        @id(map: "idx_16972_pokemon_v2_item_pkey") @default(autoincrement())
  cost                                                                                       BigInt?
  fling_power                                                                                BigInt?
  item_category_id                                                                           BigInt?
  item_fling_effect_id                                                                       BigInt?
  name                                                                                       String?
  pokemon_v2_berry                                                                           pokemon_v2_berry[]
  pokemon_v2_evolutionchain                                                                  pokemon_v2_evolutionchain[]
  pokemon_v2_itemcategory                                                                    pokemon_v2_itemcategory?      @relation(fields: [item_category_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_itemflingeffect                                                                 pokemon_v2_itemflingeffect?   @relation(fields: [item_fling_effect_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_itemattributemap                                                                pokemon_v2_itemattributemap[]
  pokemon_v2_itemeffecttext                                                                  pokemon_v2_itemeffecttext[]
  pokemon_v2_itemflavortext                                                                  pokemon_v2_itemflavortext[]
  pokemon_v2_itemgameindex                                                                   pokemon_v2_itemgameindex[]
  pokemon_v2_itemname                                                                        pokemon_v2_itemname[]
  pokemon_v2_itemsprites                                                                     pokemon_v2_itemsprites[]
  pokemon_v2_machine                                                                         pokemon_v2_machine[]
  pokemon_v2_pokemonevolution_pokemon_v2_pokemonevolution_evolution_item_idTopokemon_v2_item pokemon_v2_pokemonevolution[] @relation("pokemon_v2_pokemonevolution_evolution_item_idTopokemon_v2_item")
  pokemon_v2_pokemonevolution_pokemon_v2_pokemonevolution_held_item_idTopokemon_v2_item      pokemon_v2_pokemonevolution[] @relation("pokemon_v2_pokemonevolution_held_item_idTopokemon_v2_item")
  pokemon_v2_pokemonitem                                                                     pokemon_v2_pokemonitem[]

  @@index([item_category_id], map: "idx_16972_pokemon_v2_item_item_category_id_9f55b7ca")
  @@index([item_fling_effect_id], map: "idx_16972_pokemon_v2_item_item_fling_effect_id_8e7cefaa")
  @@index([name], map: "idx_16972_pokemon_v2_item_name_5597f95e")
}

model pokemon_v2_itemattribute {
  id                                  BigInt                                @id(map: "idx_16979_pokemon_v2_itemattribute_pkey") @default(autoincrement())
  name                                String?
  pokemon_v2_itemattributedescription pokemon_v2_itemattributedescription[]
  pokemon_v2_itemattributemap         pokemon_v2_itemattributemap[]
  pokemon_v2_itemattributename        pokemon_v2_itemattributename[]

  @@index([name], map: "idx_16979_pokemon_v2_itemattribute_name_7e365d21")
}

model pokemon_v2_itemattributedescription {
  id                       BigInt                    @id(map: "idx_16695_pokemon_v2_itemattributedescription_pkey") @default(autoincrement())
  description              String?
  item_attribute_id        BigInt?
  language_id              BigInt?
  pokemon_v2_itemattribute pokemon_v2_itemattribute? @relation(fields: [item_attribute_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language      pokemon_v2_language?      @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([item_attribute_id], map: "idx_16695_pokemon_v2_itemattributedescription_item_attribute_id")
  @@index([language_id], map: "idx_16695_pokemon_v2_itemattributedescription_language_id_5385b")
}

model pokemon_v2_itemattributemap {
  id                       BigInt                    @id(map: "idx_16702_pokemon_v2_itemattributemap_pkey") @default(autoincrement())
  item_id                  BigInt?
  item_attribute_id        BigInt?
  pokemon_v2_itemattribute pokemon_v2_itemattribute? @relation(fields: [item_attribute_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_item          pokemon_v2_item?          @relation(fields: [item_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([item_attribute_id], map: "idx_16702_pokemon_v2_itemattributemap_item_attribute_id_e6cd252")
  @@index([item_id], map: "idx_16702_pokemon_v2_itemattributemap_item_id_e6dba1a6")
}

model pokemon_v2_itemattributename {
  id                       BigInt                    @id(map: "idx_16986_pokemon_v2_itemattributename_pkey") @default(autoincrement())
  item_attribute_id        BigInt?
  language_id              BigInt?
  name                     String?
  pokemon_v2_itemattribute pokemon_v2_itemattribute? @relation(fields: [item_attribute_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language      pokemon_v2_language?      @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([item_attribute_id], map: "idx_16986_pokemon_v2_itemattributename_item_attribute_id_85acc7")
  @@index([language_id], map: "idx_16986_pokemon_v2_itemattributename_language_id_e36a7fe1")
  @@index([name], map: "idx_16986_pokemon_v2_itemattributename_name_3e2ccd4a")
}

model pokemon_v2_itemcategory {
  id                          BigInt                        @id(map: "idx_16993_pokemon_v2_itemcategory_pkey") @default(autoincrement())
  item_pocket_id              BigInt?
  name                        String?
  pokemon_v2_item             pokemon_v2_item[]
  pokemon_v2_itempocket       pokemon_v2_itempocket?        @relation(fields: [item_pocket_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_itemcategoryname pokemon_v2_itemcategoryname[]

  @@index([item_pocket_id], map: "idx_16993_pokemon_v2_itemcategory_item_pocket_id_8ebf7645")
  @@index([name], map: "idx_16993_pokemon_v2_itemcategory_name_54594288")
}

model pokemon_v2_itemcategoryname {
  id                      BigInt                   @id(map: "idx_17000_pokemon_v2_itemcategoryname_pkey") @default(autoincrement())
  item_category_id        BigInt?
  language_id             BigInt?
  name                    String?
  pokemon_v2_itemcategory pokemon_v2_itemcategory? @relation(fields: [item_category_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language     pokemon_v2_language?     @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([item_category_id], map: "idx_17000_pokemon_v2_itemcategoryname_item_category_id_10412a45")
  @@index([language_id], map: "idx_17000_pokemon_v2_itemcategoryname_language_id_6a5424db")
  @@index([name], map: "idx_17000_pokemon_v2_itemcategoryname_name_b0889e22")
}

model pokemon_v2_itemeffecttext {
  id                  BigInt               @id(map: "idx_16740_pokemon_v2_itemeffecttext_pkey") @default(autoincrement())
  effect              String?
  short_effect        String?
  item_id             BigInt?
  language_id         BigInt?
  pokemon_v2_item     pokemon_v2_item?     @relation(fields: [item_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language pokemon_v2_language? @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([item_id], map: "idx_16740_pokemon_v2_itemeffecttext_item_id_2fb7601c")
  @@index([language_id], map: "idx_16740_pokemon_v2_itemeffecttext_language_id_53e95659")
}

model pokemon_v2_itemflavortext {
  id                      BigInt                   @id(map: "idx_16593_pokemon_v2_itemflavortext_pkey") @default(autoincrement())
  flavor_text             String?
  item_id                 BigInt?
  language_id             BigInt?
  version_group_id        BigInt?
  pokemon_v2_item         pokemon_v2_item?         @relation(fields: [item_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language     pokemon_v2_language?     @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_versiongroup pokemon_v2_versiongroup? @relation(fields: [version_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([item_id], map: "idx_16593_pokemon_v2_itemflavortext_item_id_f2575960")
  @@index([language_id], map: "idx_16593_pokemon_v2_itemflavortext_language_id_dee91cde")
  @@index([version_group_id], map: "idx_16593_pokemon_v2_itemflavortext_version_group_id_20b07485")
}

model pokemon_v2_itemflingeffect {
  id                                   BigInt                                 @id(map: "idx_17007_pokemon_v2_itemflingeffect_pkey") @default(autoincrement())
  name                                 String?
  pokemon_v2_item                      pokemon_v2_item[]
  pokemon_v2_itemflingeffecteffecttext pokemon_v2_itemflingeffecteffecttext[]

  @@index([name], map: "idx_17007_pokemon_v2_itemflingeffect_name_bcd91c57")
}

model pokemon_v2_itemflingeffecteffecttext {
  id                         BigInt                      @id(map: "idx_16804_pokemon_v2_itemflingeffecteffecttext_pkey") @default(autoincrement())
  item_fling_effect_id       BigInt?
  language_id                BigInt?
  effect                     String?
  pokemon_v2_itemflingeffect pokemon_v2_itemflingeffect? @relation(fields: [item_fling_effect_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language        pokemon_v2_language?        @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([item_fling_effect_id], map: "idx_16804_pokemon_v2_itemflingeffecteffecttext_item_fling_effec")
  @@index([language_id], map: "idx_16804_pokemon_v2_itemflingeffecteffecttext_language_id_7c36")
}

model pokemon_v2_itemgameindex {
  id                    BigInt                 @id(map: "idx_16600_pokemon_v2_itemgameindex_pkey") @default(autoincrement())
  game_index            BigInt?
  generation_id         BigInt?
  item_id               BigInt?
  pokemon_v2_generation pokemon_v2_generation? @relation(fields: [generation_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_item       pokemon_v2_item?       @relation(fields: [item_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([generation_id], map: "idx_16600_pokemon_v2_itemgameindex_generation_id_a182ee37")
  @@index([item_id], map: "idx_16600_pokemon_v2_itemgameindex_item_id_518e20fd")
}

model pokemon_v2_itemname {
  id                  BigInt               @id(map: "idx_17014_pokemon_v2_itemname_pkey") @default(autoincrement())
  item_id             BigInt?
  language_id         BigInt?
  name                String?
  pokemon_v2_item     pokemon_v2_item?     @relation(fields: [item_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language pokemon_v2_language? @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([item_id], map: "idx_17014_pokemon_v2_itemname_item_id_cf942d90")
  @@index([language_id], map: "idx_17014_pokemon_v2_itemname_language_id_69bf5660")
  @@index([name], map: "idx_17014_pokemon_v2_itemname_name_4b3fc446")
}

model pokemon_v2_itempocket {
  id                        BigInt                      @id(map: "idx_17021_pokemon_v2_itempocket_pkey") @default(autoincrement())
  name                      String?
  pokemon_v2_itemcategory   pokemon_v2_itemcategory[]
  pokemon_v2_itempocketname pokemon_v2_itempocketname[]

  @@index([name], map: "idx_17021_pokemon_v2_itempocket_name_d30e337a")
}

model pokemon_v2_itempocketname {
  id                    BigInt                 @id(map: "idx_17028_pokemon_v2_itempocketname_pkey") @default(autoincrement())
  item_pocket_id        BigInt?
  language_id           BigInt?
  name                  String?
  pokemon_v2_itempocket pokemon_v2_itempocket? @relation(fields: [item_pocket_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language   pokemon_v2_language?   @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([item_pocket_id], map: "idx_17028_pokemon_v2_itempocketname_item_pocket_id_2856f7ba")
  @@index([language_id], map: "idx_17028_pokemon_v2_itempocketname_language_id_bd18485d")
  @@index([name], map: "idx_17028_pokemon_v2_itempocketname_name_c3e53fd6")
}

model pokemon_v2_itemsprites {
  id              BigInt           @id(map: "idx_17398_pokemon_v2_itemsprites_pkey") @default(autoincrement())
  item_id         BigInt?
  sprites         String?
  pokemon_v2_item pokemon_v2_item? @relation(fields: [item_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([item_id], map: "idx_17398_pokemon_v2_itemsprites_item_id_ad42d3ae")
}

model pokemon_v2_language {
  id                                                                                     BigInt                                    @id(map: "idx_17350_pokemon_v2_language_pkey") @default(autoincrement())
  iso3166                                                                                String?
  name                                                                                   String?
  official                                                                               Boolean?
  order                                                                                  BigInt?
  iso639                                                                                 String?
  pokemon_v2_abilitychangeeffecttext                                                     pokemon_v2_abilitychangeeffecttext[]
  pokemon_v2_abilityeffecttext                                                           pokemon_v2_abilityeffecttext[]
  pokemon_v2_abilityflavortext                                                           pokemon_v2_abilityflavortext[]
  pokemon_v2_abilityname                                                                 pokemon_v2_abilityname[]
  pokemon_v2_berryfirmnessname                                                           pokemon_v2_berryfirmnessname[]
  pokemon_v2_berryflavorname                                                             pokemon_v2_berryflavorname[]
  pokemon_v2_characteristicdescription                                                   pokemon_v2_characteristicdescription[]
  pokemon_v2_contesteffecteffecttext                                                     pokemon_v2_contesteffecteffecttext[]
  pokemon_v2_contesteffectflavortext                                                     pokemon_v2_contesteffectflavortext[]
  pokemon_v2_contesttypename                                                             pokemon_v2_contesttypename[]
  pokemon_v2_egggroupname                                                                pokemon_v2_egggroupname[]
  pokemon_v2_encounterconditionname                                                      pokemon_v2_encounterconditionname[]
  pokemon_v2_encounterconditionvaluename                                                 pokemon_v2_encounterconditionvaluename[]
  pokemon_v2_encountermethodname                                                         pokemon_v2_encountermethodname[]
  pokemon_v2_evolutiontriggername                                                        pokemon_v2_evolutiontriggername[]
  pokemon_v2_generationname                                                              pokemon_v2_generationname[]
  pokemon_v2_growthratedescription                                                       pokemon_v2_growthratedescription[]
  pokemon_v2_itemattributedescription                                                    pokemon_v2_itemattributedescription[]
  pokemon_v2_itemattributename                                                           pokemon_v2_itemattributename[]
  pokemon_v2_itemcategoryname                                                            pokemon_v2_itemcategoryname[]
  pokemon_v2_itemeffecttext                                                              pokemon_v2_itemeffecttext[]
  pokemon_v2_itemflavortext                                                              pokemon_v2_itemflavortext[]
  pokemon_v2_itemflingeffecteffecttext                                                   pokemon_v2_itemflingeffecteffecttext[]
  pokemon_v2_itemname                                                                    pokemon_v2_itemname[]
  pokemon_v2_itempocketname                                                              pokemon_v2_itempocketname[]
  pokemon_v2_languagename_pokemon_v2_languagename_language_idTopokemon_v2_language       pokemon_v2_languagename[]                 @relation("pokemon_v2_languagename_language_idTopokemon_v2_language")
  pokemon_v2_languagename_pokemon_v2_languagename_local_language_idTopokemon_v2_language pokemon_v2_languagename[]                 @relation("pokemon_v2_languagename_local_language_idTopokemon_v2_language")
  pokemon_v2_locationareaname                                                            pokemon_v2_locationareaname[]
  pokemon_v2_locationname                                                                pokemon_v2_locationname[]
  pokemon_v2_moveattributedescription                                                    pokemon_v2_moveattributedescription[]
  pokemon_v2_moveattributename                                                           pokemon_v2_moveattributename[]
  pokemon_v2_movebattlestylename                                                         pokemon_v2_movebattlestylename[]
  pokemon_v2_movedamageclassdescription                                                  pokemon_v2_movedamageclassdescription[]
  pokemon_v2_movedamageclassname                                                         pokemon_v2_movedamageclassname[]
  pokemon_v2_moveeffectchangeeffecttext                                                  pokemon_v2_moveeffectchangeeffecttext[]
  pokemon_v2_moveeffecteffecttext                                                        pokemon_v2_moveeffecteffecttext[]
  pokemon_v2_moveflavortext                                                              pokemon_v2_moveflavortext[]
  pokemon_v2_movelearnmethoddescription                                                  pokemon_v2_movelearnmethoddescription[]
  pokemon_v2_movelearnmethodname                                                         pokemon_v2_movelearnmethodname[]
  pokemon_v2_movemetaailmentname                                                         pokemon_v2_movemetaailmentname[]
  pokemon_v2_movemetacategorydescription                                                 pokemon_v2_movemetacategorydescription[]
  pokemon_v2_movename                                                                    pokemon_v2_movename[]
  pokemon_v2_movetargetdescription                                                       pokemon_v2_movetargetdescription[]
  pokemon_v2_movetargetname                                                              pokemon_v2_movetargetname[]
  pokemon_v2_naturename                                                                  pokemon_v2_naturename[]
  pokemon_v2_palparkareaname                                                             pokemon_v2_palparkareaname[]
  pokemon_v2_pokeathlonstatname                                                          pokemon_v2_pokeathlonstatname[]
  pokemon_v2_pokedexdescription                                                          pokemon_v2_pokedexdescription[]
  pokemon_v2_pokedexname                                                                 pokemon_v2_pokedexname[]
  pokemon_v2_pokemoncolorname                                                            pokemon_v2_pokemoncolorname[]
  pokemon_v2_pokemonformname                                                             pokemon_v2_pokemonformname[]
  pokemon_v2_pokemonhabitatname                                                          pokemon_v2_pokemonhabitatname[]
  pokemon_v2_pokemonshapename                                                            pokemon_v2_pokemonshapename[]
  pokemon_v2_pokemonspeciesdescription                                                   pokemon_v2_pokemonspeciesdescription[]
  pokemon_v2_pokemonspeciesflavortext                                                    pokemon_v2_pokemonspeciesflavortext[]
  pokemon_v2_pokemonspeciesname                                                          pokemon_v2_pokemonspeciesname[]
  pokemon_v2_regionname                                                                  pokemon_v2_regionname[]
  pokemon_v2_statname                                                                    pokemon_v2_statname[]
  pokemon_v2_supercontesteffectflavortext                                                pokemon_v2_supercontesteffectflavortext[]
  pokemon_v2_typename                                                                    pokemon_v2_typename[]
  pokemon_v2_versionname                                                                 pokemon_v2_versionname[]

  @@index([name], map: "idx_17350_pokemon_v2_language_name_012b2a8c")
}

model pokemon_v2_languagename {
  id                                                                                 BigInt               @id(map: "idx_17035_pokemon_v2_languagename_pkey") @default(autoincrement())
  language_id                                                                        BigInt?
  local_language_id                                                                  BigInt?
  name                                                                               String?
  pokemon_v2_language_pokemon_v2_languagename_language_idTopokemon_v2_language       pokemon_v2_language? @relation("pokemon_v2_languagename_language_idTopokemon_v2_language", fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_language_pokemon_v2_languagename_local_language_idTopokemon_v2_language pokemon_v2_language? @relation("pokemon_v2_languagename_local_language_idTopokemon_v2_language", fields: [local_language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17035_pokemon_v2_languagename_language_id_75856281")
  @@index([local_language_id], map: "idx_17035_pokemon_v2_languagename_local_language_id_b09a9c7d")
  @@index([name], map: "idx_17035_pokemon_v2_languagename_name_6597eeaa")
}

model pokemon_v2_location {
  id                           BigInt                         @id(map: "idx_17042_pokemon_v2_location_pkey") @default(autoincrement())
  region_id                    BigInt?
  name                         String?
  pokemon_v2_region            pokemon_v2_region?             @relation(fields: [region_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_locationarea      pokemon_v2_locationarea[]
  pokemon_v2_locationgameindex pokemon_v2_locationgameindex[]
  pokemon_v2_locationname      pokemon_v2_locationname[]
  pokemon_v2_pokemonevolution  pokemon_v2_pokemonevolution[]

  @@index([name], map: "idx_17042_pokemon_v2_location_name_09fe9462")
  @@index([region_id], map: "idx_17042_pokemon_v2_location_region_id_fd1b5904")
}

model pokemon_v2_locationarea {
  id                                   BigInt                                 @id(map: "idx_17049_pokemon_v2_locationarea_pkey") @default(autoincrement())
  game_index                           BigInt?
  location_id                          BigInt?
  name                                 String?
  pokemon_v2_encounter                 pokemon_v2_encounter[]
  pokemon_v2_location                  pokemon_v2_location?                   @relation(fields: [location_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_locationareaencounterrate pokemon_v2_locationareaencounterrate[]
  pokemon_v2_locationareaname          pokemon_v2_locationareaname[]

  @@index([location_id], map: "idx_17049_pokemon_v2_locationarea_location_id_a62c4737")
  @@index([name], map: "idx_17049_pokemon_v2_locationarea_name_8b427914")
}

model pokemon_v2_locationareaencounterrate {
  id                         BigInt                      @id(map: "idx_16650_pokemon_v2_locationareaencounterrate_pkey") @default(autoincrement())
  rate                       BigInt?
  location_area_id           BigInt?
  version_id                 BigInt?
  encounter_method_id        BigInt?
  pokemon_v2_encountermethod pokemon_v2_encountermethod? @relation(fields: [encounter_method_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_locationarea    pokemon_v2_locationarea?    @relation(fields: [location_area_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_version         pokemon_v2_version?         @relation(fields: [version_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([encounter_method_id], map: "idx_16650_pokemon_v2_locationareaencounterrate_encounter_method")
  @@index([location_area_id], map: "idx_16650_pokemon_v2_locationareaencounterrate_location_area_id")
  @@index([version_id], map: "idx_16650_pokemon_v2_locationareaencounterrate_version_id_67e1b")
}

model pokemon_v2_locationareaname {
  id                      BigInt                   @id(map: "idx_17056_pokemon_v2_locationareaname_pkey") @default(autoincrement())
  language_id             BigInt?
  location_area_id        BigInt?
  name                    String?
  pokemon_v2_language     pokemon_v2_language?     @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_locationarea pokemon_v2_locationarea? @relation(fields: [location_area_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17056_pokemon_v2_locationareaname_language_id_82f198e4")
  @@index([location_area_id], map: "idx_17056_pokemon_v2_locationareaname_location_area_id_99f07edf")
  @@index([name], map: "idx_17056_pokemon_v2_locationareaname_name_36edcff1")
}

model pokemon_v2_locationgameindex {
  id                    BigInt                 @id(map: "idx_16635_pokemon_v2_locationgameindex_pkey") @default(autoincrement())
  game_index            BigInt?
  generation_id         BigInt?
  location_id           BigInt?
  pokemon_v2_generation pokemon_v2_generation? @relation(fields: [generation_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_location   pokemon_v2_location?   @relation(fields: [location_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([generation_id], map: "idx_16635_pokemon_v2_locationgameindex_generation_id_15ae87aa")
  @@index([location_id], map: "idx_16635_pokemon_v2_locationgameindex_location_id_4eadd886")
}

model pokemon_v2_locationname {
  id                  BigInt               @id(map: "idx_17063_pokemon_v2_locationname_pkey") @default(autoincrement())
  language_id         BigInt?
  location_id         BigInt?
  name                String?
  pokemon_v2_language pokemon_v2_language? @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_location pokemon_v2_location? @relation(fields: [location_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17063_pokemon_v2_locationname_language_id_9c042035")
  @@index([location_id], map: "idx_17063_pokemon_v2_locationname_location_id_b4de5b51")
  @@index([name], map: "idx_17063_pokemon_v2_locationname_name_0dc028d2")
}

model pokemon_v2_machine {
  id                      BigInt                   @id(map: "idx_16610_pokemon_v2_machine_pkey") @default(autoincrement())
  machine_number          BigInt?
  growth_rate_id          BigInt?
  move_id                 BigInt?
  version_group_id        BigInt?
  item_id                 BigInt?
  pokemon_v2_growthrate   pokemon_v2_growthrate?   @relation(fields: [growth_rate_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_item         pokemon_v2_item?         @relation(fields: [item_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_move         pokemon_v2_move?         @relation(fields: [move_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_versiongroup pokemon_v2_versiongroup? @relation(fields: [version_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([growth_rate_id], map: "idx_16610_pokemon_v2_machine_growth_rate_id_d67448d0")
  @@index([item_id], map: "idx_16610_pokemon_v2_machine_item_id_4c870846")
  @@index([move_id], map: "idx_16610_pokemon_v2_machine_move_id_965a6a38")
  @@index([version_group_id], map: "idx_16610_pokemon_v2_machine_version_group_id_d69b6064")
}

model pokemon_v2_move {
  id                                                                                        BigInt                          @id(map: "idx_17070_pokemon_v2_move_pkey") @default(autoincrement())
  power                                                                                     BigInt?
  pp                                                                                        BigInt?
  accuracy                                                                                  BigInt?
  priority                                                                                  BigInt?
  move_effect_chance                                                                        BigInt?
  generation_id                                                                             BigInt?
  move_damage_class_id                                                                      BigInt?
  move_effect_id                                                                            BigInt?
  move_target_id                                                                            BigInt?
  type_id                                                                                   BigInt?
  contest_effect_id                                                                         BigInt?
  contest_type_id                                                                           BigInt?
  super_contest_effect_id                                                                   BigInt?
  name                                                                                      String?
  pokemon_v2_contestcombo_pokemon_v2_contestcombo_first_move_idTopokemon_v2_move            pokemon_v2_contestcombo[]       @relation("pokemon_v2_contestcombo_first_move_idTopokemon_v2_move")
  pokemon_v2_contestcombo_pokemon_v2_contestcombo_second_move_idTopokemon_v2_move           pokemon_v2_contestcombo[]       @relation("pokemon_v2_contestcombo_second_move_idTopokemon_v2_move")
  pokemon_v2_machine                                                                        pokemon_v2_machine[]
  pokemon_v2_contesteffect                                                                  pokemon_v2_contesteffect?       @relation(fields: [contest_effect_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_contesttype                                                                    pokemon_v2_contesttype?         @relation(fields: [contest_type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_generation                                                                     pokemon_v2_generation?          @relation(fields: [generation_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_movedamageclass                                                                pokemon_v2_movedamageclass?     @relation(fields: [move_damage_class_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_moveeffect                                                                     pokemon_v2_moveeffect?          @relation(fields: [move_effect_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_movetarget                                                                     pokemon_v2_movetarget?          @relation(fields: [move_target_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_supercontesteffect                                                             pokemon_v2_supercontesteffect?  @relation(fields: [super_contest_effect_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_type                                                                           pokemon_v2_type?                @relation(fields: [type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_moveattributemap                                                               pokemon_v2_moveattributemap[]
  pokemon_v2_movechange                                                                     pokemon_v2_movechange[]
  pokemon_v2_moveflavortext                                                                 pokemon_v2_moveflavortext[]
  pokemon_v2_movemeta                                                                       pokemon_v2_movemeta?
  pokemon_v2_movemetastatchange                                                             pokemon_v2_movemetastatchange[]
  pokemon_v2_movename                                                                       pokemon_v2_movename[]
  pokemon_v2_pokemonevolution                                                               pokemon_v2_pokemonevolution[]
  pokemon_v2_pokemonmove                                                                    pokemon_v2_pokemonmove[]
  pokemon_v2_supercontestcombo_pokemon_v2_supercontestcombo_first_move_idTopokemon_v2_move  pokemon_v2_supercontestcombo[]  @relation("pokemon_v2_supercontestcombo_first_move_idTopokemon_v2_move")
  pokemon_v2_supercontestcombo_pokemon_v2_supercontestcombo_second_move_idTopokemon_v2_move pokemon_v2_supercontestcombo[]  @relation("pokemon_v2_supercontestcombo_second_move_idTopokemon_v2_move")

  @@index([contest_effect_id], map: "idx_17070_pokemon_v2_move_contest_effect_id_2e4d04a1")
  @@index([contest_type_id], map: "idx_17070_pokemon_v2_move_contest_type_id_8da106eb")
  @@index([generation_id], map: "idx_17070_pokemon_v2_move_generation_id_d18da2f9")
  @@index([move_damage_class_id], map: "idx_17070_pokemon_v2_move_move_damage_class_id_6f60c380")
  @@index([move_effect_id], map: "idx_17070_pokemon_v2_move_move_effect_id_e12d5c62")
  @@index([move_target_id], map: "idx_17070_pokemon_v2_move_move_target_id_47f917eb")
  @@index([name], map: "idx_17070_pokemon_v2_move_name_b3558818")
  @@index([super_contest_effect_id], map: "idx_17070_pokemon_v2_move_super_contest_effect_id_c0efdaf5")
  @@index([type_id], map: "idx_17070_pokemon_v2_move_type_id_a2b25a4c")
}

model pokemon_v2_moveattribute {
  id                                  BigInt                                @id(map: "idx_17077_pokemon_v2_moveattribute_pkey") @default(autoincrement())
  name                                String?
  pokemon_v2_moveattributedescription pokemon_v2_moveattributedescription[]
  pokemon_v2_moveattributemap         pokemon_v2_moveattributemap[]
  pokemon_v2_moveattributename        pokemon_v2_moveattributename[]

  @@index([name], map: "idx_17077_pokemon_v2_moveattribute_name_3a5f5200")
}

model pokemon_v2_moveattributedescription {
  id                       BigInt                    @id(map: "idx_16707_pokemon_v2_moveattributedescription_pkey") @default(autoincrement())
  description              String?
  language_id              BigInt?
  move_attribute_id        BigInt?
  pokemon_v2_language      pokemon_v2_language?      @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_moveattribute pokemon_v2_moveattribute? @relation(fields: [move_attribute_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_16707_pokemon_v2_moveattributedescription_language_id_3cc96")
  @@index([move_attribute_id], map: "idx_16707_pokemon_v2_moveattributedescription_move_attribute_id")
}

model pokemon_v2_moveattributemap {
  id                       BigInt                    @id(map: "idx_16714_pokemon_v2_moveattributemap_pkey") @default(autoincrement())
  move_id                  BigInt?
  move_attribute_id        BigInt?
  pokemon_v2_moveattribute pokemon_v2_moveattribute? @relation(fields: [move_attribute_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_move          pokemon_v2_move?          @relation(fields: [move_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([move_attribute_id], map: "idx_16714_pokemon_v2_moveattributemap_move_attribute_id_4bdcbae")
  @@index([move_id], map: "idx_16714_pokemon_v2_moveattributemap_move_id_8e9353e9")
}

model pokemon_v2_moveattributename {
  id                       BigInt                    @id(map: "idx_17084_pokemon_v2_moveattributename_pkey") @default(autoincrement())
  language_id              BigInt?
  move_attribute_id        BigInt?
  name                     String?
  pokemon_v2_language      pokemon_v2_language?      @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_moveattribute pokemon_v2_moveattribute? @relation(fields: [move_attribute_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17084_pokemon_v2_moveattributename_language_id_f0fdbb0e")
  @@index([move_attribute_id], map: "idx_17084_pokemon_v2_moveattributename_move_attribute_id_06b2d5")
  @@index([name], map: "idx_17084_pokemon_v2_moveattributename_name_9d7c4e1e")
}

model pokemon_v2_movebattlestyle {
  id                                     BigInt                                   @id(map: "idx_17091_pokemon_v2_movebattlestyle_pkey") @default(autoincrement())
  name                                   String?
  pokemon_v2_movebattlestylename         pokemon_v2_movebattlestylename[]
  pokemon_v2_naturebattlestylepreference pokemon_v2_naturebattlestylepreference[]

  @@index([name], map: "idx_17091_pokemon_v2_movebattlestyle_name_0257848e")
}

model pokemon_v2_movebattlestylename {
  id                         BigInt                      @id(map: "idx_17098_pokemon_v2_movebattlestylename_pkey") @default(autoincrement())
  language_id                BigInt?
  move_battle_style_id       BigInt?
  name                       String?
  pokemon_v2_language        pokemon_v2_language?        @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_movebattlestyle pokemon_v2_movebattlestyle? @relation(fields: [move_battle_style_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17098_pokemon_v2_movebattlestylename_language_id_6dd407cd")
  @@index([move_battle_style_id], map: "idx_17098_pokemon_v2_movebattlestylename_move_battle_style_id_0")
  @@index([name], map: "idx_17098_pokemon_v2_movebattlestylename_name_4470754a")
}

model pokemon_v2_movechange {
  id                      BigInt                   @id(map: "idx_16510_pokemon_v2_movechange_pkey") @default(autoincrement())
  power                   BigInt?
  accuracy                BigInt?
  move_effect_chance      BigInt?
  move_id                 BigInt?
  move_effect_id          BigInt?
  type_id                 BigInt?
  version_group_id        BigInt?
  pp                      BigInt?
  pokemon_v2_moveeffect   pokemon_v2_moveeffect?   @relation(fields: [move_effect_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_move         pokemon_v2_move?         @relation(fields: [move_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_type         pokemon_v2_type?         @relation(fields: [type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_versiongroup pokemon_v2_versiongroup? @relation(fields: [version_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([move_effect_id], map: "idx_16510_pokemon_v2_movechange_move_effect_id_d0711cd2")
  @@index([move_id], map: "idx_16510_pokemon_v2_movechange_move_id_56b40d0f")
  @@index([type_id], map: "idx_16510_pokemon_v2_movechange_type_id_07064588")
  @@index([version_group_id], map: "idx_16510_pokemon_v2_movechange_version_group_id_d98e7e4b")
}

model pokemon_v2_movedamageclass {
  id                                    BigInt                                  @id(map: "idx_17105_pokemon_v2_movedamageclass_pkey") @default(autoincrement())
  name                                  String?
  pokemon_v2_move                       pokemon_v2_move[]
  pokemon_v2_movedamageclassdescription pokemon_v2_movedamageclassdescription[]
  pokemon_v2_movedamageclassname        pokemon_v2_movedamageclassname[]
  pokemon_v2_stat                       pokemon_v2_stat[]
  pokemon_v2_type                       pokemon_v2_type[]

  @@index([name], map: "idx_17105_pokemon_v2_movedamageclass_name_8c1669d6")
}

model pokemon_v2_movedamageclassdescription {
  id                         BigInt                      @id(map: "idx_16467_pokemon_v2_movedamageclassdescription_pkey") @default(autoincrement())
  description                String?
  language_id                BigInt?
  move_damage_class_id       BigInt?
  pokemon_v2_language        pokemon_v2_language?        @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_movedamageclass pokemon_v2_movedamageclass? @relation(fields: [move_damage_class_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_16467_pokemon_v2_movedamageclassdescription_language_id_984")
  @@index([move_damage_class_id], map: "idx_16467_pokemon_v2_movedamageclassdescription_move_damage_cla")
}

model pokemon_v2_movedamageclassname {
  id                         BigInt                      @id(map: "idx_17112_pokemon_v2_movedamageclassname_pkey") @default(autoincrement())
  language_id                BigInt?
  move_damage_class_id       BigInt?
  name                       String?
  pokemon_v2_language        pokemon_v2_language?        @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_movedamageclass pokemon_v2_movedamageclass? @relation(fields: [move_damage_class_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17112_pokemon_v2_movedamageclassname_language_id_b66d9a02")
  @@index([move_damage_class_id], map: "idx_17112_pokemon_v2_movedamageclassname_move_damage_class_id_8")
  @@index([name], map: "idx_17112_pokemon_v2_movedamageclassname_name_e38f4f0f")
}

model pokemon_v2_moveeffect {
  id                              BigInt                            @id(map: "idx_16474_pokemon_v2_moveeffect_pkey") @default(autoincrement())
  pokemon_v2_move                 pokemon_v2_move[]
  pokemon_v2_movechange           pokemon_v2_movechange[]
  pokemon_v2_moveeffectchange     pokemon_v2_moveeffectchange[]
  pokemon_v2_moveeffecteffecttext pokemon_v2_moveeffecteffecttext[]
}

model pokemon_v2_moveeffectchange {
  id                                    BigInt                                  @id(map: "idx_16479_pokemon_v2_moveeffectchange_pkey") @default(autoincrement())
  move_effect_id                        BigInt?
  version_group_id                      BigInt?
  pokemon_v2_moveeffect                 pokemon_v2_moveeffect?                  @relation(fields: [move_effect_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_versiongroup               pokemon_v2_versiongroup?                @relation(fields: [version_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_moveeffectchangeeffecttext pokemon_v2_moveeffectchangeeffecttext[]

  @@index([move_effect_id], map: "idx_16479_pokemon_v2_moveeffectchange_move_effect_id_83bb0e24")
  @@index([version_group_id], map: "idx_16479_pokemon_v2_moveeffectchange_version_group_id_ad5675d0")
}

model pokemon_v2_moveeffectchangeeffecttext {
  id                          BigInt                       @id(map: "idx_16754_pokemon_v2_moveeffectchangeeffecttext_pkey") @default(autoincrement())
  effect                      String?
  language_id                 BigInt?
  move_effect_change_id       BigInt?
  pokemon_v2_moveeffectchange pokemon_v2_moveeffectchange? @relation(fields: [move_effect_change_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "pokemon_v2_moveeffectchangeeffecttex_move_effect_change_id_fkey")
  pokemon_v2_language         pokemon_v2_language?         @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_16754_pokemon_v2_moveeffectchangeeffecttext_language_id_f61")
  @@index([move_effect_change_id], map: "idx_16754_pokemon_v2_moveeffectchangeeffecttext_move_effect_cha")
}

model pokemon_v2_moveeffecteffecttext {
  id                    BigInt                 @id(map: "idx_16761_pokemon_v2_moveeffecteffecttext_pkey") @default(autoincrement())
  effect                String?
  short_effect          String?
  language_id           BigInt?
  move_effect_id        BigInt?
  pokemon_v2_language   pokemon_v2_language?   @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_moveeffect pokemon_v2_moveeffect? @relation(fields: [move_effect_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_16761_pokemon_v2_moveeffecteffecttext_language_id_4e202686")
  @@index([move_effect_id], map: "idx_16761_pokemon_v2_moveeffecteffecttext_move_effect_id_e83415")
}

model pokemon_v2_moveflavortext {
  id                      BigInt                   @id(map: "idx_16484_pokemon_v2_moveflavortext_pkey") @default(autoincrement())
  flavor_text             String?
  language_id             BigInt?
  move_id                 BigInt?
  version_group_id        BigInt?
  pokemon_v2_language     pokemon_v2_language?     @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_move         pokemon_v2_move?         @relation(fields: [move_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_versiongroup pokemon_v2_versiongroup? @relation(fields: [version_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_16484_pokemon_v2_moveflavortext_language_id_cad665e7")
  @@index([move_id], map: "idx_16484_pokemon_v2_moveflavortext_move_id_e694b553")
  @@index([version_group_id], map: "idx_16484_pokemon_v2_moveflavortext_version_group_id_acb46240")
}

model pokemon_v2_movelearnmethod {
  id                                     BigInt                                   @id(map: "idx_17119_pokemon_v2_movelearnmethod_pkey") @default(autoincrement())
  name                                   String?
  pokemon_v2_movelearnmethoddescription  pokemon_v2_movelearnmethoddescription[]
  pokemon_v2_movelearnmethodname         pokemon_v2_movelearnmethodname[]
  pokemon_v2_pokemonmove                 pokemon_v2_pokemonmove[]
  pokemon_v2_versiongroupmovelearnmethod pokemon_v2_versiongroupmovelearnmethod[]

  @@index([name], map: "idx_17119_pokemon_v2_movelearnmethod_name_d6294fe9")
}

model pokemon_v2_movelearnmethoddescription {
  id                         BigInt                      @id(map: "idx_16719_pokemon_v2_movelearnmethoddescription_pkey") @default(autoincrement())
  description                String?
  language_id                BigInt?
  move_learn_method_id       BigInt?
  pokemon_v2_language        pokemon_v2_language?        @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_movelearnmethod pokemon_v2_movelearnmethod? @relation(fields: [move_learn_method_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_16719_pokemon_v2_movelearnmethoddescription_language_id_a6b")
  @@index([move_learn_method_id], map: "idx_16719_pokemon_v2_movelearnmethoddescription_move_learn_meth")
}

model pokemon_v2_movelearnmethodname {
  id                         BigInt                      @id(map: "idx_17126_pokemon_v2_movelearnmethodname_pkey") @default(autoincrement())
  language_id                BigInt?
  move_learn_method_id       BigInt?
  name                       String?
  pokemon_v2_language        pokemon_v2_language?        @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_movelearnmethod pokemon_v2_movelearnmethod? @relation(fields: [move_learn_method_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17126_pokemon_v2_movelearnmethodname_language_id_aa17010f")
  @@index([move_learn_method_id], map: "idx_17126_pokemon_v2_movelearnmethodname_move_learn_method_id_0")
  @@index([name], map: "idx_17126_pokemon_v2_movelearnmethodname_name_b665e82d")
}

model pokemon_v2_movemeta {
  id                          BigInt                       @id(map: "idx_16515_pokemon_v2_movemeta_pkey") @default(autoincrement())
  min_hits                    BigInt?
  max_hits                    BigInt?
  min_turns                   BigInt?
  max_turns                   BigInt?
  crit_rate                   BigInt?
  ailment_chance              BigInt?
  flinch_chance               BigInt?
  stat_chance                 BigInt?
  move_meta_category_id       BigInt?
  move_id                     BigInt?                      @unique(map: "idx_16515_sqlite_autoindex_pokemon_v2_movemeta_1")
  move_meta_ailment_id        BigInt?
  drain                       BigInt?
  healing                     BigInt?
  pokemon_v2_move             pokemon_v2_move?             @relation(fields: [move_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_movemetaailment  pokemon_v2_movemetaailment?  @relation(fields: [move_meta_ailment_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_movemetacategory pokemon_v2_movemetacategory? @relation(fields: [move_meta_category_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([move_meta_ailment_id], map: "idx_16515_pokemon_v2_movemeta_move_meta_ailment_id_d261d5e1")
  @@index([move_meta_category_id], map: "idx_16515_pokemon_v2_movemeta_move_meta_category_id_5fc2f4b6")
}

model pokemon_v2_movemetaailment {
  id                             BigInt                           @id(map: "idx_17133_pokemon_v2_movemetaailment_pkey") @default(autoincrement())
  name                           String?
  pokemon_v2_movemeta            pokemon_v2_movemeta[]
  pokemon_v2_movemetaailmentname pokemon_v2_movemetaailmentname[]

  @@index([name], map: "idx_17133_pokemon_v2_movemetaailment_name_7e8b85b0")
}

model pokemon_v2_movemetaailmentname {
  id                         BigInt                      @id(map: "idx_17140_pokemon_v2_movemetaailmentname_pkey") @default(autoincrement())
  language_id                BigInt?
  move_meta_ailment_id       BigInt?
  name                       String?
  pokemon_v2_language        pokemon_v2_language?        @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_movemetaailment pokemon_v2_movemetaailment? @relation(fields: [move_meta_ailment_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17140_pokemon_v2_movemetaailmentname_language_id_c536b83b")
  @@index([move_meta_ailment_id], map: "idx_17140_pokemon_v2_movemetaailmentname_move_meta_ailment_id_3")
  @@index([name], map: "idx_17140_pokemon_v2_movemetaailmentname_name_a286e4d0")
}

model pokemon_v2_movemetacategory {
  id                                     BigInt                                   @id(map: "idx_17147_pokemon_v2_movemetacategory_pkey") @default(autoincrement())
  name                                   String?
  pokemon_v2_movemeta                    pokemon_v2_movemeta[]
  pokemon_v2_movemetacategorydescription pokemon_v2_movemetacategorydescription[]

  @@index([name], map: "idx_17147_pokemon_v2_movemetacategory_name_2d508cb0")
}

model pokemon_v2_movemetacategorydescription {
  id                          BigInt                       @id(map: "idx_16491_pokemon_v2_movemetacategorydescription_pkey") @default(autoincrement())
  description                 String?
  language_id                 BigInt?
  move_meta_category_id       BigInt?
  pokemon_v2_movemetacategory pokemon_v2_movemetacategory? @relation(fields: [move_meta_category_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "pokemon_v2_movemetacategorydescripti_move_meta_category_id_fkey")
  pokemon_v2_language         pokemon_v2_language?         @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_16491_pokemon_v2_movemetacategorydescription_language_id_fe")
  @@index([move_meta_category_id], map: "idx_16491_pokemon_v2_movemetacategorydescription_move_meta_cate")
}

model pokemon_v2_movemetastatchange {
  id              BigInt           @id(map: "idx_16498_pokemon_v2_movemetastatchange_pkey") @default(autoincrement())
  change          BigInt?
  move_id         BigInt?
  stat_id         BigInt?
  pokemon_v2_move pokemon_v2_move? @relation(fields: [move_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_stat pokemon_v2_stat? @relation(fields: [stat_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([move_id], map: "idx_16498_pokemon_v2_movemetastatchange_move_id_b8528bde")
  @@index([stat_id], map: "idx_16498_pokemon_v2_movemetastatchange_stat_id_7bbd0200")
}

model pokemon_v2_movename {
  id                  BigInt               @id(map: "idx_17154_pokemon_v2_movename_pkey") @default(autoincrement())
  language_id         BigInt?
  move_id             BigInt?
  name                String?
  pokemon_v2_language pokemon_v2_language? @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_move     pokemon_v2_move?     @relation(fields: [move_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17154_pokemon_v2_movename_language_id_9c478512")
  @@index([move_id], map: "idx_17154_pokemon_v2_movename_move_id_f28e6bef")
  @@index([name], map: "idx_17154_pokemon_v2_movename_name_8f60338a")
}

model pokemon_v2_movetarget {
  id                               BigInt                             @id(map: "idx_17161_pokemon_v2_movetarget_pkey") @default(autoincrement())
  name                             String?
  pokemon_v2_move                  pokemon_v2_move[]
  pokemon_v2_movetargetdescription pokemon_v2_movetargetdescription[]
  pokemon_v2_movetargetname        pokemon_v2_movetargetname[]

  @@index([name], map: "idx_17161_pokemon_v2_movetarget_name_af0c75ad")
}

model pokemon_v2_movetargetdescription {
  id                    BigInt                 @id(map: "idx_16503_pokemon_v2_movetargetdescription_pkey") @default(autoincrement())
  description           String?
  language_id           BigInt?
  move_target_id        BigInt?
  pokemon_v2_language   pokemon_v2_language?   @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_movetarget pokemon_v2_movetarget? @relation(fields: [move_target_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_16503_pokemon_v2_movetargetdescription_language_id_85ac7390")
  @@index([move_target_id], map: "idx_16503_pokemon_v2_movetargetdescription_move_target_id_1afb9")
}

model pokemon_v2_movetargetname {
  id                    BigInt                 @id(map: "idx_17168_pokemon_v2_movetargetname_pkey") @default(autoincrement())
  language_id           BigInt?
  move_target_id        BigInt?
  name                  String?
  pokemon_v2_language   pokemon_v2_language?   @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_movetarget pokemon_v2_movetarget? @relation(fields: [move_target_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17168_pokemon_v2_movetargetname_language_id_05d3b8b8")
  @@index([move_target_id], map: "idx_17168_pokemon_v2_movetargetname_move_target_id_61f56365")
  @@index([name], map: "idx_17168_pokemon_v2_movetargetname_name_ae888d7a")
}

model pokemon_v2_nature {
  id                                                                               BigInt                                   @id(map: "idx_17175_pokemon_v2_nature_pkey") @default(autoincrement())
  game_index                                                                       BigInt?
  decreased_stat_id                                                                BigInt?
  increased_stat_id                                                                BigInt?
  hates_flavor_id                                                                  BigInt?
  likes_flavor_id                                                                  BigInt?
  name                                                                             String?
  pokemon_v2_stat_pokemon_v2_nature_decreased_stat_idTopokemon_v2_stat             pokemon_v2_stat?                         @relation("pokemon_v2_nature_decreased_stat_idTopokemon_v2_stat", fields: [decreased_stat_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_berryflavor_pokemon_v2_nature_hates_flavor_idTopokemon_v2_berryflavor pokemon_v2_berryflavor?                  @relation("pokemon_v2_nature_hates_flavor_idTopokemon_v2_berryflavor", fields: [hates_flavor_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_stat_pokemon_v2_nature_increased_stat_idTopokemon_v2_stat             pokemon_v2_stat?                         @relation("pokemon_v2_nature_increased_stat_idTopokemon_v2_stat", fields: [increased_stat_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_berryflavor_pokemon_v2_nature_likes_flavor_idTopokemon_v2_berryflavor pokemon_v2_berryflavor?                  @relation("pokemon_v2_nature_likes_flavor_idTopokemon_v2_berryflavor", fields: [likes_flavor_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_naturebattlestylepreference                                           pokemon_v2_naturebattlestylepreference[]
  pokemon_v2_naturename                                                            pokemon_v2_naturename[]
  pokemon_v2_naturepokeathlonstat                                                  pokemon_v2_naturepokeathlonstat[]

  @@index([decreased_stat_id], map: "idx_17175_pokemon_v2_nature_decreased_stat_id_d89610fc")
  @@index([hates_flavor_id], map: "idx_17175_pokemon_v2_nature_hates_flavor_id_d9c22d5d")
  @@index([increased_stat_id], map: "idx_17175_pokemon_v2_nature_increased_stat_id_949bb3bd")
  @@index([likes_flavor_id], map: "idx_17175_pokemon_v2_nature_likes_flavor_id_475f0a7d")
  @@index([name], map: "idx_17175_pokemon_v2_nature_name_a7f453b0")
}

model pokemon_v2_naturebattlestylepreference {
  id                         BigInt                      @id(map: "idx_16789_pokemon_v2_naturebattlestylepreference_pkey") @default(autoincrement())
  low_hp_preference          BigInt?
  high_hp_preference         BigInt?
  nature_id                  BigInt?
  move_battle_style_id       BigInt?
  pokemon_v2_movebattlestyle pokemon_v2_movebattlestyle? @relation(fields: [move_battle_style_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "pokemon_v2_naturebattlestylepreferenc_move_battle_style_id_fkey")
  pokemon_v2_nature          pokemon_v2_nature?          @relation(fields: [nature_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([move_battle_style_id], map: "idx_16789_pokemon_v2_naturebattlestylepreference_move_battle_st")
  @@index([nature_id], map: "idx_16789_pokemon_v2_naturebattlestylepreference_nature_id_03c3")
}

model pokemon_v2_naturename {
  id                  BigInt               @id(map: "idx_17182_pokemon_v2_naturename_pkey") @default(autoincrement())
  language_id         BigInt?
  nature_id           BigInt?
  name                String?
  pokemon_v2_language pokemon_v2_language? @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_nature   pokemon_v2_nature?   @relation(fields: [nature_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17182_pokemon_v2_naturename_language_id_7b3bb981")
  @@index([name], map: "idx_17182_pokemon_v2_naturename_name_d0bfe13a")
  @@index([nature_id], map: "idx_17182_pokemon_v2_naturename_nature_id_e6043d64")
}

model pokemon_v2_naturepokeathlonstat {
  id                        BigInt                     @id(map: "idx_16670_pokemon_v2_naturepokeathlonstat_pkey") @default(autoincrement())
  max_change                BigInt?
  nature_id                 BigInt?
  pokeathlon_stat_id        BigInt?
  pokemon_v2_nature         pokemon_v2_nature?         @relation(fields: [nature_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokeathlonstat pokemon_v2_pokeathlonstat? @relation(fields: [pokeathlon_stat_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([nature_id], map: "idx_16670_pokemon_v2_naturepokeathlonstat_nature_id_11b4efea")
  @@index([pokeathlon_stat_id], map: "idx_16670_pokemon_v2_naturepokeathlonstat_pokeathlon_stat_id_0d")
}

model pokemon_v2_palpark {
  id                        BigInt                     @id(map: "idx_16675_pokemon_v2_palpark_pkey") @default(autoincrement())
  rate                      BigInt?
  pal_park_area_id          BigInt?
  pokemon_species_id        BigInt?
  base_score                BigInt?
  pokemon_v2_palparkarea    pokemon_v2_palparkarea?    @relation(fields: [pal_park_area_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonspecies pokemon_v2_pokemonspecies? @relation(fields: [pokemon_species_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([pal_park_area_id], map: "idx_16675_pokemon_v2_palpark_pal_park_area_id_8df4fce8")
  @@index([pokemon_species_id], map: "idx_16675_pokemon_v2_palpark_pokemon_species_id_639ae7f1")
}

model pokemon_v2_palparkarea {
  id                         BigInt                       @id(map: "idx_17189_pokemon_v2_palparkarea_pkey") @default(autoincrement())
  name                       String?
  pokemon_v2_palpark         pokemon_v2_palpark[]
  pokemon_v2_palparkareaname pokemon_v2_palparkareaname[]

  @@index([name], map: "idx_17189_pokemon_v2_palparkarea_name_d27212e7")
}

model pokemon_v2_palparkareaname {
  id                     BigInt                  @id(map: "idx_17196_pokemon_v2_palparkareaname_pkey") @default(autoincrement())
  language_id            BigInt?
  pal_park_area_id       BigInt?
  name                   String?
  pokemon_v2_language    pokemon_v2_language?    @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_palparkarea pokemon_v2_palparkarea? @relation(fields: [pal_park_area_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17196_pokemon_v2_palparkareaname_language_id_1961595b")
  @@index([name], map: "idx_17196_pokemon_v2_palparkareaname_name_1fef3377")
  @@index([pal_park_area_id], map: "idx_17196_pokemon_v2_palparkareaname_pal_park_area_id_9732132d")
}

model pokemon_v2_pokeathlonstat {
  id                              BigInt                            @id(map: "idx_17203_pokemon_v2_pokeathlonstat_pkey") @default(autoincrement())
  name                            String?
  pokemon_v2_naturepokeathlonstat pokemon_v2_naturepokeathlonstat[]
  pokemon_v2_pokeathlonstatname   pokemon_v2_pokeathlonstatname[]

  @@index([name], map: "idx_17203_pokemon_v2_pokeathlonstat_name_dfd410d4")
}

model pokemon_v2_pokeathlonstatname {
  id                        BigInt                     @id(map: "idx_17210_pokemon_v2_pokeathlonstatname_pkey") @default(autoincrement())
  language_id               BigInt?
  pokeathlon_stat_id        BigInt?
  name                      String?
  pokemon_v2_language       pokemon_v2_language?       @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokeathlonstat pokemon_v2_pokeathlonstat? @relation(fields: [pokeathlon_stat_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17210_pokemon_v2_pokeathlonstatname_language_id_053b296b")
  @@index([name], map: "idx_17210_pokemon_v2_pokeathlonstatname_name_21dff6f1")
  @@index([pokeathlon_stat_id], map: "idx_17210_pokemon_v2_pokeathlonstatname_pokeathlon_stat_id_9516")
}

model pokemon_v2_pokedex {
  id                             BigInt                           @id(map: "idx_17217_pokemon_v2_pokedex_pkey") @default(autoincrement())
  is_main_series                 Boolean?
  region_id                      BigInt?
  name                           String?
  pokemon_v2_region              pokemon_v2_region?               @relation(fields: [region_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokedexdescription  pokemon_v2_pokedexdescription[]
  pokemon_v2_pokedexname         pokemon_v2_pokedexname[]
  pokemon_v2_pokedexversiongroup pokemon_v2_pokedexversiongroup[]
  pokemon_v2_pokemondexnumber    pokemon_v2_pokemondexnumber[]

  @@index([name], map: "idx_17217_pokemon_v2_pokedex_name_d3054d11")
  @@index([region_id], map: "idx_17217_pokemon_v2_pokedex_region_id_d894ac3e")
}

model pokemon_v2_pokedexdescription {
  id                  BigInt               @id(map: "idx_16525_pokemon_v2_pokedexdescription_pkey") @default(autoincrement())
  description         String?
  language_id         BigInt?
  pokedex_id          BigInt?
  pokemon_v2_language pokemon_v2_language? @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokedex  pokemon_v2_pokedex?  @relation(fields: [pokedex_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_16525_pokemon_v2_pokedexdescription_language_id_908fbcc8")
  @@index([pokedex_id], map: "idx_16525_pokemon_v2_pokedexdescription_pokedex_id_6519a3de")
}

model pokemon_v2_pokedexname {
  id                  BigInt               @id(map: "idx_17224_pokemon_v2_pokedexname_pkey") @default(autoincrement())
  language_id         BigInt?
  pokedex_id          BigInt?
  name                String?
  pokemon_v2_language pokemon_v2_language? @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokedex  pokemon_v2_pokedex?  @relation(fields: [pokedex_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17224_pokemon_v2_pokedexname_language_id_97285e07")
  @@index([name], map: "idx_17224_pokemon_v2_pokedexname_name_9e582b7c")
  @@index([pokedex_id], map: "idx_17224_pokemon_v2_pokedexname_pokedex_id_e31703e5")
}

model pokemon_v2_pokedexversiongroup {
  id                      BigInt                   @id(map: "idx_16532_pokemon_v2_pokedexversiongroup_pkey") @default(autoincrement())
  pokedex_id              BigInt?
  version_group_id        BigInt?
  pokemon_v2_pokedex      pokemon_v2_pokedex?      @relation(fields: [pokedex_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_versiongroup pokemon_v2_versiongroup? @relation(fields: [version_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([pokedex_id], map: "idx_16532_pokemon_v2_pokedexversiongroup_pokedex_id_e9aaac37")
  @@index([version_group_id], map: "idx_16532_pokemon_v2_pokedexversiongroup_version_group_id_2fbd3")
}

model pokemon_v2_pokemon {
  id                            BigInt                          @id(map: "idx_17357_pokemon_v2_pokemon_pkey") @default(autoincrement())
  name                          String?
  order                         BigInt?
  height                        BigInt?
  weight                        BigInt?
  is_default                    Boolean?
  pokemon_species_id            BigInt?
  base_experience               BigInt?
  pokemon_v2_encounter          pokemon_v2_encounter[]
  pokemon_v2_pokemonspecies     pokemon_v2_pokemonspecies?      @relation(fields: [pokemon_species_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonability     pokemon_v2_pokemonability[]
  pokemon_v2_pokemonabilitypast pokemon_v2_pokemonabilitypast[]
  pokemon_v2_pokemoncries       pokemon_v2_pokemoncries[]
  pokemon_v2_pokemonform        pokemon_v2_pokemonform[]
  pokemon_v2_pokemongameindex   pokemon_v2_pokemongameindex[]
  pokemon_v2_pokemonitem        pokemon_v2_pokemonitem[]
  pokemon_v2_pokemonmove        pokemon_v2_pokemonmove[]
  pokemon_v2_pokemonsprites     pokemon_v2_pokemonsprites[]
  pokemon_v2_pokemonstat        pokemon_v2_pokemonstat[]
  pokemon_v2_pokemontype        pokemon_v2_pokemontype[]
  pokemon_v2_pokemontypepast    pokemon_v2_pokemontypepast[]

  @@index([name], map: "idx_17357_pokemon_v2_pokemon_name_b4719884")
  @@index([pokemon_species_id], map: "idx_17357_pokemon_v2_pokemon_pokemon_species_id_e3dbafe1")
}

model pokemon_v2_pokemonability {
  id                 BigInt              @id(map: "idx_16537_pokemon_v2_pokemonability_pkey") @default(autoincrement())
  is_hidden          Boolean?
  slot               BigInt?
  ability_id         BigInt?
  pokemon_id         BigInt?
  pokemon_v2_ability pokemon_v2_ability? @relation(fields: [ability_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemon pokemon_v2_pokemon? @relation(fields: [pokemon_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([ability_id], map: "idx_16537_pokemon_v2_pokemonability_ability_id_e6de97cc")
  @@index([pokemon_id], map: "idx_16537_pokemon_v2_pokemonability_pokemon_id_2d9f606f")
}

model pokemon_v2_pokemonabilitypast {
  id                    BigInt                 @id(map: "idx_17393_pokemon_v2_pokemonabilitypast_pkey") @default(autoincrement())
  is_hidden             Boolean?
  slot                  BigInt?
  ability_id            BigInt?
  generation_id         BigInt?
  pokemon_id            BigInt?
  pokemon_v2_ability    pokemon_v2_ability?    @relation(fields: [ability_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_generation pokemon_v2_generation? @relation(fields: [generation_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemon    pokemon_v2_pokemon?    @relation(fields: [pokemon_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([ability_id], map: "idx_17393_pokemon_v2_pokemonabilitypast_ability_id_27ce43f2")
  @@index([generation_id], map: "idx_17393_pokemon_v2_pokemonabilitypast_generation_id_7c49a4a1")
  @@index([pokemon_id], map: "idx_17393_pokemon_v2_pokemonabilitypast_pokemon_id_1f8eef75")
}

model pokemon_v2_pokemoncolor {
  id                          BigInt                        @id(map: "idx_17231_pokemon_v2_pokemoncolor_pkey") @default(autoincrement())
  name                        String?
  pokemon_v2_pokemoncolorname pokemon_v2_pokemoncolorname[]
  pokemon_v2_pokemonspecies   pokemon_v2_pokemonspecies[]

  @@index([name], map: "idx_17231_pokemon_v2_pokemoncolor_name_be656ffc")
}

model pokemon_v2_pokemoncolorname {
  id                      BigInt                   @id(map: "idx_17238_pokemon_v2_pokemoncolorname_pkey") @default(autoincrement())
  language_id             BigInt?
  pokemon_color_id        BigInt?
  name                    String?
  pokemon_v2_language     pokemon_v2_language?     @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemoncolor pokemon_v2_pokemoncolor? @relation(fields: [pokemon_color_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17238_pokemon_v2_pokemoncolorname_language_id_640a8271")
  @@index([name], map: "idx_17238_pokemon_v2_pokemoncolorname_name_21cdd894")
  @@index([pokemon_color_id], map: "idx_17238_pokemon_v2_pokemoncolorname_pokemon_color_id_33a759e5")
}

model pokemon_v2_pokemoncries {
  id                 BigInt              @id(map: "idx_17419_pokemon_v2_pokemoncries_pkey") @default(autoincrement())
  cries              String?
  pokemon_id         BigInt?
  pokemon_v2_pokemon pokemon_v2_pokemon? @relation(fields: [pokemon_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([pokemon_id], map: "idx_17419_pokemon_v2_pokemoncries_pokemon_id_f4f1bdc4")
}

model pokemon_v2_pokemondexnumber {
  id                        BigInt                     @id(map: "idx_16581_pokemon_v2_pokemondexnumber_pkey") @default(autoincrement())
  pokedex_number            BigInt?
  pokedex_id                BigInt?
  pokemon_species_id        BigInt?
  pokemon_v2_pokedex        pokemon_v2_pokedex?        @relation(fields: [pokedex_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonspecies pokemon_v2_pokemonspecies? @relation(fields: [pokemon_species_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([pokedex_id], map: "idx_16581_pokemon_v2_pokemondexnumber_pokedex_id_5f882d27")
  @@index([pokemon_species_id], map: "idx_16581_pokemon_v2_pokemondexnumber_pokemon_species_id_0b92ec")
}

model pokemon_v2_pokemonegggroup {
  id                        BigInt                     @id(map: "idx_16576_pokemon_v2_pokemonegggroup_pkey") @default(autoincrement())
  egg_group_id              BigInt?
  pokemon_species_id        BigInt?
  pokemon_v2_egggroup       pokemon_v2_egggroup?       @relation(fields: [egg_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonspecies pokemon_v2_pokemonspecies? @relation(fields: [pokemon_species_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([egg_group_id], map: "idx_16576_pokemon_v2_pokemonegggroup_egg_group_id_cd305d10")
  @@index([pokemon_species_id], map: "idx_16576_pokemon_v2_pokemonegggroup_pokemon_species_id_d0fc6e4")
}

model pokemon_v2_pokemonevolution {
  id                                                                                                  BigInt                       @id(map: "idx_16782_pokemon_v2_pokemonevolution_pkey") @default(autoincrement())
  min_level                                                                                           BigInt?
  time_of_day                                                                                         String?
  min_happiness                                                                                       BigInt?
  min_affection                                                                                       BigInt?
  relative_physical_stats                                                                             BigInt?
  needs_overworld_rain                                                                                Boolean?
  turn_upside_down                                                                                    Boolean?
  evolution_trigger_id                                                                                BigInt?
  evolved_species_id                                                                                  BigInt?
  gender_id                                                                                           BigInt?
  known_move_id                                                                                       BigInt?
  known_move_type_id                                                                                  BigInt?
  party_species_id                                                                                    BigInt?
  party_type_id                                                                                       BigInt?
  trade_species_id                                                                                    BigInt?
  min_beauty                                                                                          BigInt?
  evolution_item_id                                                                                   BigInt?
  held_item_id                                                                                        BigInt?
  location_id                                                                                         BigInt?
  pokemon_v2_item_pokemon_v2_pokemonevolution_evolution_item_idTopokemon_v2_item                      pokemon_v2_item?             @relation("pokemon_v2_pokemonevolution_evolution_item_idTopokemon_v2_item", fields: [evolution_item_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_evolutiontrigger                                                                         pokemon_v2_evolutiontrigger? @relation(fields: [evolution_trigger_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonspecies_pokemon_v2_pokemonevolution_evolved_species_idTopokemon_v2_pokemonspecies pokemon_v2_pokemonspecies?   @relation("pokemon_v2_pokemonevolution_evolved_species_idTopokemon_v2_pokemonspecies", fields: [evolved_species_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_gender                                                                                   pokemon_v2_gender?           @relation(fields: [gender_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_item_pokemon_v2_pokemonevolution_held_item_idTopokemon_v2_item                           pokemon_v2_item?             @relation("pokemon_v2_pokemonevolution_held_item_idTopokemon_v2_item", fields: [held_item_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_move                                                                                     pokemon_v2_move?             @relation(fields: [known_move_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_type_pokemon_v2_pokemonevolution_known_move_type_idTopokemon_v2_type                     pokemon_v2_type?             @relation("pokemon_v2_pokemonevolution_known_move_type_idTopokemon_v2_type", fields: [known_move_type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_location                                                                                 pokemon_v2_location?         @relation(fields: [location_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonspecies_pokemon_v2_pokemonevolution_party_species_idTopokemon_v2_pokemonspecies   pokemon_v2_pokemonspecies?   @relation("pokemon_v2_pokemonevolution_party_species_idTopokemon_v2_pokemonspecies", fields: [party_species_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_type_pokemon_v2_pokemonevolution_party_type_idTopokemon_v2_type                          pokemon_v2_type?             @relation("pokemon_v2_pokemonevolution_party_type_idTopokemon_v2_type", fields: [party_type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonspecies_pokemon_v2_pokemonevolution_trade_species_idTopokemon_v2_pokemonspecies   pokemon_v2_pokemonspecies?   @relation("pokemon_v2_pokemonevolution_trade_species_idTopokemon_v2_pokemonspecies", fields: [trade_species_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([evolution_item_id], map: "idx_16782_pokemon_v2_pokemonevolution_evolution_item_id_afdb70a")
  @@index([evolution_trigger_id], map: "idx_16782_pokemon_v2_pokemonevolution_evolution_trigger_id_7d6a")
  @@index([evolved_species_id], map: "idx_16782_pokemon_v2_pokemonevolution_evolved_species_id_bcbf43")
  @@index([gender_id], map: "idx_16782_pokemon_v2_pokemonevolution_gender_id_ccbf258a")
  @@index([held_item_id], map: "idx_16782_pokemon_v2_pokemonevolution_held_item_id_ef69a719")
  @@index([known_move_id], map: "idx_16782_pokemon_v2_pokemonevolution_known_move_id_301dfc54")
  @@index([known_move_type_id], map: "idx_16782_pokemon_v2_pokemonevolution_known_move_type_id_de1a6b")
  @@index([location_id], map: "idx_16782_pokemon_v2_pokemonevolution_location_id_fb0e2aa2")
  @@index([party_species_id], map: "idx_16782_pokemon_v2_pokemonevolution_party_species_id_aa57f0d1")
  @@index([party_type_id], map: "idx_16782_pokemon_v2_pokemonevolution_party_type_id_6af7cb68")
  @@index([trade_species_id], map: "idx_16782_pokemon_v2_pokemonevolution_trade_species_id_6eefecdc")
}

model pokemon_v2_pokemonform {
  id                               BigInt                             @id(map: "idx_17245_pokemon_v2_pokemonform_pkey") @default(autoincrement())
  order                            BigInt?
  is_default                       Boolean?
  is_battle_only                   Boolean?
  version_group_id                 BigInt?
  pokemon_id                       BigInt?
  is_mega                          Boolean?
  form_order                       BigInt?
  form_name                        String?
  name                             String?
  pokemon_v2_pokemon               pokemon_v2_pokemon?                @relation(fields: [pokemon_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_versiongroup          pokemon_v2_versiongroup?           @relation(fields: [version_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonformgeneration pokemon_v2_pokemonformgeneration[]
  pokemon_v2_pokemonformname       pokemon_v2_pokemonformname[]
  pokemon_v2_pokemonformsprites    pokemon_v2_pokemonformsprites[]
  pokemon_v2_pokemonformtype       pokemon_v2_pokemonformtype[]

  @@index([name], map: "idx_17245_pokemon_v2_pokemonform_name_fe094947")
  @@index([pokemon_id], map: "idx_17245_pokemon_v2_pokemonform_pokemon_id_f1307072")
  @@index([version_group_id], map: "idx_17245_pokemon_v2_pokemonform_version_group_id_88573ce7")
}

model pokemon_v2_pokemonformgeneration {
  id                     BigInt                  @id(map: "idx_16542_pokemon_v2_pokemonformgeneration_pkey") @default(autoincrement())
  game_index             BigInt?
  generation_id          BigInt?
  pokemon_form_id        BigInt?
  pokemon_v2_generation  pokemon_v2_generation?  @relation(fields: [generation_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonform pokemon_v2_pokemonform? @relation(fields: [pokemon_form_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([generation_id], map: "idx_16542_pokemon_v2_pokemonformgeneration_generation_id_2f4d54")
  @@index([pokemon_form_id], map: "idx_16542_pokemon_v2_pokemonformgeneration_pokemon_form_id_6361")
}

model pokemon_v2_pokemonformname {
  id                     BigInt                  @id(map: "idx_17371_pokemon_v2_pokemonformname_pkey") @default(autoincrement())
  name                   String?
  language_id            BigInt?
  pokemon_form_id        BigInt?
  pokemon_name           String?
  pokemon_v2_language    pokemon_v2_language?    @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonform pokemon_v2_pokemonform? @relation(fields: [pokemon_form_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17371_pokemon_v2_pokemonformname_language_id_2570013b")
  @@index([name], map: "idx_17371_pokemon_v2_pokemonformname_name_4496fca6")
  @@index([pokemon_form_id], map: "idx_17371_pokemon_v2_pokemonformname_pokemon_form_id_7c4f1fb5")
}

model pokemon_v2_pokemonformsprites {
  id                     BigInt                  @id(map: "idx_17412_pokemon_v2_pokemonformsprites_pkey") @default(autoincrement())
  pokemon_form_id        BigInt?
  sprites                String?
  pokemon_v2_pokemonform pokemon_v2_pokemonform? @relation(fields: [pokemon_form_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([pokemon_form_id], map: "idx_17412_pokemon_v2_pokemonformsprites_pokemon_form_id_b09cb8b")
}

model pokemon_v2_pokemonformtype {
  id                     BigInt                  @id(map: "idx_17383_pokemon_v2_pokemonformtype_pkey") @default(autoincrement())
  slot                   BigInt?
  pokemon_form_id        BigInt?
  type_id                BigInt?
  pokemon_v2_pokemonform pokemon_v2_pokemonform? @relation(fields: [pokemon_form_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_type        pokemon_v2_type?        @relation(fields: [type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([pokemon_form_id], map: "idx_17383_pokemon_v2_pokemonformtype_pokemon_form_id_bff24ddc")
  @@index([type_id], map: "idx_17383_pokemon_v2_pokemonformtype_type_id_10672412")
}

model pokemon_v2_pokemongameindex {
  id                 BigInt              @id(map: "idx_16547_pokemon_v2_pokemongameindex_pkey") @default(autoincrement())
  game_index         BigInt?
  pokemon_id         BigInt?
  version_id         BigInt?
  pokemon_v2_pokemon pokemon_v2_pokemon? @relation(fields: [pokemon_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_version pokemon_v2_version? @relation(fields: [version_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([pokemon_id], map: "idx_16547_pokemon_v2_pokemongameindex_pokemon_id_d1278b45")
  @@index([version_id], map: "idx_16547_pokemon_v2_pokemongameindex_version_id_2f3cda39")
}

model pokemon_v2_pokemonhabitat {
  id                            BigInt                          @id(map: "idx_17252_pokemon_v2_pokemonhabitat_pkey") @default(autoincrement())
  name                          String?
  pokemon_v2_pokemonhabitatname pokemon_v2_pokemonhabitatname[]
  pokemon_v2_pokemonspecies     pokemon_v2_pokemonspecies[]

  @@index([name], map: "idx_17252_pokemon_v2_pokemonhabitat_name_e36918ba")
}

model pokemon_v2_pokemonhabitatname {
  id                        BigInt                     @id(map: "idx_17259_pokemon_v2_pokemonhabitatname_pkey") @default(autoincrement())
  language_id               BigInt?
  pokemon_habitat_id        BigInt?
  name                      String?
  pokemon_v2_language       pokemon_v2_language?       @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonhabitat pokemon_v2_pokemonhabitat? @relation(fields: [pokemon_habitat_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17259_pokemon_v2_pokemonhabitatname_language_id_b247fa35")
  @@index([name], map: "idx_17259_pokemon_v2_pokemonhabitatname_name_0b8b38c3")
  @@index([pokemon_habitat_id], map: "idx_17259_pokemon_v2_pokemonhabitatname_pokemon_habitat_id_8bb6")
}

model pokemon_v2_pokemonitem {
  id                 BigInt              @id(map: "idx_16615_pokemon_v2_pokemonitem_pkey") @default(autoincrement())
  rarity             BigInt?
  pokemon_id         BigInt?
  version_id         BigInt?
  item_id            BigInt?
  pokemon_v2_item    pokemon_v2_item?    @relation(fields: [item_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemon pokemon_v2_pokemon? @relation(fields: [pokemon_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_version pokemon_v2_version? @relation(fields: [version_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([item_id], map: "idx_16615_pokemon_v2_pokemonitem_item_id_f2d37afe")
  @@index([pokemon_id], map: "idx_16615_pokemon_v2_pokemonitem_pokemon_id_d5dd8083")
  @@index([version_id], map: "idx_16615_pokemon_v2_pokemonitem_version_id_4f5c2a1c")
}

model pokemon_v2_pokemonmove {
  id                         BigInt                      @id(map: "idx_16685_pokemon_v2_pokemonmove_pkey") @default(autoincrement())
  order                      BigInt?
  level                      BigInt?
  move_id                    BigInt?
  pokemon_id                 BigInt?
  version_group_id           BigInt?
  move_learn_method_id       BigInt?
  pokemon_v2_move            pokemon_v2_move?            @relation(fields: [move_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_movelearnmethod pokemon_v2_movelearnmethod? @relation(fields: [move_learn_method_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemon         pokemon_v2_pokemon?         @relation(fields: [pokemon_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_versiongroup    pokemon_v2_versiongroup?    @relation(fields: [version_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([move_id], map: "idx_16685_pokemon_v2_pokemonmove_move_id_b5f71cf7")
  @@index([move_learn_method_id], map: "idx_16685_pokemon_v2_pokemonmove_move_learn_method_id_f7503746")
  @@index([pokemon_id], map: "idx_16685_pokemon_v2_pokemonmove_pokemon_id_ca9e0e55")
  @@index([version_group_id], map: "idx_16685_pokemon_v2_pokemonmove_version_group_id_ca4c374c")
}

model pokemon_v2_pokemonshape {
  id                          BigInt                        @id(map: "idx_17266_pokemon_v2_pokemonshape_pkey") @default(autoincrement())
  name                        String?
  pokemon_v2_pokemonshapename pokemon_v2_pokemonshapename[]
  pokemon_v2_pokemonspecies   pokemon_v2_pokemonspecies[]

  @@index([name], map: "idx_17266_pokemon_v2_pokemonshape_name_d7251478")
}

model pokemon_v2_pokemonshapename {
  id                      BigInt                   @id(map: "idx_17273_pokemon_v2_pokemonshapename_pkey") @default(autoincrement())
  awesome_name            String?
  language_id             BigInt?
  pokemon_shape_id        BigInt?
  name                    String?
  pokemon_v2_language     pokemon_v2_language?     @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonshape pokemon_v2_pokemonshape? @relation(fields: [pokemon_shape_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17273_pokemon_v2_pokemonshapename_language_id_e094373f")
  @@index([name], map: "idx_17273_pokemon_v2_pokemonshapename_name_224dc527")
  @@index([pokemon_shape_id], map: "idx_17273_pokemon_v2_pokemonshapename_pokemon_shape_id_69bb934f")
}

model pokemon_v2_pokemonspecies {
  id                                                                                                    BigInt                                 @id(map: "idx_17364_pokemon_v2_pokemonspecies_pkey") @default(autoincrement())
  name                                                                                                  String?
  order                                                                                                 BigInt?
  gender_rate                                                                                           BigInt?
  capture_rate                                                                                          BigInt?
  base_happiness                                                                                        BigInt?
  is_baby                                                                                               Boolean?
  hatch_counter                                                                                         BigInt?
  has_gender_differences                                                                                Boolean?
  forms_switchable                                                                                      Boolean?
  evolution_chain_id                                                                                    BigInt?
  generation_id                                                                                         BigInt?
  growth_rate_id                                                                                        BigInt?
  pokemon_color_id                                                                                      BigInt?
  pokemon_habitat_id                                                                                    BigInt?
  pokemon_shape_id                                                                                      BigInt?
  is_legendary                                                                                          Boolean?
  is_mythical                                                                                           Boolean?
  evolves_from_species_id                                                                               BigInt?
  pokemon_v2_palpark                                                                                    pokemon_v2_palpark[]
  pokemon_v2_pokemon                                                                                    pokemon_v2_pokemon[]
  pokemon_v2_pokemondexnumber                                                                           pokemon_v2_pokemondexnumber[]
  pokemon_v2_pokemonegggroup                                                                            pokemon_v2_pokemonegggroup[]
  pokemon_v2_pokemonevolution_pokemon_v2_pokemonevolution_evolved_species_idTopokemon_v2_pokemonspecies pokemon_v2_pokemonevolution[]          @relation("pokemon_v2_pokemonevolution_evolved_species_idTopokemon_v2_pokemonspecies")
  pokemon_v2_pokemonevolution_pokemon_v2_pokemonevolution_party_species_idTopokemon_v2_pokemonspecies   pokemon_v2_pokemonevolution[]          @relation("pokemon_v2_pokemonevolution_party_species_idTopokemon_v2_pokemonspecies")
  pokemon_v2_pokemonevolution_pokemon_v2_pokemonevolution_trade_species_idTopokemon_v2_pokemonspecies   pokemon_v2_pokemonevolution[]          @relation("pokemon_v2_pokemonevolution_trade_species_idTopokemon_v2_pokemonspecies")
  pokemon_v2_evolutionchain                                                                             pokemon_v2_evolutionchain?             @relation(fields: [evolution_chain_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonspecies                                                                             pokemon_v2_pokemonspecies?             @relation("pokemon_v2_pokemonspeciesTopokemon_v2_pokemonspecies", fields: [evolves_from_species_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  other_pokemon_v2_pokemonspecies                                                                       pokemon_v2_pokemonspecies[]            @relation("pokemon_v2_pokemonspeciesTopokemon_v2_pokemonspecies")
  pokemon_v2_generation                                                                                 pokemon_v2_generation?                 @relation(fields: [generation_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_growthrate                                                                                 pokemon_v2_growthrate?                 @relation(fields: [growth_rate_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemoncolor                                                                               pokemon_v2_pokemoncolor?               @relation(fields: [pokemon_color_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonhabitat                                                                             pokemon_v2_pokemonhabitat?             @relation(fields: [pokemon_habitat_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonshape                                                                               pokemon_v2_pokemonshape?               @relation(fields: [pokemon_shape_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonspeciesdescription                                                                  pokemon_v2_pokemonspeciesdescription[]
  pokemon_v2_pokemonspeciesflavortext                                                                   pokemon_v2_pokemonspeciesflavortext[]
  pokemon_v2_pokemonspeciesname                                                                         pokemon_v2_pokemonspeciesname[]

  @@index([evolution_chain_id], map: "idx_17364_pokemon_v2_pokemonspecies_evolution_chain_id_d94981c6")
  @@index([evolves_from_species_id], map: "idx_17364_pokemon_v2_pokemonspecies_evolves_from_species_id_6e4")
  @@index([generation_id], map: "idx_17364_pokemon_v2_pokemonspecies_generation_id_57b5b3ef")
  @@index([growth_rate_id], map: "idx_17364_pokemon_v2_pokemonspecies_growth_rate_id_78ff36e3")
  @@index([name], map: "idx_17364_pokemon_v2_pokemonspecies_name_f1ec390b")
  @@index([pokemon_color_id], map: "idx_17364_pokemon_v2_pokemonspecies_pokemon_color_id_27cb23c7")
  @@index([pokemon_habitat_id], map: "idx_17364_pokemon_v2_pokemonspecies_pokemon_habitat_id_61d7914c")
  @@index([pokemon_shape_id], map: "idx_17364_pokemon_v2_pokemonspecies_pokemon_shape_id_9420bbbf")
}

model pokemon_v2_pokemonspeciesdescription {
  id                        BigInt                     @id(map: "idx_16552_pokemon_v2_pokemonspeciesdescription_pkey") @default(autoincrement())
  description               String?
  language_id               BigInt?
  pokemon_species_id        BigInt?
  pokemon_v2_language       pokemon_v2_language?       @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonspecies pokemon_v2_pokemonspecies? @relation(fields: [pokemon_species_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_16552_pokemon_v2_pokemonspeciesdescription_language_id_75b5")
  @@index([pokemon_species_id], map: "idx_16552_pokemon_v2_pokemonspeciesdescription_pokemon_species_")
}

model pokemon_v2_pokemonspeciesflavortext {
  id                        BigInt                     @id(map: "idx_16559_pokemon_v2_pokemonspeciesflavortext_pkey") @default(autoincrement())
  flavor_text               String?
  language_id               BigInt?
  pokemon_species_id        BigInt?
  version_id                BigInt?
  pokemon_v2_language       pokemon_v2_language?       @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonspecies pokemon_v2_pokemonspecies? @relation(fields: [pokemon_species_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_version        pokemon_v2_version?        @relation(fields: [version_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_16559_pokemon_v2_pokemonspeciesflavortext_language_id_725fc")
  @@index([pokemon_species_id], map: "idx_16559_pokemon_v2_pokemonspeciesflavortext_pokemon_species_i")
  @@index([version_id], map: "idx_16559_pokemon_v2_pokemonspeciesflavortext_version_id_67eb47")
}

model pokemon_v2_pokemonspeciesname {
  id                        BigInt                     @id(map: "idx_17280_pokemon_v2_pokemonspeciesname_pkey") @default(autoincrement())
  genus                     String?
  language_id               BigInt?
  pokemon_species_id        BigInt?
  name                      String?
  pokemon_v2_language       pokemon_v2_language?       @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemonspecies pokemon_v2_pokemonspecies? @relation(fields: [pokemon_species_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17280_pokemon_v2_pokemonspeciesname_language_id_1a5acda5")
  @@index([name], map: "idx_17280_pokemon_v2_pokemonspeciesname_name_e53fa719")
  @@index([pokemon_species_id], map: "idx_17280_pokemon_v2_pokemonspeciesname_pokemon_species_id_6566")
}

model pokemon_v2_pokemonsprites {
  id                 BigInt              @id(map: "idx_17405_pokemon_v2_pokemonsprites_pkey") @default(autoincrement())
  pokemon_id         BigInt?
  sprites            String?
  pokemon_v2_pokemon pokemon_v2_pokemon? @relation(fields: [pokemon_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([pokemon_id], map: "idx_17405_pokemon_v2_pokemonsprites_pokemon_id_37e1b6e5")
}

model pokemon_v2_pokemonstat {
  id                 BigInt              @id(map: "idx_16566_pokemon_v2_pokemonstat_pkey") @default(autoincrement())
  base_stat          BigInt?
  effort             BigInt?
  pokemon_id         BigInt?
  stat_id            BigInt?
  pokemon_v2_pokemon pokemon_v2_pokemon? @relation(fields: [pokemon_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_stat    pokemon_v2_stat?    @relation(fields: [stat_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([pokemon_id], map: "idx_16566_pokemon_v2_pokemonstat_pokemon_id_224bda7f")
  @@index([stat_id], map: "idx_16566_pokemon_v2_pokemonstat_stat_id_ff99830f")
}

model pokemon_v2_pokemontype {
  id                 BigInt              @id(map: "idx_16571_pokemon_v2_pokemontype_pkey") @default(autoincrement())
  slot               BigInt?
  pokemon_id         BigInt?
  type_id            BigInt?
  pokemon_v2_pokemon pokemon_v2_pokemon? @relation(fields: [pokemon_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_type    pokemon_v2_type?    @relation(fields: [type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([pokemon_id], map: "idx_16571_pokemon_v2_pokemontype_pokemon_id_8cd53409")
  @@index([type_id], map: "idx_16571_pokemon_v2_pokemontype_type_id_50c80158")
}

model pokemon_v2_pokemontypepast {
  id                    BigInt                 @id(map: "idx_17378_pokemon_v2_pokemontypepast_pkey") @default(autoincrement())
  slot                  BigInt?
  generation_id         BigInt?
  pokemon_id            BigInt?
  type_id               BigInt?
  pokemon_v2_generation pokemon_v2_generation? @relation(fields: [generation_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_pokemon    pokemon_v2_pokemon?    @relation(fields: [pokemon_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_type       pokemon_v2_type?       @relation(fields: [type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([generation_id], map: "idx_17378_pokemon_v2_pokemontypepast_generation_id_9dbf45f3")
  @@index([pokemon_id], map: "idx_17378_pokemon_v2_pokemontypepast_pokemon_id_7c9bb3e4")
  @@index([type_id], map: "idx_17378_pokemon_v2_pokemontypepast_type_id_c7a01783")
}

model pokemon_v2_region {
  id                            BigInt                          @id(map: "idx_17287_pokemon_v2_region_pkey") @default(autoincrement())
  name                          String?
  pokemon_v2_generation         pokemon_v2_generation?
  pokemon_v2_location           pokemon_v2_location[]
  pokemon_v2_pokedex            pokemon_v2_pokedex[]
  pokemon_v2_regionname         pokemon_v2_regionname[]
  pokemon_v2_versiongroupregion pokemon_v2_versiongroupregion[]

  @@index([name], map: "idx_17287_pokemon_v2_region_name_8acf2189")
}

model pokemon_v2_regionname {
  id                  BigInt               @id(map: "idx_17294_pokemon_v2_regionname_pkey") @default(autoincrement())
  language_id         BigInt?
  region_id           BigInt?
  name                String?
  pokemon_v2_language pokemon_v2_language? @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_region   pokemon_v2_region?   @relation(fields: [region_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17294_pokemon_v2_regionname_language_id_b977a545")
  @@index([name], map: "idx_17294_pokemon_v2_regionname_name_d9c7dec9")
  @@index([region_id], map: "idx_17294_pokemon_v2_regionname_region_id_70a321d1")
}

model pokemon_v2_stat {
  id                                                                     BigInt                          @id(map: "idx_17301_pokemon_v2_stat_pkey") @default(autoincrement())
  is_battle_only                                                         Boolean?
  game_index                                                             BigInt?
  move_damage_class_id                                                   BigInt?
  name                                                                   String?
  pokemon_v2_characteristic                                              pokemon_v2_characteristic[]
  pokemon_v2_movemetastatchange                                          pokemon_v2_movemetastatchange[]
  pokemon_v2_nature_pokemon_v2_nature_decreased_stat_idTopokemon_v2_stat pokemon_v2_nature[]             @relation("pokemon_v2_nature_decreased_stat_idTopokemon_v2_stat")
  pokemon_v2_nature_pokemon_v2_nature_increased_stat_idTopokemon_v2_stat pokemon_v2_nature[]             @relation("pokemon_v2_nature_increased_stat_idTopokemon_v2_stat")
  pokemon_v2_pokemonstat                                                 pokemon_v2_pokemonstat[]
  pokemon_v2_movedamageclass                                             pokemon_v2_movedamageclass?     @relation(fields: [move_damage_class_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_statname                                                    pokemon_v2_statname[]

  @@index([move_damage_class_id], map: "idx_17301_pokemon_v2_stat_move_damage_class_id_0ed19a23")
  @@index([name], map: "idx_17301_pokemon_v2_stat_name_abcae9af")
}

model pokemon_v2_statname {
  id                  BigInt               @id(map: "idx_17308_pokemon_v2_statname_pkey") @default(autoincrement())
  language_id         BigInt?
  stat_id             BigInt?
  name                String?
  pokemon_v2_language pokemon_v2_language? @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_stat     pokemon_v2_stat?     @relation(fields: [stat_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17308_pokemon_v2_statname_language_id_813421dc")
  @@index([name], map: "idx_17308_pokemon_v2_statname_name_e6d5a1d2")
  @@index([stat_id], map: "idx_17308_pokemon_v2_statname_stat_id_fadbe40b")
}

model pokemon_v2_supercontestcombo {
  id                                                                           BigInt           @id(map: "idx_16660_pokemon_v2_supercontestcombo_pkey") @default(autoincrement())
  first_move_id                                                                BigInt?
  second_move_id                                                               BigInt?
  pokemon_v2_move_pokemon_v2_supercontestcombo_first_move_idTopokemon_v2_move  pokemon_v2_move? @relation("pokemon_v2_supercontestcombo_first_move_idTopokemon_v2_move", fields: [first_move_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_move_pokemon_v2_supercontestcombo_second_move_idTopokemon_v2_move pokemon_v2_move? @relation("pokemon_v2_supercontestcombo_second_move_idTopokemon_v2_move", fields: [second_move_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([first_move_id], map: "idx_16660_pokemon_v2_supercontestcombo_first_move_id_b595ebbb")
  @@index([second_move_id], map: "idx_16660_pokemon_v2_supercontestcombo_second_move_id_15fdde61")
}

model pokemon_v2_supercontesteffect {
  id                                      BigInt                                    @id(map: "idx_16665_pokemon_v2_supercontesteffect_pkey") @default(autoincrement())
  appeal                                  BigInt?
  pokemon_v2_move                         pokemon_v2_move[]
  pokemon_v2_supercontesteffectflavortext pokemon_v2_supercontesteffectflavortext[]
}

model pokemon_v2_supercontesteffectflavortext {
  id                            BigInt                         @id(map: "idx_16768_pokemon_v2_supercontesteffectflavortext_pkey") @default(autoincrement())
  flavor_text                   String?
  language_id                   BigInt?
  super_contest_effect_id       BigInt?
  pokemon_v2_supercontesteffect pokemon_v2_supercontesteffect? @relation(fields: [super_contest_effect_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "pokemon_v2_supercontesteffectflavo_super_contest_effect_id_fkey")
  pokemon_v2_language           pokemon_v2_language?           @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_16768_pokemon_v2_supercontesteffectflavortext_language_id_a")
  @@index([super_contest_effect_id], map: "idx_16768_pokemon_v2_supercontesteffectflavortext_super_contest")
}

model pokemon_v2_type {
  id                                                                                          BigInt                        @id(map: "idx_17315_pokemon_v2_type_pkey") @default(autoincrement())
  generation_id                                                                               BigInt?
  move_damage_class_id                                                                        BigInt?
  name                                                                                        String?
  pokemon_v2_berry                                                                            pokemon_v2_berry[]
  pokemon_v2_move                                                                             pokemon_v2_move[]
  pokemon_v2_movechange                                                                       pokemon_v2_movechange[]
  pokemon_v2_pokemonevolution_pokemon_v2_pokemonevolution_known_move_type_idTopokemon_v2_type pokemon_v2_pokemonevolution[] @relation("pokemon_v2_pokemonevolution_known_move_type_idTopokemon_v2_type")
  pokemon_v2_pokemonevolution_pokemon_v2_pokemonevolution_party_type_idTopokemon_v2_type      pokemon_v2_pokemonevolution[] @relation("pokemon_v2_pokemonevolution_party_type_idTopokemon_v2_type")
  pokemon_v2_pokemonformtype                                                                  pokemon_v2_pokemonformtype[]
  pokemon_v2_pokemontype                                                                      pokemon_v2_pokemontype[]
  pokemon_v2_pokemontypepast                                                                  pokemon_v2_pokemontypepast[]
  pokemon_v2_generation                                                                       pokemon_v2_generation?        @relation(fields: [generation_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_movedamageclass                                                                  pokemon_v2_movedamageclass?   @relation(fields: [move_damage_class_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_typeefficacy_pokemon_v2_typeefficacy_damage_type_idTopokemon_v2_type             pokemon_v2_typeefficacy[]     @relation("pokemon_v2_typeefficacy_damage_type_idTopokemon_v2_type")
  pokemon_v2_typeefficacy_pokemon_v2_typeefficacy_target_type_idTopokemon_v2_type             pokemon_v2_typeefficacy[]     @relation("pokemon_v2_typeefficacy_target_type_idTopokemon_v2_type")
  pokemon_v2_typeefficacypast_pokemon_v2_typeefficacypast_damage_type_idTopokemon_v2_type     pokemon_v2_typeefficacypast[] @relation("pokemon_v2_typeefficacypast_damage_type_idTopokemon_v2_type")
  pokemon_v2_typeefficacypast_pokemon_v2_typeefficacypast_target_type_idTopokemon_v2_type     pokemon_v2_typeefficacypast[] @relation("pokemon_v2_typeefficacypast_target_type_idTopokemon_v2_type")
  pokemon_v2_typegameindex                                                                    pokemon_v2_typegameindex[]
  pokemon_v2_typename                                                                         pokemon_v2_typename[]
  pokemon_v2_typesprites                                                                      pokemon_v2_typesprites[]

  @@index([generation_id], map: "idx_17315_pokemon_v2_type_generation_id_f3988f1c")
  @@index([move_damage_class_id], map: "idx_17315_pokemon_v2_type_move_damage_class_id_5f546a8f")
  @@index([name], map: "idx_17315_pokemon_v2_type_name_90172f48")
}

model pokemon_v2_typeefficacy {
  id                                                                      BigInt           @id(map: "idx_16680_pokemon_v2_typeefficacy_pkey") @default(autoincrement())
  damage_factor                                                           BigInt?
  damage_type_id                                                          BigInt?
  target_type_id                                                          BigInt?
  pokemon_v2_type_pokemon_v2_typeefficacy_damage_type_idTopokemon_v2_type pokemon_v2_type? @relation("pokemon_v2_typeefficacy_damage_type_idTopokemon_v2_type", fields: [damage_type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_type_pokemon_v2_typeefficacy_target_type_idTopokemon_v2_type pokemon_v2_type? @relation("pokemon_v2_typeefficacy_target_type_idTopokemon_v2_type", fields: [target_type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([damage_type_id], map: "idx_16680_pokemon_v2_typeefficacy_damage_type_id_1b7c2d73")
  @@index([target_type_id], map: "idx_16680_pokemon_v2_typeefficacy_target_type_id_bf2be275")
}

model pokemon_v2_typeefficacypast {
  id                                                                          BigInt                 @id(map: "idx_17388_pokemon_v2_typeefficacypast_pkey") @default(autoincrement())
  damage_factor                                                               BigInt?
  damage_type_id                                                              BigInt?
  generation_id                                                               BigInt?
  target_type_id                                                              BigInt?
  pokemon_v2_type_pokemon_v2_typeefficacypast_damage_type_idTopokemon_v2_type pokemon_v2_type?       @relation("pokemon_v2_typeefficacypast_damage_type_idTopokemon_v2_type", fields: [damage_type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_generation                                                       pokemon_v2_generation? @relation(fields: [generation_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_type_pokemon_v2_typeefficacypast_target_type_idTopokemon_v2_type pokemon_v2_type?       @relation("pokemon_v2_typeefficacypast_target_type_idTopokemon_v2_type", fields: [target_type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([damage_type_id], map: "idx_17388_pokemon_v2_typeefficacypast_damage_type_id_b8eae4c9")
  @@index([generation_id], map: "idx_17388_pokemon_v2_typeefficacypast_generation_id_43b555ea")
  @@index([target_type_id], map: "idx_17388_pokemon_v2_typeefficacypast_target_type_id_2e9e1cb6")
}

model pokemon_v2_typegameindex {
  id                    BigInt                 @id(map: "idx_16443_pokemon_v2_typegameindex_pkey") @default(autoincrement())
  game_index            BigInt?
  generation_id         BigInt?
  type_id               BigInt?
  pokemon_v2_generation pokemon_v2_generation? @relation(fields: [generation_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_type       pokemon_v2_type?       @relation(fields: [type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([generation_id], map: "idx_16443_pokemon_v2_typegameindex_generation_id_520a4043")
  @@index([type_id], map: "idx_16443_pokemon_v2_typegameindex_type_id_8264662d")
}

model pokemon_v2_typename {
  id                  BigInt               @id(map: "idx_17322_pokemon_v2_typename_pkey") @default(autoincrement())
  language_id         BigInt?
  type_id             BigInt?
  name                String?
  pokemon_v2_language pokemon_v2_language? @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_type     pokemon_v2_type?     @relation(fields: [type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17322_pokemon_v2_typename_language_id_6b15eb1d")
  @@index([name], map: "idx_17322_pokemon_v2_typename_name_95fbeace")
  @@index([type_id], map: "idx_17322_pokemon_v2_typename_type_id_3fe2e4d2")
}

model pokemon_v2_typesprites {
  id              BigInt           @id(map: "idx_17426_pokemon_v2_typesprites_pkey") @default(autoincrement())
  sprites         String?
  type_id         BigInt?
  pokemon_v2_type pokemon_v2_type? @relation(fields: [type_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([type_id], map: "idx_17426_pokemon_v2_typesprites_type_id_0cfdcdc8")
}

model pokemon_v2_version {
  id                                   BigInt                                 @id(map: "idx_17329_pokemon_v2_version_pkey") @default(autoincrement())
  version_group_id                     BigInt?
  name                                 String?
  pokemon_v2_encounter                 pokemon_v2_encounter[]
  pokemon_v2_locationareaencounterrate pokemon_v2_locationareaencounterrate[]
  pokemon_v2_pokemongameindex          pokemon_v2_pokemongameindex[]
  pokemon_v2_pokemonitem               pokemon_v2_pokemonitem[]
  pokemon_v2_pokemonspeciesflavortext  pokemon_v2_pokemonspeciesflavortext[]
  pokemon_v2_versiongroup              pokemon_v2_versiongroup?               @relation(fields: [version_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_versionname               pokemon_v2_versionname[]

  @@index([name], map: "idx_17329_pokemon_v2_version_name_a1b54eaa")
  @@index([version_group_id], map: "idx_17329_pokemon_v2_version_version_group_id_1ab67107")
}

model pokemon_v2_versiongroup {
  id                                     BigInt                                   @id(map: "idx_17336_pokemon_v2_versiongroup_pkey") @default(autoincrement())
  order                                  BigInt?
  generation_id                          BigInt?
  name                                   String?
  pokemon_v2_abilitychange               pokemon_v2_abilitychange[]
  pokemon_v2_abilityflavortext           pokemon_v2_abilityflavortext[]
  pokemon_v2_encounterslot               pokemon_v2_encounterslot[]
  pokemon_v2_itemflavortext              pokemon_v2_itemflavortext[]
  pokemon_v2_machine                     pokemon_v2_machine[]
  pokemon_v2_movechange                  pokemon_v2_movechange[]
  pokemon_v2_moveeffectchange            pokemon_v2_moveeffectchange[]
  pokemon_v2_moveflavortext              pokemon_v2_moveflavortext[]
  pokemon_v2_pokedexversiongroup         pokemon_v2_pokedexversiongroup[]
  pokemon_v2_pokemonform                 pokemon_v2_pokemonform[]
  pokemon_v2_pokemonmove                 pokemon_v2_pokemonmove[]
  pokemon_v2_version                     pokemon_v2_version[]
  pokemon_v2_generation                  pokemon_v2_generation?                   @relation(fields: [generation_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_versiongroupmovelearnmethod pokemon_v2_versiongroupmovelearnmethod[]
  pokemon_v2_versiongroupregion          pokemon_v2_versiongroupregion[]

  @@index([generation_id], map: "idx_17336_pokemon_v2_versiongroup_generation_id_f7073699")
  @@index([name], map: "idx_17336_pokemon_v2_versiongroup_name_4c396513")
}

model pokemon_v2_versiongroupmovelearnmethod {
  id                         BigInt                      @id(map: "idx_16690_pokemon_v2_versiongroupmovelearnmethod_pkey") @default(autoincrement())
  move_learn_method_id       BigInt?
  version_group_id           BigInt?
  pokemon_v2_movelearnmethod pokemon_v2_movelearnmethod? @relation(fields: [move_learn_method_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "pokemon_v2_versiongroupmovelearnmetho_move_learn_method_id_fkey")
  pokemon_v2_versiongroup    pokemon_v2_versiongroup?    @relation(fields: [version_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([move_learn_method_id], map: "idx_16690_pokemon_v2_versiongroupmovelearnmethod_move_learn_met")
  @@index([version_group_id], map: "idx_16690_pokemon_v2_versiongroupmovelearnmethod_version_group_")
}

model pokemon_v2_versiongroupregion {
  id                      BigInt                   @id(map: "idx_16630_pokemon_v2_versiongroupregion_pkey") @default(autoincrement())
  version_group_id        BigInt?
  region_id               BigInt?
  pokemon_v2_region       pokemon_v2_region?       @relation(fields: [region_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_versiongroup pokemon_v2_versiongroup? @relation(fields: [version_group_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([region_id], map: "idx_16630_pokemon_v2_versiongroupregion_region_id_8f876d0b")
  @@index([version_group_id], map: "idx_16630_pokemon_v2_versiongroupregion_version_group_id_a3445b")
}

model pokemon_v2_versionname {
  id                  BigInt               @id(map: "idx_17343_pokemon_v2_versionname_pkey") @default(autoincrement())
  language_id         BigInt?
  version_id          BigInt?
  name                String?
  pokemon_v2_language pokemon_v2_language? @relation(fields: [language_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
  pokemon_v2_version  pokemon_v2_version?  @relation(fields: [version_id], references: [id], onDelete: NoAction, onUpdate: NoAction)

  @@index([language_id], map: "idx_17343_pokemon_v2_versionname_language_id_890e148a")
  @@index([name], map: "idx_17343_pokemon_v2_versionname_name_df504fd7")
  @@index([version_id], map: "idx_17343_pokemon_v2_versionname_version_id_84baf0a3")
}

`;
-- CreateTable
CREATE TABLE "auto" (
    "vin_id" SERIAL NOT NULL,
    "vin" CHAR(17) NOT NULL,
    "make" VARCHAR(50) NOT NULL,
    "model" VARCHAR(50) NOT NULL,
    "vehicle_year" INTEGER NOT NULL,
    "miles" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auto_pkey" PRIMARY KEY ("vin_id")
);

-- CreateTable
CREATE TABLE "parts" (
    "part_id" SERIAL NOT NULL,
    "maintenance_id" INTEGER,
    "part_name" VARCHAR(100),
    "part_number" VARCHAR(50),
    "part_type" VARCHAR(50),
    "brand" VARCHAR(50),
    "quantity" INTEGER,
    "unit_cost" DECIMAL(10,2),
    "total_cost" DECIMAL(10,2) DEFAULT ((quantity)::numeric * unit_cost),
    "supplier_name" VARCHAR(100),
    "purchase_date" DATE,
    "under_warranty" BOOLEAN NOT NULL,
    "warranty_expiration" DATE,
    "created_by" VARCHAR(100) NOT NULL,
    "created_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "parts_pkey" PRIMARY KEY ("part_id")
);

-- CreateTable
CREATE TABLE "service_logs" (
    "log_id" SERIAL NOT NULL,
    "maintenance_id" INTEGER NOT NULL,
    "log_date" DATE DEFAULT CURRENT_DATE,
    "notes" TEXT,
    "user_id" INTEGER,

    CONSTRAINT "service_logs_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "servicetype" (
    "servicetype_id" SERIAL NOT NULL,
    "servicename" VARCHAR(150) NOT NULL,
    "servicecategory" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "intervalmiles" INTEGER,
    "intervalmonths" INTEGER,
    "estimatedlaborhours" DECIMAL(10,2),
    "standardpartscost" DECIMAL(10,2),
    "isactive" BOOLEAN NOT NULL,
    "createddate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createdby" VARCHAR(100) NOT NULL,
    "updateddate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "servicetype_pkey" PRIMARY KEY ("servicetype_id")
);

-- CreateTable
CREATE TABLE "shops" (
    "shop_id" SERIAL NOT NULL,
    "shop_name" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(15),
    "email" VARCHAR(100),
    "address" TEXT,
    "notes" TEXT,

    CONSTRAINT "shops_pkey" PRIMARY KEY ("shop_id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "supplier_id" SERIAL NOT NULL,
    "supplier_name" VARCHAR(100) NOT NULL,
    "contact_name" VARCHAR(100),
    "phone" VARCHAR(15),

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "technicians" (
    "technician_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "certification" VARCHAR(50) NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "notes" TEXT,

    CONSTRAINT "technicians_pkey" PRIMARY KEY ("technician_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "dob" DATE,
    "street_address" VARCHAR(100),
    "city" VARCHAR(50),
    "state_province" VARCHAR(50),
    "postal_code" VARCHAR(20),
    "country" VARCHAR(50),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "mechanic_rating" VARCHAR(50) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "vehicle_history" (
    "history_id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "registered" BOOLEAN DEFAULT true,
    "registered_start" DATE,
    "registered_end" DATE,

    CONSTRAINT "vehicle_history_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "vehiclemaintenance" (
    "maintenance_id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "vehiclename" VARCHAR(100),
    "mainttype" VARCHAR(50),
    "description" TEXT,
    "status" VARCHAR(50) NOT NULL,
    "odometerreading" INTEGER NOT NULL,
    "completeddate" DATE,
    "servicelocation" VARCHAR(100),
    "downhours" DECIMAL(5,2),
    "costlabor" DECIMAL(10,2),
    "costpart" DECIMAL(10,2),
    "partsused" TEXT,
    "warrantystatus" BOOLEAN NOT NULL,
    "notes" TEXT,
    "createdby" VARCHAR(100) NOT NULL,
    "createddate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updateddate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "isactive" BOOLEAN NOT NULL,
    "servicetype_id" INTEGER,
    "totalcost" DECIMAL(10,2) DEFAULT 0,
    "technician_type" VARCHAR(50) NOT NULL DEFAULT 'Self',
    "technician_id" INTEGER,
    "shop_id" INTEGER,

    CONSTRAINT "vehiclemaintenance_pkey" PRIMARY KEY ("maintenance_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auto_vin_key" ON "auto"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "shops_shop_name_key" ON "shops"("shop_name");

-- CreateIndex
CREATE UNIQUE INDEX "technicians_user_id_key" ON "technicians"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_vehiclemaintenance_servicetype_id" ON "vehiclemaintenance"("servicetype_id");

-- CreateIndex
CREATE INDEX "idx_vehiclemaintenance_vehicle_id" ON "vehiclemaintenance"("vehicle_id");

-- AddForeignKey
ALTER TABLE "auto" ADD CONSTRAINT "auto_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "parts" ADD CONSTRAINT "parts_maintenance_id_fkey" FOREIGN KEY ("maintenance_id") REFERENCES "vehiclemaintenance"("maintenance_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "service_logs" ADD CONSTRAINT "service_logs_maintenance_id_fkey" FOREIGN KEY ("maintenance_id") REFERENCES "vehiclemaintenance"("maintenance_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "service_logs" ADD CONSTRAINT "service_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "technicians" ADD CONSTRAINT "technicians_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicle_history" ADD CONSTRAINT "vehicle_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicle_history" ADD CONSTRAINT "vehicle_history_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "auto"("vin_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehiclemaintenance" ADD CONSTRAINT "fk_servicetype" FOREIGN KEY ("servicetype_id") REFERENCES "servicetype"("servicetype_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehiclemaintenance" ADD CONSTRAINT "fk_vehicle" FOREIGN KEY ("vehicle_id") REFERENCES "auto"("vin_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehiclemaintenance" ADD CONSTRAINT "vehiclemaintenance_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("shop_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehiclemaintenance" ADD CONSTRAINT "vehiclemaintenance_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "technicians"("technician_id") ON DELETE SET NULL ON UPDATE NO ACTION;


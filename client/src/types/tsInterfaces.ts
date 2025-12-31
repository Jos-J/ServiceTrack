// client/src/types/tsInterfaces.ts

export interface ApiResponse<T> {
  data: T;
  message?: string;
  errors?: string[];
}

// 1. Autos
// -------------------------
export interface AutoNested {
  vin_id: number;
  vin: string;
  make: string;
  model: string;
  vehicle_year: number;
  miles: number;
  owner_id: number;
}

export interface Auto {
  vin_id: number;
  vin: string;
  make: string;
  model: string;
  vehicle_year: number;
  miles: number;
  owner_id: number;
  users?: UserNested;
}

export interface AutoCreateRequest {
  vin: string;
  make: string;
  model: string;
  vehicle_year: number;
  miles: number;
  owner_id: number;
}

export interface AutoUpdateRequest {
  vin?: string;
  make?: string;
  model?: string;
  vehicle_year?: number;
  miles?: number;
  owner_id?: number;
}
export type AutoResponse = ApiResponse<Auto>;

// 2. Vehicle Maintenance
// -------------------------
export interface VehicleMaintenanceNested {
  maintenance_id: number;
  vehicle_id: number;
  vehiclename?: string;
  mainttype?: string;
  description?: string;
  status: string;
  odometerreading: number;
  totalcost?: number;
  auto?: AutoNested;
  servicetype?: ServiceTypeNested;
  shops?: ShopNested;
  technicians?: TechnicianNested;
  parts?: PartNested[];
  service_logs?: ServiceLogNested[];
  createddate?: string;
  updateddate?: string;
}

export interface VehicleMaintenanceCreateRequest {
  vehicle_id: number;
  status: string;
  odometerreading: number;
  createdby: string;
  isactive: boolean;
  warrantystatus: boolean; // required in DB
  technician_type?: string; // optional because DB has default
  vehiclename?: string;
  mainttype?: string;
  description?: string;
  totalcost?: number;
  servicetype_id?: number;
  technician_id?: number;
  shop_id?: number;
}

export interface VehicleMaintenanceUpdateRequest {
  vehiclename?: string;
  mainttype?: string;
  description?: string;
  status?: string;
  odometerreading?: number;
  completeddate?: string;
  totalcost?: number;
  isactive?: boolean;
}

export interface VehicleMaintenance extends VehicleMaintenanceNested {}

export type VehicleMaintenanceResponse = ApiResponse<VehicleMaintenance>;


// 3. Parts
// -------------------------
export interface Part {
  part_id: number;
  maintenance_id?: number;
  part_name?: string;
  part_number?: string;
  part_type?: string;
  brand?: string;
  quantity?: number;
  unit_cost?: number;
  total_cost?: number;
  supplier_name?: string;
  purchase_date?: string;
  under_warranty: boolean;
  warranty_expiration?: string;
  created_by: string;
  created_date?: string;
  updated_date?: string;
  notes?: string;
}

/**
 * Nested version used when including relations
 */
export interface PartNested extends Part {
  vehiclemaintenance?: VehicleMaintenanceNested;
}

export interface PartCreateRequest {
  part_name?: string;
  part_number?: string;     // <-- add this
  part_type?: string;
  brand?: string;
  quantity?: number;
  unit_cost?: number;
  total_cost?: number;
  supplier_name?: string;
  purchase_date?: string;
  under_warranty?: boolean;
  warranty_expiration?: string;
  created_by?: string;
  notes?: string;
  maintenance_id?: number;  // optional relation
}

export interface PartUpdateRequest {
  part_name?: string;
  part_number?: string;     // <-- add this
  part_type?: string;
  brand?: string;
  quantity?: number;
  unit_cost?: number;
  total_cost?: number;
  supplier_name?: string;
  purchase_date?: string;
  under_warranty?: boolean;
  warranty_expiration?: string;
  created_by?: string;
  notes?: string;
  maintenance_id?: number;  // optional relation
}

export type PartResponse = ApiResponse<Part>;
 

// 4. Service Logs
// -------------------------
export interface ServiceLogNested {
  log_id: number;
  maintenance_id: number;
  notes?: string;
  user_id?: number;
}

export interface ServiceLog {
  log_id: number;
  maintenance_id: number;
  notes?: string;
  user_id?: number;
  users?: UserNested;
}

export interface ServiceLogCreateRequest {
  maintenance_id: number;
  notes?: string;
  user_id?: number;
}

export interface ServiceLogUpdateRequest {
  notes?: string;
}

export type ServiceLogResponse = ApiResponse<ServiceLog>;

// 5. Service Type
// -------------------------
export interface ServiceTypeNested {
  servicetype_id: number;
  servicename: string;
  servicecategory: string;
}

export interface ServiceType {
  servicetype_id: number;
  servicename: string;
  servicecategory: string;
  description?: string;
  isactive?: boolean;
}

export interface ServiceTypeCreateRequest {
  servicename: string;
  servicecategory: string;
  description?: string;
  isactive?: boolean;
}

export type ServiceTypeResponse = ApiResponse<ServiceType>;


// 6. Shops
// -------------------------
export interface ShopNested {
  shop_id: number;
  shop_name: string;
  phone?: string;
  email?: string;
}

export interface Shop {
  shop_id: number;
  shop_name: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface ShopCreateRequest {
  shop_name: string;
  phone?: string;
  email?: string;
  address?: string;
}

export type ShopResponse = ApiResponse<Shop>;

// 7. Suppliers
// -------------------------
export interface Supplier {
  supplier_id: number;
  supplier_name: string;
  contact_name?: string;
  phone?: string;
}

export interface SupplierCreateRequest {
  supplier_name: string;
  contact_name?: string;
  phone?: string;
}

export type SupplierResponse = ApiResponse<Supplier>;
 
// 8. Technicians
// -------------------------
export interface TechnicianNested {
  technician_id: number;
  user_id: number;
  certification?: string;
}

export interface Technician {
  technician_id: number;
  user_id: number;
  certification?: string;
  is_active?: boolean;
}

export interface TechnicianCreateRequest {
  user_id: number;
  certification?: string;
  is_active?: boolean;
}

export type TechnicianResponse = ApiResponse<Technician>;

// 9. Users
// -------------------------
export interface UserNested {
  user_id: number;
  first_name: string;
  last_name: string;
}

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  mechanic_rating?: string;
}

export interface UserCreateRequest {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  mechanic_rating?: string;
}
export type UserResponse = ApiResponse<User>;

// 10. Vehicle History
// -------------------------
export interface VehicleHistory {
  history_id: number;
  vehicle_id: number;
  user_id: number;
  registered?: boolean;
  auto?: AutoNested;
  users?: UserNested;
}

export interface VehicleHistoryCreateRequest {
  vehicle_id: number;
  user_id: number;
  registered?: boolean;
}

export type VehicleHistoryResponse = ApiResponse<VehicleHistory>; 
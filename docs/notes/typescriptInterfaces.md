// types/api.ts

```-------------------------
// 1. Autos
// -------------------------
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

export interface AutoNested {
  vin_id: number;
  vin: string;
  make: string;
  model: string;
  vehicle_year: number;
  miles: number;
  owner_id: number;
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

export interface AutoResponse {
  data: Auto;
  message?: string;
  errors?: string[];
}

// -------------------------
// 2. Vehicle Maintenance
// -------------------------
export interface VehicleMaintenance {
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
}

export interface VehicleMaintenanceCreateRequest {
  vehicle_id: number;
  vehiclename?: string;
  mainttype?: string;
  description?: string;
  status: string;
  odometerreading: number;
  totalcost?: number;
  createdby: string;
  isactive?: boolean;
  servicetype_id?: number;
  technician_type?: string;
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

export interface VehicleMaintenanceResponse {
  data: VehicleMaintenance;
  message?: string;
  errors?: string[];
}

// -------------------------
// 3. Parts
// -------------------------
export interface Part {
  part_id: number;
  maintenance_id?: number;
  part_name?: string;
  brand?: string;
  quantity?: number;
  unit_cost?: number;
  total_cost?: number;
  vehiclemaintenance?: VehicleMaintenance;
}

export interface PartNested {
  part_id: number;
  maintenance_id?: number;
  part_name?: string;
  brand?: string;
  quantity?: number;
  unit_cost?: number;
  total_cost?: number;
}

export interface PartCreateRequest {
  maintenance_id?: number;
  part_name?: string;
  brand?: string;
  quantity?: number;
  unit_cost?: number;
}

export interface PartUpdateRequest {
  part_name?: string;
  brand?: string;
  quantity?: number;
  unit_cost?: number;
}

export interface PartResponse {
  data: Part;
  message?: string;
  errors?: string[];
}

// -------------------------
// 4. Service Logs
// -------------------------
export interface ServiceLog {
  log_id: number;
  maintenance_id: number;
  notes?: string;
  user_id?: number;
  users?: UserNested;
}

export interface ServiceLogNested {
  log_id: number;
  maintenance_id: number;
  notes?: string;
  user_id?: number;
}

export interface ServiceLogCreateRequest {
  maintenance_id: number;
  notes?: string;
  user_id?: number;
}

export interface ServiceLogUpdateRequest {
  notes?: string;
}

export interface ServiceLogResponse {
  data: ServiceLog;
  message?: string;
  errors?: string[];
}

// -------------------------
// 5. Service Type
// -------------------------
export interface ServiceType {
  servicetype_id: number;
  servicename: string;
  servicecategory: string;
  description?: string;
  isactive?: boolean;
}

export interface ServiceTypeNested {
  servicetype_id: number;
  servicename: string;
  servicecategory: string;
}

export interface ServiceTypeCreateRequest {
  servicename: string;
  servicecategory: string;
  description?: string;
  isactive?: boolean;
}

export interface ServiceTypeResponse {
  data: ServiceType;
  message?: string;
  errors?: string[];
}

// -------------------------
// 6. Shops
// -------------------------
export interface Shop {
  shop_id: number;
  shop_name: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface ShopNested {
  shop_id: number;
  shop_name: string;
  phone?: string;
  email?: string;
}

export interface ShopCreateRequest {
  shop_name: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface ShopResponse {
  data: Shop;
  message?: string;
  errors?: string[];
}

// -------------------------
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

export interface SupplierResponse {
  data: Supplier;
  message?: string;
  errors?: string[];
}

// -------------------------
// 8. Technicians
// -------------------------
export interface Technician {
  technician_id: number;
  user_id: number;
  certification?: string;
  is_active?: boolean;
}

export interface TechnicianNested {
  technician_id: number;
  user_id: number;
  certification?: string;
}

export interface TechnicianCreateRequest {
  user_id: number;
  certification?: string;
  is_active?: boolean;
}

export interface TechnicianResponse {
  data: Technician;
  message?: string;
  errors?: string[];
}

// -------------------------
// 9. Users
// -------------------------
export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  mechanic_rating?: string;
}

export interface UserNested {
  user_id: number;
  first_name: string;
  last_name: string;
}

export interface UserCreateRequest {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  mechanic_rating?: string;
}

export interface UserResponse {
  data: User;
  message?: string;
  errors?: string[];
}

// -------------------------
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

export interface VehicleHistoryResponse {
  data: VehicleHistory;
  message?: string;
  errors?: string[];
}
```

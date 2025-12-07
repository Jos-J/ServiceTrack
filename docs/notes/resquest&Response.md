### 1 AUTO
-   Endpoint: `/auto`
-   Methods: `Get, Post, Put /auto/{id}, DELETE /auto/{id}`
#### Request
-   POST `/auto`
```{
  "vin": "1HGCM82633A123456",
  "make": "Honda",
  "model": "Civic",
  "vehicle_year": 2018,
  "miles": 42000,
  "owner_id": 3
}
```
-   PUT `/auto/{id}`
 ```
 {
  "miles": 43000
}
```
#### Response
- GET `/auto`
 ```
  {
  "data": [
    {
      "vin_id": 1,
      "vin": "1HGCM82633A123456",
      "make": "Honda",
      "model": "Civic",
      "vehicle_year": 2018,
      "miles": 42000,
      "owner_id": 3,
      "users": { "user_id": 3, "first_name": "Jim", "last_name": "Jones" }
    }
  ]
}
```
### 2 VEHICLE MAINTENANCE
- Endpoint: `/maintenance`
- Methods: `GET, POST, PUT /maintenance/{id}, DELETE /maintencance/{id}`
#### Request
- POST `/maintenance`
```
{
  "vehicle_id": 1,
  "vehiclename": "Civic LX",
  "mainttype": "Oil Change",
  "description": "Change engine oil and filter",
  "status": "Pending",
  "odometerreading": 42000,
  "totalcost": 85.5,
  "createdby": "Jim Jones",
  "isactive": true,
  "servicetype_id": 1,
  "technician_id": 2,
  "shop_id": 1
}
```
- PUT `/maintenance/{id}`
```
{
  "status": "Completed",
  "totalcost": 90.0
}
```
#### Response
- GET `/maintenance`
```
{
  "data": [
    {
      "maintenance_id": 1,
      "vehicle_id": 1,
      "vehiclename": "Civic LX",
      "mainttype": "Oil Change",
      "status": "Pending",
      "odometerreading": 42000,
      "totalcost": 85.5,
      "auto": { "vin_id": 1, "vin": "1HGCM82633A123456", "make": "Honda", "model": "Civic" },
      "servicetype": { "servicetype_id": 1, "servicename": "Oil Change" },
      "shops": { "shop_id": 1, "shop_name": "Downtown Garage" },
      "technicians": { "technician_id": 2, "user_id": 5, "certification": "ASE" }
    }
  ]
}
```
### 3 PARTS
- Endpoint: `/parts `
- Method: `GET, POST, PUT /part/{id}, DELETE /parts/{id} `
#### Request
-  POST `/parts `
```
{
  "maintenance_id": 1,
  "part_name": "Oil Filter",
  "brand": "Bosch",
  "quantity": 1,
  "unit_cost": 10.5
}
```
#### Response
- GET `/parts`
```
{
  "data": [
    {
      "part_id": 1,
      "maintenance_id": 1,
      "part_name": "Oil Filter",
      "brand": "Bosch",
      "quantity": 1,
      "unit_cost": 10.5,
      "total_cost": 10.5,
      "vehiclemaintenance": { "maintenance_id": 1, "vehicle_id": 1, "status": "Pending" }
    }
  ]
}
```
### 4 SERVICE LOGS
- Endpoint: `/service-logs`
- Methods: `Get, POST, PUT /service-logs/{id}, DELETE /service-logs/{id}`
#### Request
- POST `/service-logs`
```
{
  "maintenance_id": 1,
  "notes": "Changed oil and filter",
  "user_id": 5
}
```
- PUT `/service-logs{id}`
```
{
  "notes": "Added tire rotation"
}
```
#### Response
- GET `/service-logs`
```
{
  "data": [
    {
      "log_id": 1,
      "maintenance_id": 1,
      "notes": "Changed oil and filter",
      "user_id": 5,
      "users": { "user_id": 5, "first_name": "Alice", "last_name": "Smith" }
    }
  ]
}
```
### 5 SERVICE TYPE
- Endpoint: `/servicetype`
- Method: `GET, POST`
#### Request
- POST `/servicetype`
```
{
  "servicename": "Oil Change",
  "servicecategory": "Maintenance",
  "description": "Replace engine oil and filter",
  "isactive": true
}
```
#### Response
- GET `/servicetype`
```
{
  "data": [
    {
      "servicetype_id": 1,
      "servicename": "Oil Change",
      "servicecategory": "Maintenance",
      "description": "Replace engine oil and filter",
      "isactive": true
    }
  ]
}
```
### 6 SHOPS
- Endpoint: `/shops`
- Methods: `GET, POST`
#### Request
- POST `/shops`
```
{
  "shop_name": "Downtown Garage",
  "phone": "555-1234",
  "email": "contact@downtowngarage.com",
  "address": "123 Main St"
}
```
#### Response
-  GET `/shops`
```
{
  "data": [
    {
      "shop_id": 1,
      "shop_name": "Downtown Garage",
      "phone": "555-1234",
      "email": "contact@downtowngarage.com",
      "address": "123 Main St"
    }
  ]
}
```
### 7 suppliers
- Endpoint: `/suppliers`
- Methods: `GET, POST `
#### Request
- POST `/suppliers`
```
{
  "supplier_name": "Bosch Parts",
  "contact_name": "John Doe",
  "phone": "555-5678"
}
```
#### Response
- GET `/suppliers`
```
{
  "data": [
    {
      "supplier_id": 1,
      "supplier_name": "Bosch Parts",
      "contact_name": "John Doe",
      "phone": "555-5678"
    }
  ]
}
```
### 8 TECHNICIANS
- Endpoint: `/technicians`
-  Methods: `GET, POST `
#### Request
- POST `/technicians`
```
{
  "user_id": 5,
  "certification": "ASE",
  "is_active": true
}
```
#### Response
- GET `/techicians`
```
{
  "data": [
    {
      "technician_id": 2,
      "user_id": 5,
      "certification": "ASE",
      "is_active": true
    }
  ]
}
```
### 9 USERS
- Endpoint: `/users`
- Method: `GET, POST`
#### Request
- POST `/users`
```
{
  "first_name": "Alice",
  "last_name": "Smith",
  "phone_number": "555-0001",
  "email": "alice@example.com",
  "mechanic_rating": "Expert"
}
```
#### Response
- GET `/users`
```
{
  "data": [
    {
      "user_id": 5,
      "first_name": "Alice",
      "last_name": "Smith",
      "phone_number": "555-0001",
      "email": "alice@example.com",
      "mechanic_rating": "Expert"
    }
  ]
}
```
### 10 VEHICLE HISTORY
- Endpoint: `/vehicle-history`
- Method: `GET, POST`
#### Request
- POST `/vehicle-history`
```
{
  "vehicle_id": 1,
  "user_id": 5,
  "registered": true
}
```
#### Response
- GET `/vehicle-history`
```
{
  "data": [
    {
      "history_id": 1,
      "vehicle_id": 1,
      "user_id": 5,
      "registered": true,
      "auto": { "vin_id": 1, "vin": "1HGCM82633A123456", "make": "Honda", "model": "Civic" },
      "users": { "user_id": 5, "first_name": "Alice", "last_name": "Smith" }
    }
  ]
}
```

### AUTOS
-   Endpoint: `/autos`
-   Methods: `Get, Post, Put /autos/{id}, DELETE /autos/{id}`
#### Request
-   `POST /autos`
```{
  "vin": "1HGCM82633A123456",
  "make": "Honda",
  "model": "Civic",
  "vehicle_year": 2018,
  "miles": 42000,
  "owner_id": 3
}
```
-   `PUT /autos{id}`
 ```
 {
  "miles": 43000
}
```
#### Response
- `GET /autos`
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
### VEHICLE MAINTENANCE
- Endpoint: `/vehicle-maintenance`
- Methods: `GET, POST, PUT /vehicle-maintenance/{id}, DELETE /vehicle-maintencance/{id}`
#### Request
- `POST /vehicle-maintenance`
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
- ` PUT /vehicle-maintenance/{id}`
```
{
  "status": "Completed",
  "totalcost": 90.0
}
```
#### Response
- `GET /vehcile-maintenance`
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
### PARTS
- ` Endpoint: /parts `
- ` Method: GET, POST, PUT /part/{id}, DELETE /parts/{id} `
#### Request
- ` POST /parts `
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
- `GET /parts `
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



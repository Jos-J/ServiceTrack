# REST Endpoints Defined

### Auto
- `GET /autos` – List all autos
- `POST /autos` – Create a new auto
- `GET /autos/:id` – Get details of one auto
- `PUT /autos/:id` – Update an auto
- `DELETE /autos/:id` – Delete an auto

### Parts
- `GET /parts` – List all parts
- `POST /parts` – Add a new part
- `GET /parts/:id` – Get details of one part
- `PUT /parts/:id` – Update a part
- `DELETE /parts/:id` – Delete a part

### Service Logs
- `GET /service-logs` – List all service logs
- `POST /service-logs` – Create a service log
- `GET /service-logs/:id` – Get details of one log
- `PUT /service-logs/:id` – Update a log
- `DELETE /service-logs/:id` – Delete a log

### Service Types (Optional)
- `GET /service-types` – List service types
- `POST /service-types` – Create a new service type
- `GET /service-types/:id` – Get one service type
- `PUT /service-types/:id` – Update a service type
- `DELETE /service-types/:id` – Delete a service type

### Shops
- `GET /shops` – List all shops
- `POST /shops` – Add a new shop
- `GET /shops/:id` – Get details of one shop
- `PUT /shops/:id` – Update a shop
- `DELETE /shops/:id` – Delete a shop

### Suppliers (Optional)
- `GET /suppliers` – List all suppliers
- `POST /suppliers` – Add a new supplier
- `GET /suppliers/:id` – Get details of one supplier
- `PUT /suppliers/:id` – Update a supplier
- `DELETE /suppliers/:id` – Delete a supplier

### Technicians (Optional)
- `GET /technicians` – List all technicians
- `POST /technicians` – Add a new technician
- `GET /technicians/:id` – Get details of one technician
- `PUT /technicians/:id` – Update a technician
- `DELETE /technicians/:id` – Delete a technician

### Users
- `GET /users` – List all users
- `POST /users` – Create a new user
- `GET /users/:id` – Get details of one user
- `PUT /users/:id` – Update a user
- `DELETE /users/:id` – Delete a user

### Vehicle History (Optional / Read-only)
- `GET /vehicle-history/:vehicleId` – Get service history for a specific vehicle

### Vehicle Maintenance
- `GET /vehicle-maintenance` – List maintenance schedules
- `POST /vehicle-maintenance` – Create a maintenance entry
- `GET /vehicle-maintenance/:id` – Get details of one entry
- `PUT /vehicle-maintenance/:id` – Update a maintenance entry
- `DELETE /vehicle-maintenance/:id` – Delete a maintenance entry




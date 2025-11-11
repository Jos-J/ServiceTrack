# Queries
{
    auto {
        vin_id
        vin
        make
        model
        vehicle_year
        vehiclemaintenance {
            date
        }
    }
}


# Mutations
mutation {
    createAuto(vin: make:) {
        vid_id
        make
        model
    }
}
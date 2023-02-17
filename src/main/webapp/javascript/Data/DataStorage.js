

 class DataStorage{
    constructor(){
        this.restaurantObject = {};
   //     this.currentTable = 0;
        this.reservations =  {};
    }

    setRestaurantObject(restaurantObject){
        this.restaurantObject = restaurantObject;
    }
    getRestaurantObject(){
        return this.restaurantObject;
    }

    setReservations(reservations){
        this.reservations = reservations;
    }
    getReservations(){
        return this.reservations;
    }

}

export const dataStorage = new DataStorage();
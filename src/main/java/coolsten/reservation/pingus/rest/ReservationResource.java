package coolsten.reservation.pingus.rest;

import coolsten.reservation.pingus.model.Reservation;
import coolsten.reservation.pingus.service.ReservationService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
public class ReservationResource {

    private ReservationService reservationService;

    public ReservationResource(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping(value = "reservations")
    public ResponseEntity<List<String>> getReservations(@RequestParam(value = "restaurant", required = false, defaultValue = "-1") int restaurantId) {
        if (restaurantId != -1) {
            //REMOVED USER FROM THE EQUATION AS RN IT WAS CHECKING WITH NUMBER OF PERSONS WHICH WAS IG WRONG
            //SORRY IF I UNDERSTOOD IT WRONG SO I HAVEN'T DELETED ANYTHING JUST COMMENTED IT OUT...
            return ResponseEntity.ok(reservationService.getReservations(restaurantId));
//            return ResponseEntity.ok(reservationService.getReservations(0, restaurantId));
        } else {
            return ResponseEntity.ok(reservationService.getReservations());
//            return ResponseEntity.ok(reservationService.getReservations(0));
        }
    }

    @PutMapping(value = "reservations",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Void> updateReservation(@RequestBody Reservation reservation) {

        try{
            Reservation found = reservationService.findReservation(
                    reservation.getReservationTime(),
                    reservation.getReservationDate(),
                    reservation.getRestaurantId(),
                    reservation.getTableId()
            );

            if (found != null) {
                found.setCancelled(reservation.isCancelled());
                if (!found.isCancelled()) {
                    found.setConfirmed(reservation.isConfirmed());
                } else {
                    found.setConfirmed(false);
                }
            } else {
                return ResponseEntity.badRequest().build();
            }

        } catch (IllegalArgumentException | IndexOutOfBoundsException e){
            return ResponseEntity.badRequest().build();
        }

        reservationService.saveList();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("seats")
    public ResponseEntity<List<Integer>> getOccupiedSeats(@RequestParam(value = "restaurant", required = true) int restaurantId,
                                                          @RequestParam(value = "time", required = true) String lTime,
                                                          @RequestParam(value = "date", required = true) String lDate) {
        if (restaurantId < 0 || restaurantId > 50)
            return ResponseEntity.badRequest().build();


        LocalTime time;
        LocalDate date;
        try {
            time = LocalTime.parse(lTime); // String (HH:MM) should look like this: "20:00"
            date = LocalDate.parse(lDate); // String (YYYY-MM-DD) should look like this: "2022-07-11"
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().build();
        }

        if (time.getMinute() == 0 || time.getMinute() == 30) {
            List<Integer> tmp = reservationService.getOccupiedSeats(restaurantId, time, date);
            if (tmp != null) {
                return ResponseEntity.ok(tmp);
            } else {
                return ResponseEntity.badRequest().build();
            }

        } else {
            return ResponseEntity.badRequest().build();
        }

    }



    @PostMapping(value = "reservations",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Void> addReservations(@RequestBody Reservation reservation) {
        // TODO Date & Time valid check
        if(reservation.getRestaurantId() < 0 || reservation.getRestaurantId() > 50)
            return ResponseEntity.badRequest().build();

        Reservation persiRes;
        try{

            Reservation found = reservationService.findReservation(
                    reservation.getReservationTime(),
                    reservation.getReservationDate(),
                    reservation.getRestaurantId(),
                    reservation.getTableId()
            );

            if (found == null) {
                persiRes = new Reservation(
                        reservation.getReservationDate(),
                        reservation.getReservationTime(),
                        0,
                        reservation.getTableId(),
                        reservation.getRestaurantId()
                );
                reservationService.addReservation(persiRes);
            } else {
                return ResponseEntity.badRequest().build();
            }
        }catch (IllegalArgumentException | IndexOutOfBoundsException e){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.noContent().build();
    }
}

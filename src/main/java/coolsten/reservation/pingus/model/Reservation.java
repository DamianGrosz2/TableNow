package coolsten.reservation.pingus.model;

import org.json.JSONException;
import org.json.JSONObject;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

public class Reservation {

    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private int person;
    private int tableId;
    private int restaurantId;
    private boolean confirmed;

    private boolean cancelled;
    //14:00 till 24:00


    public Reservation(LocalDate reservationDate, LocalTime reservationTime, int person, int tableId, int restaurantId) {
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.person = person;
        this.tableId = tableId;
        this.restaurantId = restaurantId;
        this.confirmed = false;
        this.cancelled = false;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public int getPerson() {
        return person;
    }

    public int getTableId() {
        return tableId;
    }

    public int getRestaurantId() {
        return restaurantId;
    }

    public boolean isConfirmed() {
        return confirmed;
    }
    public boolean isCancelled() { return cancelled; }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }
    public void setCancelled(boolean cancelled) {
        this.cancelled = cancelled;
    }

    public LocalTime getReservationTime(){
        return reservationTime;
    }

    public JSONObject getJSON() {
        try {
            return new JSONObject()
                    .put("person", getPerson())
                    .put("tableId", getTableId())
                    .put("reservationDate", getReservationDate().toString())
                    .put("reservationTime", getReservationTime().toString())
                    .put("restaurantId",getRestaurantId())
                    .put("confirmed",isConfirmed())
                    .put("cancelled",isCancelled());
        } catch (JSONException e) {
            System.err.println("Error occurred while trying to form reservation JSON");
            System.err.println(e.getMessage());
            return new JSONObject();
        }

    }

    public static void main(String[] args) {
        System.out.println(new Reservation(
                LocalDate.parse("2018-05-05"),
                LocalTime.now(),
                1,
                1,1
        ).getJSON());
    }


}

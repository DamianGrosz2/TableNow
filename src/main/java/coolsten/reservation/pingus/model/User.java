package coolsten.reservation.pingus.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class User {

    private int id;
    private String name;
    private List<Reservation> reservationList;
    private double longitude;
    private double latitude;


    public User(int id, String name, double longitude, double latitude) {
        this.id = id;
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.reservationList = new ArrayList<>();
    }

    public User(int id, String name, List<Reservation> reservationList) {
        this.id = id;
        this.name = name;
        this.reservationList = reservationList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Override
    public String toString() {
        return "Note{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

}

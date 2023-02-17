package coolsten.reservation.pingus.service;

import coolsten.reservation.pingus.model.*;
import coolsten.reservation.pingus.model.Restaurant;
import coolsten.reservation.pingus.model.RestaurantType;
import net.bytebuddy.description.method.ParameterList;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
public class ReservationService {

    private final List<Reservation> reservationList;

    public ReservationService() {
        this.reservationList = new ArrayList<>();
        try {

            Path path = Path.of("src/main/resources/reservations.json");
            String json_stuff = Files.readString(path);

            JSONArray arr = new JSONArray(json_stuff);
            for (int i = 0; i < arr.length(); i++)
            {
                JSONObject tmp = arr.getJSONObject(i);

                Reservation tmpReservation = new Reservation(
                        LocalDate.parse((tmp.getString("reservationDate"))),
                        LocalTime.parse(tmp.getString("reservationTime")),
                        tmp.getInt("person"),
                        tmp.getInt("tableId"),
                        tmp.getInt("restaurantId")
                );

                tmpReservation.setConfirmed(tmp.getBoolean("confirmed"));
                tmpReservation.setCancelled(tmp.getBoolean("cancelled"));

                reservationList.add(tmpReservation);
            }
        } catch (JSONException | IOException e) {
            System.err.println("Reservations JSON file failed to parse correctly.");
        }
    }

    public List<Reservation> getReservationList() {
        return reservationList;
    }


    public void saveList() {
        try{
            Path path = Path.of("src/main/resources/reservations.json");
            JSONArray array = new JSONArray();
            for (Reservation reservation : reservationList) {
                array.put(reservation.getJSON());
            }
            PrintWriter out = new PrintWriter(new FileWriter(String.valueOf(path)));
            out.write(array.toString());
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void addReservation(Reservation res) {
        reservationList.add(res);
        saveList();
    }

    public void updateReservations() {
        int changes = 0;
        for (int i = 0; i < reservationList.size(); i++) {
            Reservation res = reservationList.get(i);
            LocalDateTime curr = LocalDateTime.now();
            LocalDateTime tar = LocalDateTime.of(res.getReservationDate(), res.getReservationTime());
            long tttt = curr.until(tar, ChronoUnit.HOURS);
            if (curr.isAfter(tar)) {
                changes++;
                reservationList.remove(i);
                i--;
            } else if (!res.isCancelled() && !res.isConfirmed() && curr.until(tar, ChronoUnit.HOURS) < 11) {
                res.setCancelled(true);
                changes++;
            }
        }

        if (changes > 0) {
            saveList();
        }
    }

    public List<String> getReservations() {
        updateReservations();
        return reservationList.stream().map(s -> s.getJSON().toString()).toList();
    }

    public List<String> getReservations(int restaurantId) {
        return reservationList.stream().filter(s -> s.getRestaurantId() == restaurantId)
                .map(s -> s.getJSON().toString()).toList();
    }

    public boolean areDatesTheSame(LocalDate first, LocalDate second) {
        return first.isEqual(second);
    }

    public boolean isReservationStillInTimeFrame(LocalTime first, LocalTime compare) {
        return Math.abs(first.toSecondOfDay() - compare.toSecondOfDay()) < 7200;
    }

    public Reservation findReservation(LocalTime t, LocalDate d, int restaurantId, int tableId) {
        try {
            return reservationList.stream()
                    .filter(s -> s.getReservationDate().isEqual(d))
                    .filter(s -> s.getReservationTime().equals(t))
                    .filter(s -> s.getRestaurantId() == restaurantId)
                    .filter(s -> s.getTableId() == tableId)
                    .toList().get(0);
        } catch (IndexOutOfBoundsException e) {
            return null;
        }
    }

    public List<Integer> getOccupiedSeats(int restaurantId, LocalTime localTime, LocalDate localDate) {

        Restaurant foundRestaurant;
        try {
            foundRestaurant = RestaurantService.restaurantList.stream().filter(s -> s.getId() == restaurantId).toList().get(0);
        } catch (IndexOutOfBoundsException e) {
            return null;
        }

        List<Integer> result = foundRestaurant.generateOccupiedTables(localTime, localDate);

        List<Reservation> temp = reservationList.stream()
                .filter(s -> areDatesTheSame(s.getReservationDate(), localDate))
                .filter(s -> isReservationStillInTimeFrame(s.getReservationTime(), localTime))
                .toList();

        for (Reservation r : temp) {
            if (!result.contains(r.getTableId())) {
                result.add(r.getTableId());
            }
        }

        return result;
    }

//    public List<String> getReservations(int user) {
//        return reservationList.stream().filter(s -> s.getPerson() == user).map(Reservation::getJSON).toList();
//    }

//    public List<String> getReservations(int user, int restaurantId) {
//        return reservationList.stream().filter(s -> s.getPerson() == user && s.getRestaurantId() == restaurantId)
//                .map(Reservation::getJSON).toList();
//    }


    public static void main(String[] args) {
        Reservation a = new Reservation(LocalDate.parse("2018-05-05"), LocalTime.of(20, 0), 0, 1,1);
        Reservation b = new Reservation(LocalDate.parse("2018-05-05"), LocalTime.of(20, 0), 0, 1,2);
        Reservation c = new Reservation(LocalDate.parse("2018-05-05"), LocalTime.of(20, 0), 0, 1,3);
        Reservation d = new Reservation(LocalDate.parse("2018-05-05"), LocalTime.of(20, 0), 0, 1,4);
        Reservation e = new Reservation(LocalDate.parse("2018-05-05"), LocalTime.of(20, 0), 0, 1,5);
        ReservationService reservationService = new ReservationService();
        reservationService.addReservation(a);
        reservationService.addReservation(b);
        reservationService.addReservation(c);
        reservationService.addReservation(d);
        reservationService.addReservation(e);
        reservationService.getReservations(0).forEach(System.out::println);;
    }
}

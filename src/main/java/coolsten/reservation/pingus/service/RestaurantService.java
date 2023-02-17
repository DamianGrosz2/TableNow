package coolsten.reservation.pingus.service;

import coolsten.reservation.pingus.model.Restaurant;
import coolsten.reservation.pingus.model.RestaurantType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

import org.json.*;
import coolsten.reservation.pingus.util.Sorthelper;

import javax.swing.plaf.SpinnerUI;

@Service
public class RestaurantService {

    private static double longitude = 48.1832;
    private static double latitude = 11.6077;

    public static List<Restaurant> restaurantList = null;

    public RestaurantService() {
        restaurantList = new ArrayList<>();

        try {

            Path path = Path.of("src/main/resources/restaurants.json");
            String json_stuff = Files.readString(path);

            JSONArray arr = new JSONArray(json_stuff);
            for (int i = 0; i < arr.length(); i++)
            {
                JSONObject tmp = arr.getJSONObject(i);

                List<Integer> blocked_seats = new ArrayList<>();
                for(int s = 0 ; s < tmp.getJSONArray("occupiedTables").length();s++){
                    blocked_seats.add(tmp.getJSONArray("occupiedTables").getInt(s));
                }

                List<String> picture_list = new ArrayList<>();
                for(int s = 0 ; s < tmp.getJSONArray("pictures").length();s++){
                    picture_list.add(tmp.getJSONArray("pictures").getString(s));
                }

                List<String> comments_list = new ArrayList<>();
                for(int s = 0 ; s < tmp.getJSONArray("comments").length();s++){
                    comments_list.add(tmp.getJSONArray("comments").getString(s));
                }

                restaurantList.add(new Restaurant(
                    //Added URL
                    tmp.getInt("id"),
                    tmp.getInt("NoSeats"),
                    blocked_seats,
                    tmp.getString("name"),
                    picture_list,
                    RestaurantType.valueOf(tmp.getString("type")),
                    tmp.getString("description"),
                    tmp.getDouble("longitude"),
                    tmp.getDouble("latitude"),
                    tmp.getDouble("stars"),
                    new ArrayList<>(),
                    tmp.getInt("price"),
                    tmp.getString("address"),
                    tmp.getString("URL")

                ));
            }

            restaurantList.sort(Comparator.comparingDouble(Restaurant::getStars));

        } catch (JSONException | IOException e) {
            System.err.println("Restaurant JSON file failed to parse correctly.");
        }

    }

    public List<Restaurant> getRestaurantList() {
        return restaurantList;
    }

    public Restaurant getSpecificRestaurant(int id) {
        try {
            return restaurantList.stream().filter(s -> s.getId() == id).findFirst().get();
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    public List<String> getAllRestaurants(Sorthelper sortingOptions) {

        List<Restaurant> copy = new ArrayList<>(restaurantList);
        if (sortingOptions.getFilterType() != null) {
            copy = copy.stream().filter(s -> s.getType() == sortingOptions.getFilterType()).toList();
        }

        if (sortingOptions.getFilterPrice() > 0) {
            copy = copy.stream().filter(s -> s.getPrice() == sortingOptions.getFilterPrice()).toList();
        }

        if (sortingOptions.getFilterRating() > 0) {
            copy = copy.stream().filter(s -> s.getStars() >= sortingOptions.getFilterRating()).toList();
        }

        if (sortingOptions.getFilterDistance() >= 0) {
            if(sortingOptions.getFilterDistance() == 0){
                copy = new ArrayList<>();
            } else if (sortingOptions.getFilterDistance() == 35){
                copy = copy;
            }else {
                copy = copy.stream().filter(s -> Double.compare(filterDistanceHelper(s),sortingOptions.getFilterDistance())<=0).toList();
            }
        }


        if (!sortingOptions.getQuery().equals("")) {
            List<Restaurant> newCopy = new ArrayList<>();
            String[] arr = sortingOptions.getQuery().split(" ");
            for (Restaurant current : copy) {
                boolean found = false;
                for (String tmp : arr) {
                    if (tmp.equals(""))
                        continue;
                    tmp = tmp.trim();
                    if (current.getName().toLowerCase().contains(tmp.toLowerCase()) || current.getDescription().toLowerCase().contains(tmp.toLowerCase())) {
                        found = true;
                        break;
                    } else if (tmp.equalsIgnoreCase(current.getType().toString())){
                        found = true;
                        break;
                    }
                }
                if (found) {
                    newCopy.add(current);
                }

            }
            copy = newCopy;
        }



        if (sortingOptions.getSortField() == Sorthelper.SortField.DISTANCE) {
            copy = copy.stream().sorted((a,b)->compareDistance(a,b)).toList();
        } else if (sortingOptions.getSortField() == Sorthelper.SortField.RATING) {
            copy = copy.stream().sorted((a,b)->compareRating(a,b)).toList();
        } else if (sortingOptions.getSortField() == Sorthelper.SortField.PRICE) {
            copy = copy.stream().sorted((a,b)->comparePrice(a,b)).toList();
        }

        ArrayList<Restaurant> tmpfix = new ArrayList<>(copy);
        if (sortingOptions.getSortingOrder() != Sorthelper.SortingOrder.DESCENDING) {
            Collections.reverse(tmpfix);
        }

        return tmpfix.stream().map(Restaurant::getJSON).toList();
    }

    public double filterDistanceHelper(Restaurant a){
        // reference https://en.wikipedia.org/wiki/Haversine_formula
        double radius = 6378.137;
        double pi = Math.PI;
        double distanceLatitude = (a.getLatitude() - latitude) * (pi / 180.0);
        double distanceLongitude = (a.getLongitude() - longitude) * (pi / 180.0);
        double temp1 = (Math.pow(Math.sin(distanceLatitude/2.0),2))
                + (Math.cos(a.getLatitude() * (pi / 180.0)) *
                Math.cos(latitude * (pi / 180.0)) *
                (Math.pow( Math.sin(distanceLongitude/2.0),2)));
        double temp2 = 2 * Math.atan2(Math.sqrt(temp1),Math.sqrt(1-temp1));
//        double dist = ((temp2 * radius)-5292)*5;
//        System.out.println(dist);
        return ((temp2 * radius)-5292)*3.5;
    }

    public int compareDistance(Restaurant a, Restaurant b){
//        double aDist = Math.sqrt(Math.pow(a.getLatitude() - latitude, 2)+Math.pow(a.getLongitude() - longitude, 2));
//        double bDist = Math.sqrt(Math.pow(b.getLatitude() - latitude, 2)+Math.pow(b.getLongitude() - longitude, 2));
//        return Double.compare(aDist, bDist);
        double aDist = filterDistanceHelper(a);
        double bDist = filterDistanceHelper(b);
        return Double.compare(aDist, bDist);
    }

    public int compareRating(Restaurant a, Restaurant b){
        double aDist = a.getStars();
        double bDist =b.getStars();
        return Double.compare(aDist, bDist);
    }

    public int comparePrice(Restaurant a, Restaurant b){
        int aDist = a.getPrice();
        int bDist = b.getPrice();
        return Integer.compare(aDist,bDist);
    }
//    public double temp (double a, double b){
//        double radius = 6371.137;
//        double pi = Math.PI;
//        double distanceLatitude = (a - latitude) * (pi / 180);
//        double distanceLongitude = (b - longitude) * (pi / 180);
//        double temp1 = (Math.pow(Math.sin(distanceLatitude/2),2))
//                + (Math.cos(a * (pi / 180)) *
//                Math.cos(latitude * (pi / 180)) *
//                (Math.pow( Math.sin(distanceLongitude/2),2)));
//        double temp2 = 2 * Math.atan2(Math.sqrt(temp1),Math.sqrt(1-temp1));
//        return temp2 * radius /1000;
//    }

//    public static void main(String[] args)
//    {
//        RestaurantService tmp = new RestaurantService();
////        System.out.println(tmp.getRestaurantList().size());
//        //place 1
//        double lataFAR = 48.197880;
//        double longaFAR = 11.524250;
//        //place 2
//        double lataCLOSE = 48.13508;
//        double longaCLOSE = 11.53526;
//        //start point
//        double lataACTUAL = latitude;
//        double longaACTUAL = longitude;
////        double a = tmp.temp(lataFAR,longaFAR);
////        double b = tmp.temp(lataCLOSE,longaCLOSE);
////        double c = tmp.temp(lataACTUAL,longaACTUAL);
//        System.out.println(tmp.temp(lataFAR,longaFAR));
//        System.out.println(tmp.temp(lataCLOSE,longaCLOSE));
//        System.out.println(tmp.temp(lataACTUAL,longaACTUAL));
//    }
}

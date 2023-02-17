package coolsten.reservation.pingus.model;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URL;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

public class Restaurant {

    private int id;
    private int NoSeats;
    private List<Integer> occupiedTables;
    private String name;
    private List<String> pictures;
    private RestaurantType type;
    private String description;
    private String address;
    private double longitude;
    private double latitude;
    private double stars;
    private List<Comment> comments;
    private int price;
    private String URL;
    //1=$, 2=$$, 3=$$$ and 4=$$$$

    private static final int commentAmount = 2;

    public Restaurant(int id, int noSeats, List<Integer> occupiedTable,String name, List<String> pictures, RestaurantType type, String description, double longitude, double latitude, double stars, List<Comment> comments, int price, String address, String Url) {
        this.id = id;
        this.NoSeats = noSeats;
        this.occupiedTables = occupiedTable;
        this.name = name;
        this.pictures = pictures;
        this.type = type;
        this.description = description;
        this.longitude = longitude;
        this.latitude = latitude;
        this.stars = stars;
        this.comments = comments;
        this.price = price;
        this.address = address;
        this.URL = Url;

        randomComments();
    }

    public int getId() {
        return id;
    }

    public int getNoSeats() {
        return NoSeats;
    }

    public String getName() {
        return name;
    }

    public List<String> getPicture() {
        return pictures;
    }

    public RestaurantType getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }

    public double getLongitude() {
        return longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getStars() {
        return stars;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public int getPrice() {
        return price;
    }

    public String getAddress() {
        return address;
    }

    public String getURL() {
        return URL;
    }

    public void randomComments(){
        for (int i = 0; i < commentAmount; i++) {
            comments.add(Comment.generateRandomComment(new Random().nextInt(Math.max((int) this.stars-2,1), 6) ));
        }
    }

    private int stringToInt(String input) {
        int result = 0;
        for (char c : input.toCharArray()) {
            result += c;
        }
        return result;
    }

    private static int getNumberOfSeats(int design) {
        if (design == 3) {
            return 12;
        } else {
            return 21;
        }
    }

    public List<Integer> generateOccupiedTables(LocalTime cTime, LocalDate cDate) {

        List<Integer> result = new ArrayList<>();
        Random temp = new Random(stringToInt(cTime.toString() + cDate.toString() + getId()));

        int currHours = cTime.getHour();
        int numberOfSeats = getNumberOfSeats(getNoSeats());

        int min = Math.min(numberOfSeats, numberOfSeats - (10-(currHours-10)));
        int maxSeats = temp.nextInt(
                Math.min(Math.max((int) Math.floor(numberOfSeats * ((currHours - 10) * 0.3)),0), min -1),
                min
        );

        int fails = 0;
        for (int i = 0; i < maxSeats; i++) {
            if (fails > 10) {
                break; // unlucky with seed, not bothering fixing it
            }
            int tmp = temp.nextInt(numberOfSeats);
            if (result.contains(tmp)) {
                fails++;
                i--;
            } else {
                result.add(tmp);
            }
        }

        return result;
    }

    public String getJSON() {
        try {
            JSONArray occTables = new JSONArray();
            for (Integer occupiedTable : occupiedTables) {
                occTables.put(occupiedTable);
            }

            JSONArray pictureTbl = new JSONArray();
            for (String picture : pictures) {
                pictureTbl.put(picture);
            }

            JSONArray commentsTbl = new JSONArray();

            for (Comment comment : comments) {
                commentsTbl.put(comment.getJSON());
            }


            String jsonString = new JSONObject()
                    .put("id", getId())
                    .put("NoSeats", getNoSeats())
                    .put("name", getName())
                    .put("type", getType().toString())
                    .put("description", getDescription())
                    .put("longitude", getLongitude())
                    .put("latitude", getLatitude())
                    .put("stars", getStars())
                    .put("price", getPrice())
                    .put("occupiedTables", occTables)
                    .put("pictures", pictureTbl)
                    .put("comments", commentsTbl)
                    .put("address", getAddress())
                    .put("URL", getURL())
                    .toString();

            System.out.println(jsonString);
            return jsonString;
        } catch (JSONException e) {
            System.err.println("Error occurred while trying to form restaurant JSON");
            System.err.println(e.getMessage());
            return "[]";
        }

    }

//    // probably never going to be used
//    public JSONObject getSimpleJSON() {
//        try {
//            return new JSONObject()
//                    .put("id", getId())
//                    .put("name", getName())
//                    .put("type", getType().toString())
//                    .put("description", getDescription())
//                    .put("longitude", getLongitude())
//                    .put("latitude", getLatitude())
//                    .put("stars", getStars())
//                    .put("price", getPrice())
//                    .put("pictures", pictures.get(0));
//        } catch (JSONException e) {
//            System.err.println("Error occurred while trying to form simplified restaurant JSON");
//            System.err.println(e.getMessage());
//            return new JSONObject();
//        }
//    }

/*
    public static void main(String[] args) throws MalformedURLException {
        Restaurant test = new Restaurant(
                UUID.randomUUID(),
                6,
                new ArrayList<>(Arrays.asList(
                        1,4,5
                )),
                "Test Restaurant",
                new ArrayList<>(Arrays.asList(
                        new URL("https://i.imgur.com/0zladDX.jpg"),
                        new URL("https://i.imgur.com/0zladDX.jpg")
                )),
                RestaurantType.GERMAN,
                "Test Description",
                0.0d,
                0.0d,
                5.0d,
                new ArrayList<>(Arrays.asList(
                        "Test Kommentar",
                        "Tolles Restaurant!!1"
                )),
                1
        );
        test.getJSON();
    }
    */
}

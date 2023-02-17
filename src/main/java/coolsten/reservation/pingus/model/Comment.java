package coolsten.reservation.pingus.model;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Random;

public class Comment {

    private String author;
    private String title;
    private double rating;
    private String description;

    public static String[][] descriptionPairPositive = new String[][]{
            //5 good English descriptions
            {"Best Restaurant Ever","Great Food. Also pretty cheap."},
            {"An amazing place to get a drink with the boys","An amazing place to get a drink with the boys. It's relatively cheap for the food quality."},
            {"Just spectacular!","Amazing atmosphere and loved the staff"},
            {"Great Food!","Probably the tastiest food that I have ever eater"},
            {"Polite Staff","Food was decent but the customer service was impeccable"},
            //5 good German descriptions
            {"Wirklich empfehlenswert!","Wir kamen Freitag abends ohne Reservierung und haben direkt einen Platz bekommen. Das Putenschnitzel war super lecker, die Portion groß. Auch der Beilagensalat war groß und mit sehr gutem Dressing."},
            {"2 Daumen hoch","Die Auswahl an Getränken war außerordentlich gut. Ich und meine Kumpels hatten eine tolle Zeit."},
            {"Ausgezeichnete Wahl","Das Steak, das ich hier gegessen habe, war fantastisch, und der Preis dafür war absolut gerechtfertigt."},
            {"Würde hier wiederkommen","Essen, Atmosphäre, Ambiente und Service waren nicht von dieser Welt. Ich hatte das Gefühl, ein König zu sein."},
            {"Fantastisch","Sehr leckere Haxen, schnelle Bedienung und schönes Ambiente. Nicht ganz günstig aber ok. Gerne wieder!"}
    };

    public static String[][] getDescriptionPairNegative = new String[][]{
            //5 bad English descriptions
            {"Could be better","The food tasted just average and wasn't worth the money that I spent"},
            {"A little disappointed","After reading so many positive reviews alone, I got served what felt like microwave food"},
            {"Everything tastes terrible","Even though the place looks expensive and the food was just plain boring and tasted like cardboard"},
            {"A little loud","Went on a date with my girlfriend but I couldn't hear her talk because of really loud Music"},
            {"The food was raw","Not to go all Gordon Ramsey on them but this tastes like Dogfood and why was my steak still alive"},
            //5 bad German descriptions
            {"Kaltes Essen, aber trotzdem einen Aufpreis zahlen müssen", "Das bestellte Essen war kälter als das bestellte Getränk, und als ich mich beschwerte, sagte man mir, es müsse kalt sein. Ich kann mich nicht erinnern, jemals ein rohes, ungekochtes, fast gefrorenes Steak gegessen zu haben."},
            {"Schlechteste Erfahrung aller Zeiten","Sitzplatzwünsche werden ignoriert obwohl 2/3 leer sind. Bei Bestellung der Bratwürste fragte ich ob es Rind oder Schwein sei, darauf .. Ja gemischt.. serviert wurden aber 2 X Schwein. Ich beschwerte mich... habe kein Trinkgeld gegeben.... bei der Tür rief mir der Kellner Schimpfworte hinterher..."},
            {"Verschlechterte Qualität","Ich war vor 12 Jahren da das war das Essen ganz toll, aber heute war es gar nicht mehr so! Das Menü war auf Papier gedruckt, so wie es im Moment auch sein soll. Dann muss man die aber wegwerfen und zwar nach jedem Gast. Unsere waren definitiv öfter benutzt und fleckig mit Eselsohren. Der Kellner hat uns nicht in Ruhe essen lassen, weil er ständig was zu erzählen hatte. Tut mir leid, wegen dieser Rezension."},
            {"War es nicht wert","Unfreundliche Bedienung,das Essen war ungenießbar. Einzig das überteuerte Bier schmeckte."},
            {"Unfreundliches Personal", "Sehr unfreundliche Frau als Bedienung, nie wieder. Man darf nicht so agressiv mit Kunden reden"}
    };


//    private static String[] titles = new String[]{
//            "Best Restaurant Ever",
//            "Could be better",
//            "A little disappointed",
//            "An amazing place to get a drink with the boys",
//            "Not bad!",
//            "Just spectacular!",
//            "A SH*TSHOW",
//            "Everything tastes terrible",
//            "Send Help",
//            "Great Food!",
//            "A little loud",
//            "Polite Staff",
//            "Best day ever!",
//            "Living up to it's name",
//            "Excellent choice",
//            "The food was raw",
//            "Surprised by everything",
//            "Enjoyed every second",
//            "Good Food",
//            "A little expensive",
//            "Too cheap",
//            "Cheese was delicious"
//    };
//
//    private static String[] descriptions = new String[]{
//            "A little disappointed by the service. They took for ages to service me.",
//            "An amazing place to get a drink with the boys. It's relatively cheap for the food quality.",
//            "20 euros for a salad... I have to sell my wife's kidneys now",
//            "GOOD GOD WHAT A SH*TSHOW",
//            "My non existent children can cook better than anyone here",
//            "Horrible Experience but the food was alright.",
//            "I LEGIT SAW A CHILD WORK HERE. I CALLED THE POLICE. HE MIGHT HAVE BEEN A MIDGET...",
//            "The table next to me was too loud",
//            "The table next to me called me a Karen, what's a Karen?",
//            "Person sitting next to me was a Karen, iykyk",
//            "My food was so raw that it was basically still in the field eating Grass",
//            "A skilled chef can take mere cheese and turn it into something grate and clearly that wasn't the case here.",
//            "I think I was served Roadkill from the looks of it, or maybe the chef's wife...",
//            "Good Food. Also pretty cheap.",
//            "Would eat here again if someone else paid for it",
//            "I ate a human and not in the way you are thinking ;)",
//            "Johannes recommended this to me, I have to kill him now",
//            "Do you really have to read every single comment?",
//            "I've met Dwayne Johnson. He is not as big as I thought."
//    };

    private static String[] firstnames = new String[]{
            "Susan",
            "Helena",
            "Karen",
            "Gustav",
            "Olaf",
            "Hugo",
            "Siegfried",
            "Angela",
            "Anna",
            "Damien",
            "Ash",
            "Peter",
            "Fabian",
            "Felix",
            "Ron",
            "Johannes",
            "Lara",
            "Hannah",
            "Matthias",
            "Alexa",
            "Juan",
            "Maximillian",
            "Mark",
            "Magnus",
            "Valentin",
            "Phillip"
    };

    private static String[] lastnames = new String[]{
            "Schmidt",
            "Bauer",
            "Cremer",
            "Neumann",
            "Müller",
            "Richter",
            "Zimmermann",
            "Lorenz",
            "Kaiser",
            "Herrmann",
            "Weber",
            "Maier",
            "Walter",
            "Fuchs",
            "Winter",
            "Vogel",
            "Klein",
            "Hoffmann",
            "Ziegler",
            "Hansen",
            "Bergmann",
            "Grimm",
            "Seidel"
    };

    public Comment(String author, String title, double rating, String description) {
        this.author = author;
        this.title = title;
        this.rating = rating;
        this.description = description;
    }


    public JSONObject getJSON() {
        try {
            return new JSONObject()
                    .put("author", author)
                    .put("title", title)
                    .put("rating", rating)
                    .put("description", description);
        } catch (JSONException e) {
            System.err.println("Error occurred while trying to form Comment JSON");
            System.err.println(e.getMessage());
            return new JSONObject();
        }
    }

    public static Comment generateRandomComment(double rating) {
        Random tmp = new Random();
        // Pick random integer for random description & title pair
        int commentHelper = tmp.nextInt(descriptionPairPositive.length);
        String description;
        String title;
        // Deciding if comment should be negativ or positiv depending on the provided rating
        if (rating >= 3.0){
            title = descriptionPairPositive[commentHelper][0];
            description = descriptionPairPositive[commentHelper][1];
        }else {
            title = getDescriptionPairNegative[commentHelper][0];
            description = getDescriptionPairNegative[commentHelper][1];
        }

        // Creating Comment object & returning it
        return new Comment(
                firstnames[ tmp.nextInt(firstnames.length) ] + " " + lastnames[ tmp.nextInt(lastnames.length) ],
                title,
                rating,
                description
        );
    }

}

package coolsten.reservation.pingus.rest;

import coolsten.reservation.pingus.model.Restaurant;
import coolsten.reservation.pingus.model.RestaurantType;
import coolsten.reservation.pingus.util.Sorthelper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import coolsten.reservation.pingus.service.RestaurantService;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
public class RestaurantResource {

    private final RestaurantService restaurantService;

    public RestaurantResource(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping("ping")
    public String sanityCheck() {
        return "pong";
    }

    @GetMapping("restaurant/{restaurantId}")
    public ResponseEntity<String> getSingleRestaurant(@PathVariable("restaurantId") int restaurantId) {
        Restaurant result = restaurantService.getSpecificRestaurant(restaurantId);
        if (result != null) {
            return ResponseEntity.ok(result.getJSON());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("search")
    public ResponseEntity<List<String>> getRestaurants(@RequestParam(value = "sortOrder", required = false, defaultValue = "ASCENDING") Sorthelper.SortingOrder sortOrder,
                                                      @RequestParam(value = "sortField", required = false, defaultValue = "RATING") Sorthelper.SortField sortField,
                                                      @RequestParam(value = "type", required = false) String filterType,
                                                      @RequestParam(value = "price", required = false, defaultValue = "-1") int filterPrice,
                                                      @RequestParam(value = "rating", required = false, defaultValue = "-1") double filterRating,
                                                      @RequestParam(value = "distance", required = false, defaultValue = "-1") double filterDistance,
                                                      @RequestParam(value = "q", required = false, defaultValue = "") String query) {

        RestaurantType tType = null;

        if (filterType != null) {
            try {
                tType = RestaurantType.valueOf(filterType);
            } catch (IllegalArgumentException ignored) {}
        }

        return ResponseEntity.ok(restaurantService.getAllRestaurants(new Sorthelper(
                sortOrder,
                sortField,
                tType,
                filterPrice,
                filterRating,
                filterDistance,
                query
        )));
    }


}

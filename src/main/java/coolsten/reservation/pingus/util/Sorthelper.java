package coolsten.reservation.pingus.util;

import coolsten.reservation.pingus.model.RestaurantType;

public class Sorthelper {
    private SortingOrder sortingOrder;
    private SortField sortField;

    private RestaurantType filterType = null;
    private int filterPrice;
    private double filterRating;
    private double filterDistance;
    private String query;


    public Sorthelper(SortingOrder sortingOrder, SortField sortField, RestaurantType filterType, int filterPrice, double filterRating, double filterDistance, String query) {
        this.sortingOrder = sortingOrder != null ? sortingOrder : SortingOrder.ASCENDING;
        this.sortField = sortField != null ? sortField : SortField.RATING;
        this.filterType = filterType;
        this.filterPrice = filterPrice;
        this.filterRating = filterRating;
        this.filterDistance = filterDistance;
        this.query = query;
    }

    public SortingOrder getSortingOrder() {
        return sortingOrder;
    }

    public void setSortingOrder(SortingOrder sortingOrder) {
        this.sortingOrder = sortingOrder;
    }

    public SortField getSortField() {
        return sortField;
    }

    public void setSortField(SortField sortField) {
        this.sortField = sortField;
    }

    public RestaurantType getFilterType() {
        return filterType;
    }

    public void setFilterType(RestaurantType filterType) {
        this.filterType = filterType;
    }

    public int getFilterPrice() {
        return filterPrice;
    }

    public void setFilterPrice(int filterPrice) {
        this.filterPrice = filterPrice;
    }

    public double getFilterRating() {
        return filterRating;
    }

    public void setFilterRating(double filterRating) {
        this.filterRating = filterRating;
    }

    public double getFilterDistance() {
        return filterDistance;
    }

    public void setFilterDistance(double filterDistance) {
        this.filterDistance = filterDistance;
    }

    public String getQuery() {
        return query;
    }

    public enum SortingOrder {
        ASCENDING, DESCENDING
    }

    public enum SortField {
        RATING, DISTANCE , PRICE
    }
}
package pi.hci.model.enums;

public enum DishType {
    UNKNOWN("UNEXPECTED_VALUE"),
    SALAD("SALAD"),
    SOUP("SOUP"),
    DRINK("DRINK"),
    GARNISH("GARNISH"),
    OTHER("OTHER");

    private final String value;

    DishType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public DishType fromValue(String value) {
        for (DishType dishType : DishType.values()) {
            if (dishType.value.equals(value))
                return dishType;
        }
        return UNKNOWN;
    }
}

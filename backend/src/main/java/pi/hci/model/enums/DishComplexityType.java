package pi.hci.model.enums;

public enum DishComplexityType {
    UNKNOWN("UNEXPECTED_VALUE"),
    HARD("HARD"),
    MEDIUM("MEDIUM"),
    EASY("EASY");

    private final String value;

    DishComplexityType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public DishComplexityType fromValue(String value) {
        for (DishComplexityType dishType : DishComplexityType.values()) {
            if (dishType.value.equals(value))
                return dishType;
        }
        return UNKNOWN;
    }
}

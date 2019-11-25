package pi.hci.model.enums;

public enum Gender {
    UNKNOWN("UNEXPECTED_VALUE"),
    MALE("MALE"),
    FEMALE("FEMALE"),
    OTHER("OTHER");

    private final String value;

    Gender(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public Gender fromValue(String value) {
        for (Gender gender : Gender.values()) {
            if (gender.value.equals(value))
                return gender;
        }
        return UNKNOWN;
    }
}

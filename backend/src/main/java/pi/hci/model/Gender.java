package pi.hci.model;

public enum Gender {
    UNKNOWN("UNEXPECTED_VALUE"),
    MALE("MALE"),
    FEMALE("FEMALE"),
    OTHER("OTHER");

    private final String value;

    Gender(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }

   /* public Gender valueOf(String value) {
        for (Gender gender : Gender.values()) {
            if (gender.value.equals(value))
                return gender;
        }
        return UNKNOWN;
    }*/
}

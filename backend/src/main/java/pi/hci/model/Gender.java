package pi.hci.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Gender {
    UNKNOWN("UNEXPECTED_VALUE"),
    MALE("MALE"),
    FEMALE("FEMALE"),
    OTHER("OTHER");

    private final String value;

    Gender(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public Gender fromValue(String value) {
        for (Gender gender : Gender.values()) {
            if (gender.value.equals(value))
                return gender;
        }
        return UNKNOWN;
    }
}

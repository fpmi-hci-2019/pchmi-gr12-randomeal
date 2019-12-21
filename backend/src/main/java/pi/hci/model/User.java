package pi.hci.model;

import lombok.Data;
import lombok.experimental.Accessors;
import pi.hci.model.enums.Gender;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@Accessors(chain = true)
public class User {
    private int id;
    @NotNull
    private String username;
    @NotNull
    private String email;
    private LocalDate birthDate;
    private Gender gender;
}

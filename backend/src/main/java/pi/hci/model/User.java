package pi.hci.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class User {
    private String username;
    private String email;
    private LocalDate birthDate;
    private Gender gender;
}

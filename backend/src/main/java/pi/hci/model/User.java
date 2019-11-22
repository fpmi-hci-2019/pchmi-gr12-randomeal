package pi.hci.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class User {
    private Long id;
    private String username;
    private String email;
    private LocalDate birthDate;
    private Gender gender;
}

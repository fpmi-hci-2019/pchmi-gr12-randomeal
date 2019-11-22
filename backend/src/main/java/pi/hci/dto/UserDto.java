package pi.hci.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.LocalDate;

@Data
@Accessors(chain = true)
public class UserDto {
    private Long id;
    private String username;
    private String password;
    private String email;
    private LocalDate birthDate;
    private String gender;
}

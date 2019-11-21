package pi.hci.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String password;
    private String email;
    private LocalDate birthDate;
    private String gender;
}

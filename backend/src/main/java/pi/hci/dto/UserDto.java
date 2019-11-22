package pi.hci.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import java.sql.Date;

@Data
@Accessors(chain = true)
public class UserDto {
    private Long id;
    private String username;
    private String password;
    private String email;
    private Date birthDate;
    private String gender;
}

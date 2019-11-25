package pi.hci.model;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UserWithPassword extends User {
    private String password;
}

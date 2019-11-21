package pi.hci.dao;

import pi.hci.dto.UserDto;

public interface UserDao {
    int createUser(UserDto user);
}

package pi.hci.dao;

import pi.hci.dto.UserDto;

import java.util.List;

public interface UserDao {
    int createUser(UserDto user);

    List<UserDto> getAllUsers();

    UserDto login(UserDto user);
}

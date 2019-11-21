package pi.hci.mapper;

import org.mapstruct.Mapper;
import pi.hci.dto.UserDto;
import pi.hci.model.User;

@Mapper
public interface UserMapper {
    UserDto toDto(User user);

    User fromDto(UserDto dto);
}

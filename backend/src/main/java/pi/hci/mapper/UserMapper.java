package pi.hci.mapper;

import org.mapstruct.Mapper;
import pi.hci.dto.UserDto;
import pi.hci.model.User;
import pi.hci.model.UserWithPassword;

import java.util.List;

@Mapper
public interface UserMapper {
    UserDto toDto(User user);

    User fromDto(UserDto dto);

    UserDto toDto(UserWithPassword user);

    List<UserDto> toDtoList(List<User> user);

    List<User> fromDtoList(List<UserDto> dto);
}

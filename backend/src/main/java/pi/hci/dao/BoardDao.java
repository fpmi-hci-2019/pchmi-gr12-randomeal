package pi.hci.dao;

import pi.hci.dto.BoardDto;
import pi.hci.dto.UserDto;

import java.util.List;

public interface BoardDao {
    List<BoardDto> getAllBoardsForUser(Long userId);
}

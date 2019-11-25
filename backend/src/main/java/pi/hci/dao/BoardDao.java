package pi.hci.dao;

import pi.hci.dto.BoardDto;

import java.util.List;

public interface BoardDao {
    List<BoardDto> getAllBoardsForUser(Long userId);

    int deleteBoard(int boardId);

    int createBoard(BoardDto board);

    int createUserBoard(int boardId, Long userId);

    boolean getBoardIsFav(int boardId, Long userId);

    int setBoardIsFav(int boardId, Long userId, boolean isFav);
}

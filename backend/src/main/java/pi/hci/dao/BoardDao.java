package pi.hci.dao;

import pi.hci.dto.BoardDto;

import java.util.List;

public interface BoardDao {
    List<BoardDto> getAllBoardsForUser(int userId);

    BoardDto getBoardById(int boardId);

    int deleteBoard(int boardId);

    int createBoard(BoardDto board);

    boolean getBoardIsFav(int boardId);

    int setBoardIsFav(int boardId, boolean isFav);
}

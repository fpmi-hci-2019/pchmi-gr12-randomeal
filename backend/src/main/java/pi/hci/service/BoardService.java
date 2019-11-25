package pi.hci.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pi.hci.dao.BoardDao;
import pi.hci.mapper.BoardMapper;
import pi.hci.model.Board;
import pi.hci.model.BoardWithDishes;
import pi.hci.model.Id;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BoardService {

    private final BoardDao boardDao;
    private final DishService dishService;
    private final BoardMapper mapper;

    public List<BoardWithDishes> getAllBoardsForUser(int userId) {
        log.debug("Getting all boards for user {}", userId);
        List<BoardWithDishes> boards = mapper.fromDtoListWithDishes(boardDao.getAllBoardsForUser(userId));
        for (BoardWithDishes board : boards) {
            board.setDishes(dishService.getAllDishesForBoard(board.getId()));
        }
        return boards;
    }

    public int deleteBoard(int boardId) {
        log.debug("Deleting board <id={}>", boardId);
        return boardDao.deleteBoard(boardId);
    }

    @Transactional
    public Id createBoard(Board board) {
        log.debug("Creating board <name={}> for user <id={}>", board.getName(), board.getUserId());
        return new Id(boardDao.createBoard(mapper.toDto(board)));
    }

    @Transactional
    public int setBoardIsFav(int boardId) {
        boolean isFav = boardDao.getBoardIsFav(boardId);
        if (isFav) {
            log.debug("Delete board <id={}> from favourites.", boardId);
        } else {
            log.debug("Add board <id={}> to favourites.", boardId);
        }
        return boardDao.setBoardIsFav(boardId, !isFav);
    }
}

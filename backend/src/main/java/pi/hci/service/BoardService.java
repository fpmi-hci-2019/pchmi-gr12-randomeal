package pi.hci.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pi.hci.dao.BoardDao;
import pi.hci.mapper.BoardMapper;
import pi.hci.model.Board;
import pi.hci.model.Id;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BoardService {

    private final BoardDao boardDao;
    private final BoardMapper mapper;

    public List<Board> getAllBoardsForUser(Long userId) {
        log.debug("Getting all boards for user {}", userId);
        return mapper.fromDtoList(boardDao.getAllBoardsForUser(userId));
    }

    public int deleteBoard(int boardId) {
        log.debug("Deleting board <id={}>", boardId);
        return boardDao.deleteBoard(boardId);
    }

    @Transactional
    public Id createBoard(Board board, Long userId) {
        log.debug("Creating board <name={}> for user <id={}>", board.getName(), userId);
        int createdId = boardDao.createBoard(mapper.toDto(board));
        boardDao.createUserBoard(createdId, userId);
        return new Id(createdId);
    }

    @Transactional
    public int setBoardIsFav(int boardId, Long userId) {
        boolean isFav = boardDao.getBoardIsFav(boardId, userId);
        if (isFav) {
            log.debug("Delete board <id={}> from favourites.", boardId);
        } else {
            log.debug("Add board <id={}> to favourites.", boardId);
        }
        return boardDao.setBoardIsFav(boardId, userId, !isFav);
    }
}

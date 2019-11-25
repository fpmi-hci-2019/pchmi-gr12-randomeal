package pi.hci.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pi.hci.model.Board;
import pi.hci.model.Id;
import pi.hci.service.BoardService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("v1/users")
@RequiredArgsConstructor
public class BoardsController {
    private final BoardService boardService;

    @RequestMapping(value = "/{userId}/boards", method = RequestMethod.POST)
    public ResponseEntity<Id> createBoard(@PathVariable Long userId,
                                          @RequestBody Board board) {
        try {
            Id created = boardService.createBoard(board, userId);
            log.debug("Board <id={}> for user <id={}> created.", created.getId(), userId);
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } catch (Exception ex) {
            log.debug("Exception while creating board {} for user {} : {}", board.getName(), userId, ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Can't create board for user " + userId, ex);
        }
    }

    @RequestMapping(value = "/{userId}/boards", method = RequestMethod.GET)
    public ResponseEntity<List<Board>> getBoardsListForUser(@PathVariable Long userId) {
        try {
            List<Board> boards = boardService.getAllBoardsForUser(userId);
            log.debug("All boards for user <id={}> : {}.", userId, boards);
            return new ResponseEntity<>(boards, HttpStatus.OK);
        } catch (Exception ex) {
            log.debug("Exception while getting all boards: {}.", ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Getting all boards failed.", ex);
        }
    }

    @RequestMapping(value = "/{userId}/boards/{boardId}/fav", method = RequestMethod.POST)
    public ResponseEntity<HttpStatus> addToFavourite(@PathVariable Long userId,
                                                     @PathVariable int boardId) {
        try {
            boardService.setBoardIsFav(boardId, userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex) {
            log.debug("Exception while performing operation with board <id={}>: {}", boardId, ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Can't perform operation with board: " + boardId, ex);
        }
    }

    @RequestMapping(value = "/{userId}/boards/{boardId}", method = RequestMethod.DELETE)
    public ResponseEntity<HttpStatus> deleteBoard(@PathVariable Long userId,
                                                  @PathVariable int boardId) {
        try {
            boardService.deleteBoard(boardId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex) {
            log.debug("Exception while deleting board <id={}>: {}", boardId, ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Can't delete board: " + boardId, ex);
        }
    }
}

package pi.hci.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pi.hci.model.Board;
import pi.hci.model.BoardWithDishes;
import pi.hci.model.Id;
import pi.hci.service.BoardService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("randomeal/v1/boards")
@RequiredArgsConstructor
public class BoardsController {
    private final BoardService boardService;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<Id> createBoard(@RequestBody Board board) {
        try {
            Id created = boardService.createBoard(board);
            log.debug("Board <id={}> for user <id={}> created.", created.getId(), board.getUserId());
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } catch (Exception ex) {
            log.debug("Exception while creating board {} for user {} : {}", board.getName(), board.getUserId(), ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Can't create the board for user " + board.getUserId(), ex);
        }
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<BoardWithDishes>> getBoardsListForUser(@RequestParam int userId,
                                                                      @RequestParam(required = false) String filterBy) {
        try {
            List<BoardWithDishes> boards = boardService.getAllBoardsForUser(userId, filterBy);
            log.debug("All boards for user <id={}> : {}.", userId, boards);
            return new ResponseEntity<>(boards, HttpStatus.OK);
        } catch (Exception ex) {
            log.debug("Exception while getting all boards: {}.", ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Getting all boards failed.", ex);
        }
    }

    @RequestMapping(value = "/{boardId}/fav", method = RequestMethod.PUT)
    public ResponseEntity<HttpStatus> addToFavourite(@PathVariable int boardId) {
        try {
            boardService.setBoardIsFav(boardId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex) {
            log.debug("Exception while performing operation with the board <id={}>: {}", boardId, ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Can't perform operation with the board: " + boardId, ex);
        }
    }

    @RequestMapping(value = "/{boardId}/fav", method = RequestMethod.GET)
    public ResponseEntity<Boolean> getBoardIsFav(@PathVariable int boardId) {
        try {
            return new ResponseEntity<>(boardService.getBoardIsFav(boardId), HttpStatus.OK);
        } catch (Exception ex) {
            log.debug("Exception while performing operation with the board <id={}>: {}", boardId, ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Can't perform operation with the board: " + boardId, ex);
        }
    }

    @RequestMapping(value = "/{boardId}", method = RequestMethod.DELETE)
    public ResponseEntity<HttpStatus> deleteBoard(@PathVariable int boardId) {
        try {
            boardService.deleteBoard(boardId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex) {
            log.debug("Exception while deleting board <id={}>: {}", boardId, ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Can't delete the board: " + boardId, ex);
        }
    }

    @RequestMapping(value = "/{boardId}", method = RequestMethod.GET)
    public ResponseEntity<Board> getBoard(@PathVariable int boardId) {
        try {
            return new ResponseEntity<>(boardService.getBoardById(boardId), HttpStatus.OK);
        } catch (Exception ex) {
            log.debug("Exception while deleting board <id={}>: {}", boardId, ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Can't get the board: " + boardId, ex);
        }
    }
}

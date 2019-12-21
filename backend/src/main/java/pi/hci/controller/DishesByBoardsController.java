package pi.hci.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pi.hci.model.Id;
import pi.hci.service.DishByBoardService;

@Slf4j
@RestController
@RequestMapping("randomeal/v1/boards/{boardId}/dishes")
@RequiredArgsConstructor
public class DishesByBoardsController {
    private final DishByBoardService dishService;

    @RequestMapping(value = "/{dishId}", method = RequestMethod.DELETE)
    public ResponseEntity<HttpStatus> deleteFromBoard(@PathVariable int boardId,
                                                      @PathVariable int dishId) {
        try {
            dishService.deleteDish(boardId, dishId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex) {
            log.debug("Exception while deleting dish<id={}> from board<id={}>: {}", dishId, boardId, ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Can't delete the dish " + dishId + " from the board: " + boardId, ex);
        }
    }

    @RequestMapping(value = "/{dishId}", method = RequestMethod.POST)
    public ResponseEntity<Id> addDishOnBoard(@PathVariable int boardId,
                                             @PathVariable int dishId) {
        try {
            dishService.addDishOnBoard(boardId, dishId);
            return new ResponseEntity<>(new Id(dishId), HttpStatus.OK);
        } catch (Exception ex) {
            log.debug("Exception while adding dish<id={}> on board<id={}>: {}", dishId, boardId, ex.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Can't add the dish " + dishId + " on the board: " + boardId, ex);
        }
    }
}

package pi.hci.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pi.hci.dao.DishByBoardDao;
import pi.hci.mapper.DishMapper;

@Service
@Slf4j
@RequiredArgsConstructor
public class DishByBoardService {

    private final DishByBoardDao dishDao;
    private final DishMapper mapper;

    public int deleteDish(int boardId, int dishId) {
        log.debug("Delete dish " + dishId + " from the board " + boardId);
        return dishDao.deleteDish(boardId, dishId);
    }

    public int addDishOnBoard(int boardId, int dishId) {
        log.debug("Add dish " + dishId + " on the board " + boardId);
        return dishDao.addDishOnBoard(boardId, dishId);
    }
}

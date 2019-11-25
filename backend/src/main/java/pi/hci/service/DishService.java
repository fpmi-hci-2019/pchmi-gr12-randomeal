package pi.hci.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pi.hci.dao.DishDao;
import pi.hci.mapper.DishMapper;
import pi.hci.model.Dish;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DishService {

    private final DishDao dishDao;
    private final DishMapper mapper;

    public List<Dish> getAllDishesForBoard(int boardId) {
        return mapper.fromDtoList(dishDao.getAllDishesForBoard(boardId));
    }

}

package pi.hci.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pi.hci.dao.BoardDao;
import pi.hci.mapper.BoardMapper;
import pi.hci.model.Board;
import pi.hci.model.User;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BoardService {

    private final BoardDao boardDao;
    private final BoardMapper mapper;

    public List<Board> getAllBoardsForUser(Long userId) {
        return mapper.fromDtoList(boardDao.getAllBoardsForUser(userId));
    }
}

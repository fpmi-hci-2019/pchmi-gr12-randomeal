package pi.hci.mapper;

import org.mapstruct.Mapper;
import pi.hci.dto.BoardDto;
import pi.hci.model.Board;
import pi.hci.model.BoardWithDishes;

import java.util.List;

@Mapper
public interface BoardMapper {
    BoardDto toDto(Board board);

    BoardWithDishes fromDto(BoardDto dto);

    List<BoardDto> toDtoList(List<Board> boards);

    List<Board> fromDtoList(List<BoardDto> dto);

    BoardDto toDtoWithDishes(BoardWithDishes board);

    List<BoardDto> toDtoListWithDishes(List<BoardWithDishes> boards);

    List<BoardWithDishes> fromDtoListWithDishes(List<BoardDto> dto);
}

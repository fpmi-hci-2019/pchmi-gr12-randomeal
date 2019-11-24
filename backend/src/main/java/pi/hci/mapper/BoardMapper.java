package pi.hci.mapper;

import org.mapstruct.Mapper;
import pi.hci.dto.BoardDto;
import pi.hci.model.Board;

import java.util.List;

@Mapper
public interface BoardMapper {
    BoardDto toDto(Board board);

    Board fromDto(BoardDto dto);

    List<BoardDto> toDtoList(List<Board> user);

    List<Board> fromDtoList(List<BoardDto> dto);
}

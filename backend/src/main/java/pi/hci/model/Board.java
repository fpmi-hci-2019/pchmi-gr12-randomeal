package pi.hci.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Date;

@Data
@Accessors(chain = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Board implements Comparable<Board> {
    private int id;
    @NotNull
    private String name;
    private Date createdAt;
    private Date changedAt;
    private boolean isFavourite;
    @NotNull
    private int userId;

    @Override
    public int compareTo(Board o) {
        return this.createdAt.compareTo(o.getCreatedAt());
    }
}

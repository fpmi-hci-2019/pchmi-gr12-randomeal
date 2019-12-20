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
public class Board {
    private int id;
    @NotNull
    private String name;
    private LocalDate createdAt;
    private Date changedAt;
    private boolean isFavourite;
    @NotNull
    private int userId;
}

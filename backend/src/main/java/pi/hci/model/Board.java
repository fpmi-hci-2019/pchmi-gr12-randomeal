package pi.hci.model;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@Accessors(chain = true)
public class Board {
    @NotNull
    private String name;
    private LocalDate createdAt;
}
